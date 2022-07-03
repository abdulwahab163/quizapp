const express = require("express");
const { quizController } = require("../controllers");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

router.post("/auth/addQuiz", auth, quizController.insertSolvedQuiz);
router.get("/auth/quizes", auth, role, quizController.getQuizs);

module.exports = router;
