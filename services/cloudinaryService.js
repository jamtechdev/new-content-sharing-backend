const cloudinary = require('../config/cloudinary');
const fs = require('fs');

module.exports.cloudinaryImageUpload = async (filepath) => {
  try {
    // Read the file as a buffer
    const byteArrayBuffer = fs.readFileSync(filepath);

    // Upload the buffer to Cloudinary using upload_stream
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          if (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return reject(new Error('Error uploading image to Cloudinary'));
          }
          console.log('Uploaded image result:', uploadResult);
          resolve(uploadResult);
        })
        .end(byteArrayBuffer);
    });

    // Log success and return the secure URL
    console.log(`Buffer upload_stream with promise success - ${result.public_id}`);
    return result.secure_url;
  } catch (error) {
    console.error('Error in cloudinaryImageUpload:', error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};
  // fs.unlinkSync(filepath, (err)=>{
  //   if(err){
  //     return res.status(400).json({code: 400, success: false, message: "Error removing image from local"})
  //   }
  //   console.log("Image removed from local folder")
  // })