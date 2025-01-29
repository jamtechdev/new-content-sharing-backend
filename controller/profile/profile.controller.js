require("dotenv").config();
const db = require("../../models/index.js");
const User = db.users;
const Region = db.Regions;
const Profile = db.model_profile;

exports.getModalProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOne({
      where: { id },
      attributes: ["username"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "avatar"],
        },
        {
          model: Region,
          as: "region",
          attributes: ["name"],
        },
      ],
    });
    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }
    res.status(200).json({
      code: 200,
      message: "User profile retrieved successfully",
      status: true,
      profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
