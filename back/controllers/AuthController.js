const User = require("../models/userModel");
const Subject = require("../models/subjectModel");
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
      .json({ message: "Account Created successfully", success: true, user });
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
    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      role: user.role,
      id: user._id,
    });
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
    res.status(500).json({ error: "Failed to update user info" });
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

module.exports.assignSubject = async (req, res) => {
  try {
    const { stdId, subjectId } = req.body;

    // console.log(req.body);

    const sub = await Subject.findById(subjectId);
    // console.log(sub)
    const newSubjects = await User.findById(stdId);
    newSubjects.subjects.push(sub);
    // console.log(preSubjects);
    const student = await User.findOneAndUpdate(
      { _id: stdId },
      { subjects: newSubjects.subjects }
    );
    console.log(student);

    res.status(201).json({ message: "subject Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to get Subjects" });
  }
};
