const db = require("../../models/index.js");
const Content = db.Content;
const User = db.users;
const {
    cloudinaryImageUpload,
  } = require("../../services/cloudinaryService.js");



//   --------------> to upload profile picture and cover photo <------------------------
  exports.uploadImage = async (req, res) => {
    try {
      const user = req?.user;
      const image = req.file;
      if (!image) {
        return res
          .status(400)
          .json({ code: 400, success: false, message: "No image uploaded" });
      }
      const model_exists = await Profile.findOne({
        where: { user_id: user.userId },
      });
      if (!model_exists) {
        return res.status(404).json({
          code: 404,
          success: false,
          message: "No such model profile exists",
        });
      }
  
      const imageUri = await cloudinaryImageUpload(image.path, "image");
  
      const response = req.body.profile_picture
        ? await Profile.update(
            { profile_picture: imageUri },
            { where: { id: model_exists.id } }
          )
        : await Profile.update(
            { cover_photo: imageUri },
            { where: { id: model_exists.id } }
          );
  
      const modelProfile = await Profile.findOne({
        where: { id: model_exists.id },
      });
      return res.status(200).json({
        code: 200,
        status: true,
        message: "Image uploaded successfully",
        data: modelProfile,
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      res
        .status(500)
        .json({ code: 500, success: false, error: "Internal server error" });
    }
  };

exports.createContent = async (req, res) => {
    const { userId } = req?.user;
    const mediaFile = req?.file;
    const { title, description, content_type, category_id } = req.body;
    const user = await User.findOne({ where: { id: userId } });
  
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Data is required to create content",
      });
    }

    try {
      const mediaFileUrl = await cloudinaryImageUpload(
        mediaFile.path,
        content_type
      );
      const data = {
        title,
        description,
        content_type,
        category_id,
        user_id: userId,
        region_id: user.region_id,
        media_url: mediaFileUrl
      };
      const content = await Content.create(data);
      return res.status(201).json({
        code: 201,
        success: true,
        message: "Content created successfully",
        data: content,
      });
    } catch (error) {
      console.error("Error creating content", error);
      res
        .status(500)
        .json({ code: 500, success: false, error: "Internal server error" });
    }
  };
  
  exports.uploadContent = async (req, res) => {
    try {
      const user = req?.user;
      const { contentId } = req.params;
      const mediaFile = req?.file;
      const content_exists = await Content.findOne({
        where: { id: contentId, user_id: user.userId },
      });
      if (!content_exists) {
        return res
          .status(404)
          .json({ code: 404, success: false, message: "Content not found" });
      }
      if (!mediaFile) {
        return res
          .status(400)
          .json({ code: 400, success: false, message: "No media file attached" });
      }
      const mediaFileUrl = await cloudinaryImageUpload(
        mediaFile.path,
        content_exists.content_type
      );
      await Content.update(
        { media_url: mediaFileUrl },
        { where: { user_id: user.userId, id: contentId } }
      );
  
      const content = await Content.findOne({
        where: { user_id: user.userId, id: contentId },
      });
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Content uploaded successfully",
        data: content,
      });
    } catch (error) {
      console.error("Error uploading content", error);
      res
        .status(500)
        .json({ code: 500, success: false, error: "Internal server error" });
    }
  };
  
  exports.getContent = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { userId } = req?.user;
      const user = await User.findOne({ where: { id: userId } });
  
      const offset = (page - 1) * limit;
      const { count, rows } = await Content.findAndCountAll({
        where: { region_id: user.region_id },
        limit,
        offset,
        //   include: [{
        //   model: Category,
        //   as: "category"
        // }]
      });
      if (rows.length === 0) {
        return res
          .status(404)
          .json({ code: 404, success: false, message: "Content not found" });
      }
      const pagination = {
        totalPages: Math.ceil(count / limit),
        totalDocs: count,
        currentPage: page,
      };
      return res.status(200).json({
        code: 200,
        success: true,
        total: count,
        region: user.region_id,
        message: "Content fetched successfully",
        pagination: pagination,
        data: rows,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ code: 500, success: false, error: "Internal server error" });
    }
  };
  
  exports.updateContent = async (req, res) => {
    try {
      const user = req?.user;
      const { status, title, description, content_type, category_id, contentId } = req?.body;
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "Data fields required to update content",
        });
      }
      const content = await Content.findOne({
        where: { id: contentId, user_id: user.userId },
      });
      if (!content) {
        return res
          .status(404)
          .json({ code: 404, success: false, message: "Content not found" });
      }
      const updateContent = await Content.update(
        {
          status,
          title,
          description,
          content_type,
          category_id,
        },
        {
          where: { id: contentId, user_id: user.userId },
        }
      );
      if (updateContent[0] === 0) {
        return res.status(404).json({
          code: 400,
          error: true,
          message: "Unable to update content",
        });
      }
      const response = await Content.findOne({
        where: { id: contentId, user_id: user.userId },
      });
  
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Content data updated successfully",
        data: response,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ code: 500, success: false, message: "Internal server error" });
    }
  };
  