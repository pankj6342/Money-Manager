const mongoose = require("mongoose");
const userModel = require("../models/UserSchema2");
const jwt = require("jsonwebtoken");

const userOperation = {
  AddUser(userObject, response) {
    userModel.create(userObject, (err, doc) => {
      if (err) {
        console.log("Error is ", err);
        response.json({ Status: "F" });
      } else {
        response.json({ Status: "S", record: doc });
      }
    });
  },

  login(userObject, response) {
    userModel.findOne(userObject, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        if (doc) {
          jwt.sign({ doc }, "secretkey", { expiresIn: "1h" }, (err, token) => {
            response.json({
              success: true,
              username: doc.username,
              token: token,
            });
          });
        } else {
          response.json({ success: false, msg: "Invalid username or password" });
        }
      }
    });
  },

  async AddFriend(userObject, response) {
    try {
      const {username, defaultUser} = userObject;
      // Find the user document
      const friend = await userModel.findOne({username});
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
      response.json({success: true, doc: savedUser});
    } catch(e){
      response.json({success: false, error: e?.message});
    }
  },

  Find(username) {
    return userModel.findOne({ username }, function (err, doc) {
      if (err) {
        console.log(err);
          return false;
      } else {
        if (doc) {
          console.log(doc);
          return doc;
        } else {
          console.log("not Found");
           return false;
        }
      }
    });
  },
  async UpdateNetBalance(creditor, debt, amount, expenseId) {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        // Update the creditor's and debt's balances and append the expenseId to their expenses arrays in parallel
        await Promise.all([
          userModel.updateOne(
            { username: creditor },
            { $inc: { [`friends.${debt}`]: amount }, $push: { expenses: expenseId ? expenseId : null } },
            { session }
          ),
          userModel.updateOne(
            { username: debt },
            { $inc: { [`friends.${creditor}`]: -amount }, $push: { expenses: expenseId ? expenseId : null } },
            { session }
          )
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
