const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mark: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Subject = mongoose.model("Subjects", subjectSchema);
module.exports = Subject;
