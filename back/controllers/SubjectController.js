const Subject = require("../models/subjectModel");

module.exports.createSubject = async (req, res, next) => {
  try {
    const { name, mark } = req.body;

    const subject = await Subject.create({ name, mark });

    res.status(201).json({ message: "Subject Created successfully" });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.getSubjects = async (req, res) => {
  try {
    const getSubjects = await Subject.find({});

    res.status(201).json(getSubjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to get Subjects" });
  }
};

