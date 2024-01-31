const mongoose = require("../connection");

const Schema = mongoose.Schema;

const UserSchema2 = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: { type: Map, of: Number, default: new Map() }, //key: username of friend value: net balance.
  groups: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "groups" },
      name: String,
    },
  ],
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "expenses" }],
});

const userModel = mongoose.model("user", UserSchema2);

module.exports = userModel;
