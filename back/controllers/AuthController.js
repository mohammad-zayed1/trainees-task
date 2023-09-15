const User = require("../models/userModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    console.log(token);
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    console.log(user);
    // const isActive = await User.findOne({ email });
    // if (!user) {
    //   return res.json({ message: "Incorrect password or email" });
    // }
    if (!user.isActive)
      return res.json({
        message:
          "This Account is inactive, please wait for the administration to activate your account",
      });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { username, email, isActive } = req.body;
    const userID = req.params.id;

    const update = await User.findOneAndUpdate(
      { _id: userID },
      {
        username: username,
        email: email,
        isActive: isActive,
      }
    );

    res.status(201).json("user updated successfully ");
  } catch (error) {
    res.status(500).json({ error: "Failed to update quote" });
  }
};
module.exports.deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;

    const update = await User.findOneAndDelete({ _id: userID });

    res.status(201).json("user updated successfully ");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const getUsers = await User.find({});

    res.status(201).json(getUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to get users" });
  }
};
