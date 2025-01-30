const express = require("express");
const {
  signUp,
  login,
  loginWithGoogle,
  logout,
  update,
} = require("../../../controller/users/auth.controller");
const { authenticateToken } = require("../../../middleware/middleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/login-with-google", loginWithGoogle);
router.put('/update-user/:id', authenticateToken, update)

module.exports = router;
