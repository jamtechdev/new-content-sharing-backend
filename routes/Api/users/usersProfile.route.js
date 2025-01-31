const express = require("express");
const {
  getModalProfileById,
  createModalProfile,
  updateUserById,
  getMyProfile,
} = require("../../../controller/profile/profile.controller");
const { authenticateToken } = require("../../../middleware/middleware");
const router = express.Router();

// create modal Profile api
router.post("/create-modal-profile", authenticateToken, createModalProfile);
// get modal Profile API
router.get(
  "/get-modal-profile-by-id/:id",
  authenticateToken,
  getModalProfileById
);
// get my profile
router.get("/get-my-profile", authenticateToken, getMyProfile)
// update my profile
router.put("/my-profile-update", authenticateToken, updateUserById);


module.exports = router;
