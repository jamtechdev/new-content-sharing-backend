const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    // secure: true, // if want to return secure url
  });
const cloudinaryImageUpload = async (filepath) => {
    const byteArrayBuffer = fs.readFileSync(filepath);
    new Promise((resolve) => {
      cloudinary.v2.uploader
        .upload_stream((error, uploadResult) => {
          if (error) {
            return "Error uploading image on cloudinary";
          }
          console.log(uploadResult);
          return resolve(uploadResult);
        })
        .end(byteArrayBuffer);
    }).then((uploadResult) => {
      console.log(
        `Buffer upload_stream wth promise success - ${uploadResult.public_id}`
      );
      // fs.unlinkSync(filepath, (err)=>{
      //   if(err){
      //     return res.status(400).json({code: 400, success: false, message: "Error removing image from local"})
      //   }
      //   console.log("Image removed from local folder")
      // })
    })
    // return res
    //   .status(200)
    //   .json({ code: 200, success: true, message: "Image uploaded successfully" });
  };
  


  module.exports = cloudinaryImageUpload