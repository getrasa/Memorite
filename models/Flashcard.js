const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const contextSchema = mongoose.Schema({  type: String, required: true }, { _id: false });

const flashcardSchema = new Schema(
  {
    deck: {
      type: Schema.Types.ObjectId,
      ref: "deck"
    },

    term: {
      type: String,
      required: true
    },

    meaning: [
      {
        type: String,
        required: true
      }
    ],

    reading: [
      {
        type: String
      }
    ],

    reading_system: {
      type: String,
      default: "Latin"
    },

    definition: {
      type: String
    },

    // context: [{ type: String, required: true }],
    context: [{ type: String }],

    date_created: {
      type: Date,
      default: Date.now
    },

    interval: {
      type: Number,
      default: 0
    },

    level: {
      type: Number,
      default: 0
    },

    next_review: {
      type: Date,
      default: Date.now
    }
  }
  // { _id: false }
);

module.exports = Flashcard = mongoose.model("flashcard", flashcardSchema);
