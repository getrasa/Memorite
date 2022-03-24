const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

// @route POST api/users
// @desc Register user
// @access Public
router.post(
  "/",
  [
    check("username", "Username is require")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a valid password with 6 or more characters"
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        email,
        username,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret", { expiresIn: 360000 }),
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route POST api/users/update
// @desc Update user
// @access Private
router.post(
  "/update",
  auth,
  [
    check("_id", "User ID is required")
      .not()
      .isEmpty(),
    check("username", "Username is require")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let userId = req.user.id;
    let user = req.body;
    let { password } = user;

    try {
      const salt = await bcrypt.genSalt(10);
      if (password) user.password = await bcrypt.hash(password, salt);

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: user },
        { new: true }
      );

      return res.status(200).json(updatedUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
