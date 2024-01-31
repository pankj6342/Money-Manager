const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  participants: [{ type: String, required: true }], // Array of usernames in the group
  expenses: [
    {
      description: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, required: true },
      participants: [{ type: String, required: true }], // Usernames involved in the expense
      shares: {
        type: Map,
        of: Number, // Maps usernames to their share of the expense
        default: new Map()
      },
    },
  ],
  // Optional fields:
  name: { type: String }, // Group name (if applicable)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Group', GroupSchema);
