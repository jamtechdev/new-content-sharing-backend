const express = require("express");
const {
  getModalProfileById,
  createModalProfile,
  updateUserById,
  getMyProfile,
  updateModelProfile,
  uploadImage,
  uploadAvatar,
} = require("../../../controller/profile/profile.controller");
const { authenticateToken, userProtect } = require("../../../middleware/middleware");
const { upload } = require("../../../middleware/multerConfig");
const {
  cloudinaryImageUpload,
} = require("../../../services/cloudinaryService");
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
router.get("/get-my-profile", authenticateToken, getMyProfile);
// update my profile
router.put("/my-profile-update", authenticateToken, updateUserById);
router.put('/update-model-profile', authenticateToken, updateModelProfile)
router.put('/upload-image', authenticateToken, upload.single('image'), uploadImage)

// upload avatar
router.post(
  "/upload-avatar",
  authenticateToken,
  userProtect,
  upload.single("avatar"),
  uploadAvatar
);

module.exports = router;
