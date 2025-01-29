const express = require("express");
const { signUp, login } = require("../../../controller/users/auth.controller");
const { authenticateToken } = require("../../../middleware/middleware");
const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

module.exports = router;
