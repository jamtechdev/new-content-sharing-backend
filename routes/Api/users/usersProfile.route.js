const express = require("express");
const {
  getModalProfileById,
} = require("../../../controller/profile/profile.controller");
const { authenticateToken } = require("../../../middleware/middleware");
const router = express.Router();

router.get(
  "/get-modal-profile-by-id/:id",
  authenticateToken,
  getModalProfileById
);

module.exports = router;
