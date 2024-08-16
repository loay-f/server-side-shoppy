const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    default: [],
  },
  addresses: {
    default: [],
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
});

module.exports = mongoose.model("User", userSchema);
