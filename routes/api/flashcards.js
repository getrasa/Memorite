const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Deck = require("../../models/Deck");
const Flashcard = require("../../models/Flashcard");
const { check, validationResult } = require("express-validator/check");
const mongoose = require("mongoose");

// @route POST api/flashcards/add/:id
// @desc Add new flashcard
// @access Private
router.post(
  "/add/:id",
  auth,
  [
    check("term", "Term is required")
      .not()
      .isEmpty(),
    check("meaning", "Translation is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const deckId = req.params.id;
    let {
      term,
      meaning,
      reading,
      readingSystem,
      definition,
      context
    } = req.body;

    fields = {};
    fields.deck = deckId;
    fields.term = term.trim();

    console.log("Reading system:", readingSystem);

    fields.meaning = meaning.map(x => x.trim());
    if (reading) fields.reading = reading.map(x => x.trim());
    if (readingSystem) fields.reading_system = readingSystem.trim();
    if (context) fields.context = context.map(x => x.trim());
    if (definition) fields.definition = definition.trim();

    try {
      const deck = await Deck.findOne({ _id: deckId });
      if (!deck) {
        return res.status(400).send("Deck doesn't exist");
      }

      let flashcard = await Flashcard.findOne({ deck: deckId, term: term });

      if (flashcard) {
        return res.status(400).send("Flashcard already exists");
      }

      flashcard = new Flashcard(fields);
      await flashcard.save();

      return res.status(200).json(flashcard);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// @route POST api/flashcards/update/:id
// @desc Update an existing flashcard
// @access Private
router.post(
  "/update/:id",
  auth,
  [
    check("_id", "Id is required")
      .not()
      .isEmpty(),
    check("term", "Term is required")
      .not()
      .isEmpty(),
    check("meaning", "Translation is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const deckId = req.params.id;
    let {
      _id,
      term,
      meaning,
      reading,
      readingSystem,
      context,
      definition
    } = req.body;

    const fields = req.body;
    fields.deck = deckId;
    fields.term = term.trim();
    fields.meaning = meaning.map(x => x.trim());
    if (reading) fields.reading = reading.map(x => x.trim());
    if (readingSystem) fields.reading_system = readingSystem.trim();
    if (context) fields.context = context.map(x => x.trim());
    if (definition) fields.definition = definition.trim();

    try {
      let flashcard = await Flashcard.findOneAndUpdate(
        { _id },
        { $set: fields },
        { new: true }
      );

      return res.status(200).json(flashcard);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error: Updating the flashcard");
    }
  }
);

// @route GET api/flashcards/review/:id
// @desc Get all review ready flashcards
// @access Private
router.get("/review/:id", auth, async (req, res) => {
  const deckId = req.params.id;
  const today = new Date();

  try {
    const reviews = await Flashcard.find({
      deck: deckId,
      $and: [{ interval: { $gte: 1 } }, { interval: { $lte: 7 } }],
      next_review: { $lte: today }
    });

    return res.status(200).json(reviews);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route GET api/flashcards/new/:id
// @desc Get all new flashcards
// @access Private
router.get("/new/:id", auth, async (req, res) => {
  const deckId = req.params.id;

  try {
    const newFlashcards = await Flashcard.find({
      deck: deckId,
      interval: { $eq: 0 }
    });

    return res.status(200).json(newFlashcards);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route POST api/flashcards/delete/:id
// @desc Delete flashcard
// @access Private
router.post(
  "/delete/:id",
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

    let { _id } = req.body;

    try {
      let flashcard = await Flashcard.findOneAndDelete({ _id });

      if (!flashcard) res.status(400).send("Flashcard not found");

      return res.status(200).json(flashcard);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route GET api/flashcards/graph/:id
// @desc Get all flashcards levels, intervals and next review times.
// @access Private
router.get("/graph/:id", auth, async (req, res) => {
  const deckId = req.params.id;

  try {
    const flashcards = await Flashcard.find(
      {
        deck: deckId,
        interval: { $gte: 1 }
      },
      "-_id level interval next_review"
    );

    return res.status(200).json(flashcards);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route GET api/flashcards/list/:id
// @desc Get all flashcards for a list
// @access Private
router.get("/list/:id", auth, async (req, res) => {
  const deckId = req.params.id;

  try {
    const flashcards = await Flashcard.find(
      {
        deck: deckId
      },
      "-_id term meaning reading level"
    );

    return res.status(200).json(flashcards);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route GET api/flashcards/all/:id
// @desc Get all flashcards in a deck
// @access Private
router.get("/all/:id", auth, async (req, res) => {
  const deckId = req.params.id;

  try {
    const flashcards = await Flashcard.find({
      deck: deckId
    });

    return res.status(200).json(flashcards);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
