const express = require("express");
const {
  getModalProfileById,
  createModalProfile,
  updateUserById,
} = require("../../../controller/profile/profile.controller");
const { authenticateToken } = require("../../../middleware/middleware");
const router = express.Router();

// create profile api

router.post("/create-modal-profile", authenticateToken, createModalProfile);

router.get(
  "/get-modal-profile-by-id/:id",
  authenticateToken,
  getModalProfileById
);
router.put("/update-user", authenticateToken, updateUserById);

module.exports = router;
