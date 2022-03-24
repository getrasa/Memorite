const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const deckSchema = mongoose.Schema({ id: String }, { _id: false });

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  date_created: {
    type: Date,
    default: Date.now
  },

  account_type: {
    type: String,
    default: "trial"
  }
});

module.exports = User = mongoose.model("user", userSchema);
