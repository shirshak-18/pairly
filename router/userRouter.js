const { Router } = require("express");
const {
  signUp,
  verifyOtp,
  signIn,
  sendOtpForPasswordReset,
  verifyOtpAndResetPassword,
} = require("../controller/userController");
const {
  updateProfile,
  getProfiles,
  searchProfiles,
  getRecentUsers,
  getSingleProfile,
  getProfilePhoto,
} = require("../controller/profileController");
const formidable = require("express-formidable");
const userMiddleware = require("../middleware/authMiddleware");
router = Router();
router.post("/signup", signUp);
router.post("/signup/verify", verifyOtp);
router.post("/signin", signIn);
router.post("/forgot-password", sendOtpForPasswordReset);
router.post("/forgot-password/verify", verifyOtpAndResetPassword);

router.put("/update/:pid", userMiddleware, formidable(), updateProfile);
router.get("/profiles", userMiddleware, getProfiles);
router.get("/profiles/:username", userMiddleware, getSingleProfile);
router.get("/profile-photo/:pid", userMiddleware, getProfilePhoto);
router.get("/search", userMiddleware, searchProfiles);
router.get("/recent-users", userMiddleware, getRecentUsers);
module.exports = router;
