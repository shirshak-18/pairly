const { Router } = require("express");
const {
  signUp,
  verifyOtp,
  signIn,
  sendOtpForPasswordReset,
  verifyOtpAndResetPassword,
} = require("../controller/userController");
router = Router();
router.post("/signup", signUp);
router.post("/signup/verify", verifyOtp);
router.post("/signin", signIn);
router.post("/forgot-password", sendOtpForPasswordReset);
router.post("/forgot-password/verify", verifyOtpAndResetPassword);
module.exports = router;
