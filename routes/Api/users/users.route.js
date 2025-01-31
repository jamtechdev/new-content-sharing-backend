const express = require("express");
const {
  signUp,
  login,
  loginWithGoogle,
  logout,
  forgotPassword,
  resetPassword
} = require("../../../controller/users/auth.controller");
const { authenticateToken, userProtect } = require("../../../middleware/middleware");
const {upload} = require('../../../middleware/multerConfig')
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/login-with-google", loginWithGoogle);
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)




module.exports = router;