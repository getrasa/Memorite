const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deckSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true
  },

  native: {
    type: String,
    required: true
  },

  language: {
    type: String,
    required: true
  },

  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Deck = mongoose.model("deck", deckSchema);
