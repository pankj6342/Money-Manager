const mongoose = require("mongoose");
const GroupSchema2 = require("../models/GroupSchema2");
const userModel = require("../models/UserSchema2");

const groupOperations = {
  async getGroupData(req, res) {
    const { groupId } = req.body;
    try {
      let groupData = await GroupSchema2.findOne({ _id: groupId });
      const memberIds = groupData.members;

      res.json({ success: true, groupData });
    } catch (error) {
      res.json({ success: false, error: error?.message });
    }
  },

  async addToGroup(userObject, res) {
    try {
      let { memberIds, groupId, groupName } = userObject;
      let group = !groupId
        ? undefined
        : await GroupSchema2.findOne({ _id: groupId });
      if (!group) {
        const g = new GroupSchema2({
          members: memberIds,
          expenses: [],
          name: groupName,
        });
        // Save the group to the database
        group = await g.save();
      } else {
        // Update existing group members
        await GroupSchema2.updateOne(
          { _id: group._id },
          { $addToSet: { members: { $each: memberIds } } }
        );
      }
      // Update user documents to include the group
      for (const m of memberIds) {
        await userModel.updateOne(
          { username: m },
          { $addToSet: { groups: { id: group._id, name: group.name } } }
        );
      }
      res.json({ success: true, group });
    } catch (error) {
      console.error("Error creating group:", error);
      res.json({ success: false, error: error?.message });
    }
  },

  async updateGroupBalances2(groupId, expenseId, creditor, debitors) {
    try {
      // Fetch the group
      const group = await GroupSchema2.findById(groupId);
      if (!group) {
        throw new Error("Group not found");
      }

      // Add the expenseId to the group's expenses
      group.expenses.push(expenseId);
      // Update the balances
      debitors.forEach((debitor) => {
        // Update the balance for the creditor
        let creditorBalance = group.balances.get(creditor) || new Map();
        creditorBalance.set(
          debitor.username,
          (creditorBalance.get(debitor.username) || 0) + debitor.share
        );
        group.balances.set(creditor, creditorBalance);

        // Update the balance for the debitor
        let debitorBalance = group.balances.get(debitor.username) || new Map();
        debitorBalance.set(
          creditor,
          (debitorBalance.get(creditor) || 0) - debitor.share
        );
        group.balances.set(debitor.username, debitorBalance);
      });

      // Save the group
      await group.save();
      return group;
    } catch (error) {
      console.log("Error in updating group balance", error?.message);
      throw error;
    }
  },
  // async updateGroupBalances(groupId, expenseId, creditor, debtors) {
  //   try {
  //     const group = await GroupSchema2.findById(groupId);
  //     if (!group) {
  //       throw new Error(`Group with ID ${groupId} not found`);
  //     }

  //     // Calculate total expense share
  //     const totalShare = debtors.reduce(
  //       (acc, debitor) => acc + debitor.share,
  //       0
  //     );
  //     const creditorBalance = group.balances.get(creditor) ?? new Map();
  //     const currentCreditorBalance = creditorBalance.get(creditor) ?? 0;
  //     group.balances.set(
  //       creditor,
  //       creditorBalance.set(creditor, currentCreditorBalance + totalShare)
  //     );
  //     console.log({ creditorBalance, currentCreditorBalance });
  //     // Update debtors' balances
  //     for (const debitor of debtors) {
  //       const debitorBalance =
  //         group.balances.get(debitor.username) ?? new Map();
  //       const currentDebitorBalance = debitorBalance.get(creditor) ?? 0;
  //       group.balances.set(
  //         debitor.username,
  //         debitorBalance.set(creditor, currentDebitorBalance - debitor.share)
  //       );
  //       group.balances.set(
  //         creditor,
  //         creditorBalance.set(
  //           debitor.username,
  //           -currentDebitorBalance + debitor.share
  //         )
  //       );
  //       console.log({ debitorBalance, currentDebitorBalance });
  //     }
  //     // Add expense to the group
  //     group.expenses.push(expenseId);
  //     // Save the updated group
  //     await group.save();
  //     return group;
  //   } catch (error) {
  //     console.error("Error updating group balances:", error);
  //     throw error; // Rethrow to allow for proper error handling
  //   }
  // },
};

module.exports = { groupOperations };
