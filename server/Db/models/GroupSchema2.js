const mongoose = require("mongoose");

const GroupSchema2 = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: String }],
  balances: {
    type: Map,
    of: { type: Map, of: Number },
    default: new Map(),
  },
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "expenses" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Group", GroupSchema2);
