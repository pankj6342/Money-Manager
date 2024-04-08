const mongoose = require("mongoose");
const userModel = require("../models/UserSchema2");
const jwt = require("jsonwebtoken");

const userOperation = {
  async AddUser(userObject, response) {
    try {
      const doc = await userModel.create(userObject);
      response.json({ Status: "S", record: doc });
    } catch (err) {
      console.error("Error is ", err);
      response.json({ Status: "F" });
    }
  },

  async login(userObject, response) {
    try {
      console.log({userObject});
      let user = await userModel.findOne({ email: userObject.email });
      if (user) {
        jwt.sign({ user }, "secretkey", { expiresIn: "1h" }, (err, token) => {
          response.json({
            success: true,
            username: user.username,
            token: token,
          });
        });
      } else {
        response.json({ success: false, msg: "Invalid username or password" });
      }
    } catch (error) {
      console.log(error);
      response.json({ success: false, msg: "Login failed" });
    }
  },

  async AddFriend(userObject, response) {
    try {
      const { username, defaultUser } = userObject;
      // Find the user document
      const friend = await userModel.findOne({ username });
      // Check if the user exists
      if (!friend) {
        throw new Error(`userModel with username ${username} not found`);
      }
      const user = await userModel.findOne({ username: defaultUser });
      // Check if the friend is already added
      if (user.friends.has(username)) {
        throw new Error(`Friend ${username} already exists`);
      }
      // Add the friend with a net balance of 0
      user.friends.set(username, 0);
      friend.friends.set(defaultUser, 0);
      // Save the updated user document
      await friend.save();
      const savedUser = await user.save();
      console.log(`Friend ${username} added successfully for user ${username}`);
      response.json({ success: true, doc: savedUser });
    } catch (e) {
      response.json({ success: false, error: e?.message });
    }
  },

  async Find(username) {
    try {
      const user = await userModel.findOne({ username });
      if (user) return user;
      else console.log("Not found");
    } catch (error) {
      console.log(error?.message);
    }
  },
  async UpdateNetBalance(creditor, debt, amount, expenseId) {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        // Update the creditor's and debt's balances and append the expenseId to their expenses arrays in parallel
        await Promise.all([
          userModel.updateOne(
            { username: creditor },
            {
              $inc: { [`friends.${debt}`]: amount },
              $push: { expenses: expenseId ? expenseId : null },
            },
            { session }
          ),
          userModel.updateOne(
            { username: debt },
            {
              $inc: { [`friends.${creditor}`]: -amount },
              $push: { expenses: expenseId ? expenseId : null },
            },
            { session }
          ),
        ]);
      });

      session.endSession();
    } catch (error) {
      session.endSession();
      throw error;
    }
  },
};

module.exports = userOperation;
