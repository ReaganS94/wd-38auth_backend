const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// creating a custom static method
userSchema.statics.signup = async function (email, password) {
  // Check if the user already exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  // Make sure the user inserted both email and pass
  if (!email || !password) {
    throw Error("Please fill all fields");
  }

  // validate email
  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }

  // validate pass
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Make sure to use at least 8 characters, one uppercase, one lowercase, a number and a symbol"
    );
  }

  // encrypt pass
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create user
  const user = await this.create({ email, password: hash });

  return user;
};

// static custom login method
userSchema.statics.login = async function (email, password) {
  // check that I have both fields
  if (!email || !password) {
    throw Error("Please fill all fields");
  }

  const user = await this.findOne({ email });

  // check that email is correct
  if (!user) {
    throw Error("Incorrect email");
  }

  // check the pass
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
