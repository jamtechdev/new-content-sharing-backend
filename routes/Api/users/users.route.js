const express = require("express");
const {
  signUp,
  login,
  loginWithGoogle,
  logout,
} = require("../../../controller/users/auth.controller");
const { authenticateToken } = require("../../../middleware/middleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/login-with-google", loginWithGoogle);

module.exports = router;
