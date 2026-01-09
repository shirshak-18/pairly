const { Router } = require("express");
const { signUp, verifyOtp, signIn } = require("../controller/userController");
router = Router();
router.post("/signup", signUp);
router.post("/signup/verify", verifyOtp);
router.post("/signin", signIn);
module.exports = router;
