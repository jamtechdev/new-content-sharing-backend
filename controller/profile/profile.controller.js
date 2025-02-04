require("dotenv").config();
const { where } = require("sequelize");
const db = require("../../models/index.js");
const {
  cloudinaryImageUpload,
} = require("../../services/cloudinaryService.js");
const User = db.users;
const Region = db.Regions;
const Profile = db.model_profile;

const Category = db.ContentCategory;

// create profile api
exports.updateUserById = async (req, res) => {
  try {
    const user = req?.user;
    const {
      name,
      email,
      email_verified_at,
      password: hashedPassword,
      is_blocked_by_platform,
      address,
      phone_number,
      birthdate,
      social,
      bio,
      region_id,
      role_id,
    } = req?.body;
    if (!user?.userId && user?.role != "user") {
      return res.status(401).json({
        error: true,
        message: "Unauthorised Role! You are not allowed to this action.",
      });
    }
    const response = await User.update({
      name,
      email,
      email_verified_at,
      password: hashedPassword,
      is_blocked_by_platform,
      address,
      phone_number,
      birthdate,
      social,
      bio,
      region_id,
      role_id,
    }, {
      where: {
        id: user?.userId,
      },
    });
    if (response[0] === 0) {
      return res.status(404).json({
        error: true,
        message: "Id not found in table!",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User details updated successfully.",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createModalProfile = async (req, res) => {
  const user = req?.user;
  try {
    const {
      username,
      bio,
      // user_id,
      region_id,
      website_url,
      social_links,
      location,
      birthdate,
      gender,
      sexual_orientation,
      followers_count,
      earnings,
      subscription_price,
      is_verified,
      is_online,
      is_active,
      premium_access,
      content_visibility,
    } = req.body;

    const existing_profile = await Profile.findOne({
      where: { user_id: user.userId },
    });

    const existing_username = await Profile.findOne({
      where: { username },
    });
    if (existing_username) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Username already exists",
      });
    }
    if (existing_profile) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Profile already exists",
      });
    }
    const profile = await Profile.create({
      username,
      bio,
      user_id: user.userId,
      region_id,
      website_url,
      social_links,
      location,
      birthdate,
      gender,
      sexual_orientation,
      followers_count,
      earnings,
      subscription_price,
      is_verified,
      is_online,
      is_active,
      premium_access,
      content_visibility,
    });
    if (!profile) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "profile not created",
      });
    }
    return res.status(201).json({
      code: 201,
      message: "User profile created successfully",
      status: true,
      data: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// get Modal  profile by id
exports.getModalProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOne({
      where: { id },
      attributes: ["id", "username", "bio"],
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
      return res.status(404).json({
        code: 404,
        status: false,

        message: "profile not found",
      });
    }
    return res.status(200).json({
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

// update model profile
exports.updateModelProfile = async (req, res) => {
  try {
    const {
      username,
      bio,
      website_url,
      social_links,
      location,
      birthdate,
      gender,
      sexual_orientation,
    } = req?.body;
    const user = req?.user;

    // if (user?.role != "model") {  // Need to ask here
    //   return res.status(401).json({
    //     error: true,
    //     message: "Unauthorized Role! You are not allowed to this action.",
    //   });
    // }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Fields required to update profile",
      });
    }
    const model_exists = await Profile.findOne({
      where: { user_id: user?.userId },
    });
    if (!model_exists) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "No such model profile exists",
      });
    }
    const username_exists =
      username &&
      (await Profile.findOne({ where: { username: username } }));
    if (username_exists) {
      return res.status(409).json({
        code: 409,
        success: false,
        message: "Username already exists, please choose another",
      });
    }

    const response = await Profile.update({
      username,
      bio,
      website_url,
      social_links,
      location,
      birthdate,
      gender,
      sexual_orientation,
    }, {
      where: { id: model_exists.id },
    });
    if (response[0] === 0) {
      return res.status(404).json({
        code: 404,
        error: true,
        message: "Id not found in table!",
      });
    }
    const modelProfile = await Profile.findOne({
      where: { id: model_exists.id },
    });
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Model profile updated successfully.",
      data: modelProfile,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: 500, success: false, error: "Internal server error" });
  }
};

// getUserProfile
exports.getMyProfile = async (req, res) => {
  try {
    const user = req?.user;
    if (user?.userId && "user" != user?.role) {
      return res.status(401).json({
        error: true,
        message: "Unauthorised Role! You are not allowed to this action.",
      });
    }
    const UserData = await User.findOne({
      where: { id: user?.userId },
      attributes: [
        "id",
        "name",
        "email",
        "avatar",
        "address",
        "phone_number",
        "birthdate",
        "social_links",
        "bio",
      ],
      include: [
        {
          model: Region,
          as: "region",
          attributes: ["name"],
        },
      ],
      raw: true,
      nest: true,
    });
    if (!UserData) {
      return res.status(404).json({
        code: 404,
        status: false,

        message: "profile not found",
      });
    }
    return res.status(200).json({
      code: 200,
      message: "User profile retrieved successfully",
      status: true,
      data: UserData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// upload Aavart and Update
exports.uploadAvatar = async (req, res) => {
  try {
    const user = req?.user;
    const avatar = req?.file;
    if (!avatar) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "No file uploaded",
      });
    }
    const existing_user = await User.findOne({ where: { id: user?.userId } });
    if (!existing_user) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "User not found",
      });
    }
    const uploadedAvatar = await cloudinaryImageUpload(avatar?.path, "image");
    if (uploadedAvatar?.error) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: uploadedAvatar?.error,
      });
    }
    // Update user's avatar
    await User.update(
      { avatar: uploadedAvatar },
      { where: { id: user?.userId } }
    );
    // Fetch the updated user data
    const updatedUser = await User.findOne({
      where: { id: user?.userId },
      attributes: [
        "id",
        "name",
        "email",
        "avatar",
        "address",
        "phone_number",
        "birthdate",
        "social_links",
        "bio",
      ],
    });
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Avatar uploaded successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};


