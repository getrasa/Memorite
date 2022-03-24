const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Deck = require("../../models/Deck");
const Flashcard = require("../../models/Flashcard");
const { check, validationResult } = require("express-validator/check");

// @route GET api/decks/main
// @desc Get all user decks, review count and new count
// @access Private
router.get("/main", auth, async (req, res) => {
  const userId = req.user.id;
  const today = new Date();

  try {
    const decks = await Deck.find({ user: userId }).lean();

    if (!decks) return res.status(200).send("User has no decks");

    const promises = decks.map(async (deck, index) => {
      const reviewCount = await Flashcard.find({
        deck: deck._id,
        $and: [{ interval: { $gte: 1 } }, { interval: { $lte: 7 } }],
        next_review: { $lte: today }
      }).countDocuments();

      decks[index].reviews = reviewCount;

      const newCount = await Flashcard.find({
        deck: deck._id,
        interval: { $eq: 0 }
      }).countDocuments();

      const total = await Flashcard.find({
        deck: deck._id,
        interval: { $gte: 1 }
      }).countDocuments();

      decks[index].reviews = reviewCount;
      decks[index].new = newCount;
      decks[index].total = total;
    });

    await Promise.all(promises);

    return res.status(200).json(decks);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route POST api/decks/create
// @desc Create new deck for user
// @access Private
router.post(
  "/create",
  auth,
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("native", "Native language is required")
      .not()
      .isEmpty(),
    check("language", "Language is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { title, native, language } = req.body;

    const deckQuery = {
      user: userId,
      title: title.trim(),
      native: native.trim(),
      language: language.trim()
    };

    try {
      let deck = new Deck(deckQuery);
      await deck.save();

      return res.status(200).json(deck);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// @route POST api/decks/update
// @desc Update deck
// @access Private
router.post(
  "/update",
  auth,
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("native", "Native is required")
      .not()
      .isEmpty(),
    check("language", "Language is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const fields = req.body;
    console.log("Fields:", fields);
    const { _id, title, native, language } = req.body;

    if (title) fields.title = title.trim();
    if (native) fields.native = native.trim();
    if (language) fields.language = language.trim();

    try {
      let deck = await Deck.findOneAndUpdate(
        { _id },
        { $set: fields },
        { new: true }
      );

      return res.status(200).send(deck);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// @route POST api/decks/delete/id
// @desc Delete deck
// @access Private
router.post(
  "/delete",
  auth,
  [
    check("_id", "Id is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { _id } = req.body;

    try {
      let deck = await Deck.findOneAndDelete({ _id });
      console.log("Deck:", deck);
      let flashcards = await Flashcard.deleteMany({ deck: _id });

      if (!deck) res.status(400).send("Deck not found");

      return res.status(200).json(deck);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
