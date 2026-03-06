const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { protect, teacherOnly } = require("../middleware/authMiddleware");

router.get("/teacher", protect, teacherOnly, dashboardController.teacherDashboard);
router.get("/student", protect, dashboardController.studentDashboard);

module.exports = router;