const mongoose = require("../connection");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: { type: Array },
  groups: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "groups" },
      name: String,
    },
  ],
  expenses: [
    {
      name: { type: String }, // Name of the expense
      data: {
        desc: { type: String },
        date: { type: Date },
        ammount: { type: Number },
      },
    },
  ],
  balances: {
    // Object to store net balances with other users
    type: Map,
    of: Number,
  },
});

const userModel = mongoose.model("user", UserSchema);

module.exports = userModel;
