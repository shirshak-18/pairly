const { Router } = require("express");
const { signUp, verifyOtp } = require("../controller/userController");
router = Router();
router.post("/signup", signUp);
router.post("/signup/verify", verifyOtp);
module.exports = router;
