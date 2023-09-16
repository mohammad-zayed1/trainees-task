const router = require("express").Router();
const userController = require("../controllers/AuthController");
const { userVerification } = require("../middleware/AuthMiddleware");

router.get("/users", userController.getUsers);

router.post("/signup", userController.Signup);
router.post("/login", userController.Login);

router.delete("/deleteuser/:id", userController.deleteUser);

router.patch("/updateuser/:id", userController.updateUser);

router.patch("/assignSubject", userController.assignSubject);

router.post("/", userVerification);

module.exports = router;
