const express = require("express");
const {
  getModalProfileById,
  createModalProfile,
  updateUserById,
} = require("../../../controller/profile/profile.controller");
const { authenticateToken } = require("../../../middleware/middleware");
const cloudinaryImageUpload = require("../../../config/cloudinaryConfig");
const {upload} = require('../../../middleware/multerConfig')
const router = express.Router();

// create modal Profile api
router.post("/create-modal-profile", authenticateToken, createModalProfile);
// get modal Profile API
router.get(
  "/get-modal-profile-by-id/:id",
  authenticateToken,
  getModalProfileById
);
// update user API
router.put("/update-user/:id", authenticateToken, updateUserById);
// upload Image
router.post('/upload-image', cloudinaryImageUpload)

module.exports = router;
