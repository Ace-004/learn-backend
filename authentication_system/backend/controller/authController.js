const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {generateToken}=require('../utils/generateToken')

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid credentials" });
    const token=generateToken(user._id);
    res.status(200).json({ message: "login successful",token });
  } catch (error) {
    console.error("error occured while login " + error);
    res.status(500).json({ message: "server error" });
  }
};

exports.postRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exists" });

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });
    await newUser.save();
    const token=generateToken(user._id)
    res.status(201).json({ message: "user created",token });
  } catch (error) {
    console.error("error occured while creating user " + error);
    res.status(500).json({ message: "server error" });
  }
};
