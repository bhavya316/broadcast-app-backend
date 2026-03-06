const express = require("express");
const router = express.Router();
const multer = require("multer");
const authController = require("../controllers/authController");

const upload = multer({ dest: "uploads/" });

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/teacher-signup", upload.single("id_proof"), authController.teacherSignup);

module.exports = router;