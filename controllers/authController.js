const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array()[0].msg);
    return;
  }
  const { name, email, password, address } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedPw,
        addresses: address,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error("A user with this email could not be found.");
    error.statusCode = 401;
    throw error;
  }
  if (!bcrypt.compare(password, user.password)) {
    const error = new Error("Wrong password!");
    error.statusCode = 401;
    throw error;
  }
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id.toString(),
    },
    "verySecretCodeThatNoOneShloudHaveAccessTo",
    { expiresIn: "1h" }
  );
  res.status(200).json({ token: token, userId: user._id.toString() });
}; 

module.exports = {
  createUser,
  login,
};
