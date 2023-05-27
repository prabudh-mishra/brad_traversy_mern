const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getProfile);
// router.route("/").get(getGoals).post(setGoal);
// router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
