const mongoose = require("../connection");

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "groups", default: undefined },
  desc: { type: String },
  date: { type: Date },
  amount: { type: Number },
  creditor: {type: String, required: true},
  participants: {
    type: Map, //key: username of participant, value: net share
    of: Number,
    default: new Map()
  },
});

module.exports = mongoose.model("expenses", ExpenseSchema);

