const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  logout,
  forgotPassword,
} = require("../controllers/authController");
const { verifyToken, guruOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");

// public routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

// protected routes
router.get("/me", verifyToken, guruOnly, getMe);
router.put(
  "/profile",
  verifyToken,
  guruOnly,
  upload.single("foto_profil"), // multer handle multipart sebelum controller
  updateProfile
);
router.post("/logout", verifyToken, logout);

module.exports = router;