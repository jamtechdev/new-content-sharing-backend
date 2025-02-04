require("dotenv").config();
const { where } = require("sequelize");
const db = require("../../models/index.js");
const {
  cloudinaryImageUpload,
} = require("../../services/cloudinaryService.js");
const User = db.users;
const Region = db.Regions;
const Profile = db.model_profile;
const Content = db.Content;
const Category = db.ContentCategory

// create profile api
exports.updateUserById = async (req, res) => {
  try {
    const user = req?.user;
    const formdata = req?.body;
    if (!user?.userId && user?.role != "user") {
      return res.status(401).json({
        error: true,
        message: "Unauthorised Role! You are not allowed to this action.",
      });
    }
    const response = await User.update(formdata, {
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
  const user = req?.user
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
      data: profile
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
exports.updateModelProfile = async (req, res)=>{
  try {
    const formdata = req?.body;
    const user = req?.user;
    
      // if (user?.role != "model") {  // Need to ask here
      //   return res.status(401).json({
      //     error: true,
      //     message: "Unauthorized Role! You are not allowed to this action.",
      //   });
      // }
      if(Object.keys(formdata).length === 0){
        return res.status(400).json({code: 400, success: false, message: "Fields required to update profile"})
      }
    const model_exists = await Profile.findOne({where: {user_id: user?.userId}})
    if(!model_exists){
      return res.status(404).json({code: 404, success: false, message: "No such model profile exists"})
    }
    const username_exists = formdata?.username && await Profile.findOne({where: {username: formdata.username}})
    if(username_exists){
      return res.status(409).json({code: 409, success: false, message: "Username already exists, please choose another"})
    }
    
    const response = await Profile.update(formdata, {where: {id: model_exists.id}})
    if (response[0] === 0) {
      return res.status(404).json({
        code: 404,
        error: true,
        message: "Id not found in table!",
      });
    }
    const modelProfile = await Profile.findOne({where: {id: model_exists.id}})
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Model profile updated successfully.",
      data: modelProfile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({code: 500, success: false, error: "Internal server error" });
  }
}

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
    const existing_user = await User.findOne({ where: { id: user?.userId }});
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
    const updatedUser = await User.findOne({ where: { id: user?.userId  },
      attributes: ["id", "name", "email", "avatar", "address", "phone_number", "birthdate", "social_links", "bio"],});
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

exports.uploadImage = async (req, res)=>{
  try {
    const user = req?.user
    const image = req.file
    if(!image){
      return res.status(400).json({code: 400, success: false, message: "No image uploaded"})
    }
    const model_exists = await Profile.findOne({where: {user_id: user.userId}})
    if(!model_exists){
      return res.status(404).json({code: 404, success: false, message: "No such model profile exists"})
    }
    
    const imageUri = await cloudinaryImageUpload(image.path, "image")
    
    const response = req.body.profile_picture? await Profile.update({profile_picture: imageUri}, {where: {id: model_exists.id}})
    :await Profile.update({cover_photo: imageUri}, {where: {id: model_exists.id}})

    const modelProfile = await Profile.findOne({where: {id: model_exists.id}})
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Image uploaded successfully",
      data: modelProfile
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({code: 500, success: false, error: "Internal server error" });
  }
}

exports.createContent = async (req, res) =>{
  const {userId} = req?.user
  const {title,description,content_type,category_id} = req.body
  const user = await User.findOne({where: {id: user.userId}})

  if(Object.keys(req.body).length ===0){
    return res.status(400).json({code: 400, success: false, message: "Data is required to create content"})
  }
  try {
    const data = {
      title,
      description,
      content_type,
      category_id,
      user_id: userId,
      region_id: user.region_id,
    }
    const content = await Content.create(data)
    return res.status(201).json({code: 201, success: true, message: "Content created successfully", data: content})
    
  } catch (error) {
    console.error("Error creating content", error);
    res.status(500).json({code: 500, success: false, error: "Internal server error" });
  }
}

exports.uploadContent = async(req, res)=>{
  try {
    const user = req?.user
    const {contentId} = req.params
    const mediaFile = req?.file
    const content_exists = await Content.findOne({where: {id: contentId, user_id: user.userId}})
    if(!content_exists){
      return res.status(404).json({code: 404, success: false, message: "Content not found"})
    }
    if(!mediaFile){
      return res.status(400).json({code: 400, success: false, message: "No media file attached"})
    }
    const mediaFileUrl = await cloudinaryImageUpload(mediaFile.path, content_exists.content_type)
    await Content.update({media_url: mediaFileUrl}, {where: {user_id: user.userId, id: contentId}})
    
    const content = await Content.findOne({where: {user_id: user.userId, id: contentId}})
    return res.status(200).json({code: 200, success: true, message: "Content uploaded successfully", data: content})
  } catch (error) {
    console.error("Error uploading content", error);
    res.status(500).json({code: 500, success: false, error: "Internal server error" });
  }
}

exports.getContent = async (req, res) =>{
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const {userId} = req?.user
    const user = await User.findOne({where: {id: userId}})

  const offset = (page-1)*limit
  const {count, rows} = await Content.findAndCountAll({where: {region_id: user.region_id},
    limit,
    offset
  //   include: [{
  //   model: Category,
  //   as: "category"
  // }]
})
  if(rows.length === 0){
    return res.status(404).json({code: 404, success: false, message: "Content not found"})
  }
  const pagination = {
    totalPages: Math.ceil(count/limit),
    totalDocs: count,
    currentPage: page
  }
  return res.status(200).json({code: 200, success: true, total: count, region: user.region_id, message: "Content fetched successfully", pagination:pagination, data: rows})
  } catch (error) {
    console.error(error);
    res.status(500).json({code: 500, success: false, error: "Internal server error" });
  }
}

exports.updateContent = async (req, res)=>{
  try {
    const user = req?.user
    const {contentId} = req.params
  if(Object.keys(req.body).length === 0){
    return res.status(400).json({code: 400, success: false, message: "Data fields required to update content"})
  }
  const content = await Content.findOne({where: {id: contentId, user_id: user.userId}})
  if(!content){
    return res.status(404).json({code: 404, success: false, message: "Content not found"})
  }
  const updateContent = await Content.update(req.body, {where: {id: contentId, user_id: user.userId}})
  if (updateContent[0] === 0) {
    return res.status(404).json({
      code: 400,
      error: true,
      message: "Unable to update content",
    });
  }
  const response = await Content.findOne({where: {id: contentId, user_id: user.userId}})

  return res.status(200).json({code: 200, success: true, message: "Content data updated successfully", data: response})
  } catch (error) {
    console.error(error)
    return res.status(500).json({code: 500, success: false, message: "Internal server error"})
  }
}