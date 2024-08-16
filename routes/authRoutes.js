const authController = require("../controllers/authController");
const { body } = require("express-validator");
const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post(
  "/sign-up",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (email) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("Email already in use");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.createUser
);

router.post("/login", authController.login);

module.exports = router;
