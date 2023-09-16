const router = require("express").Router();
const subjectController = require("../controllers/SubjectController");


router.post("/createSubject", subjectController.createSubject);
router.get("/getSubjects", subjectController.getSubjects);

module.exports = router;
