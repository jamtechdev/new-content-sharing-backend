const cloudinary = require("../config/cloudinary");
const fs = require("fs");

module.exports.cloudinaryImageUpload = async (req, res) => {
  try {
    const avatar = req.file;
    if (!req.file) {
      return res
        .status(400)
        .json({ code: 400, success: false, message: "No file uploaded" });
    }
    // Read the file as a buffer
    const byteArrayBuffer = fs.readFileSync(req.file.path);

    // Upload the buffer to Cloudinary using upload_stream
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          if (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return reject(new Error("Error uploading image to Cloudinary"));
          }
          resolve(uploadResult);
        })
        .end(byteArrayBuffer);
    });

    console.log(
      `Buffer upload_stream with promise success - ${result.public_id}`
    );
    fs.unlinkSync(avatar.path, (err)=>{
      if(err){
        return res.status(400).json({code: 400, success: false, message: "Error removing image from local"})
      }
      console.log("Image removed from local folder")
    })
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Error in cloudinaryImageUpload:", error.message);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};
