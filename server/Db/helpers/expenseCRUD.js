const userModel = require("../models/UserSchema2");
const ExpenseSchema = require("../models/ExpenseSchema");
const userOperation = require("./userCRUD");
const { groupOperations } = require("./groupCRUD");

const expenseOperations = {
  async AddExp(expenseObj, response) {
    try {
      const participants = new Map(Object.entries(expenseObj.participants));
      const {groupId } = expenseObj;

      const newExpense = new ExpenseSchema({
        groupId: expenseObj.groupId ?? undefined,
        desc: expenseObj.inp.description,
        creditor: expenseObj.username,
        amount: expenseObj.inp.amount,
        date: expenseObj.inp.date,
        participants
      });

      const savedExpense = await newExpense.save();     
      let creditor = expenseObj.username;
      let debitors = [];
      for (const [key, value] of participants) {
        if (key !== creditor)
        debitors.push({ username: key, share: Number(value) });
      }
      
      if (groupId) {
        const resp = await groupOperations.updateGroupBalances2(groupId, savedExpense._id, creditor, debitors);
        response.json({success: true, doc: resp});
      } else {
        //update the participants' balance:
        for (const debt of debitors) {
          await userOperation.UpdateNetBalance(
            creditor,
            debt.username,
            debt.share,
            savedExpense._id
          );
        }
        response.json({ success: true, doc: savedExpense });
      }
    } catch (error) {
      response.json({ success: false, error: error?.message });
    }
  },

  async settle(userObject, response) {
    try {
      const { cred, debt, val, username } = userObject;
       await userOperation.UpdateNetBalance(cred, debt, -val, undefined);
       let user = await userModel.findOne({username});
       response.json({ success: true, user});
    } catch (error) {
      response.json({ success: false, error: error?.message });
    }
  },

  // userModel.findOneAndUpdate(
  //   { username: cred },
  //   { $inc: { "expensis.$.data.ammount": userObject.val } },
  //   { new: true },
  //   (err, doc) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       //send mail to check.email => that userObject.default user has added you as his friend;
  //       console.log(doc);
  //       response.json({ Status: "S", msg: "Added succesfully", doc: doc });
  //     }
  //   }
  // );
};
module.exports = expenseOperations;
