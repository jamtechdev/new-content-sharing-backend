const cloudinary = require("../config/cloudinary");
const fs = require("fs");

module.exports.cloudinaryImageUpload = async (filepath, contentType) => {
  try {
    // const fileExtension = path.extname(filepath).toLowerCase();
    // const resourceType = fileExtension === '.mp4' || fileExtension === '.mov' ? 'video' : 'image';
    // Read the file as a buffer
    const byteArrayBuffer = fs.readFileSync(filepath);
    // Upload the buffer to Cloudinary using upload_stream
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({resource_type: contentType, folder: "uploads"},(error, uploadResult) => {
          if (error) {
            console.error(`Error uploading ${contentType} to Cloudinary:`, error);
            return reject(`Error uploading ${contentType} to Cloudinary`);
          }
          resolve(uploadResult);
        })
        .end(byteArrayBuffer);
    });
    console.log(
      `Buffer upload_stream with promise success - ${result.public_id}`
    );

    // Delete the file from the local filesystem after successful upload
    fs.unlink(filepath, (unlinkError) => {
      if (unlinkError) {
        console.error(`Error deleting file ${filepath}:`, unlinkError);
      } else {
        console.log(`File ${filepath} deleted successfully.`);
      }
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error in cloudinaryImageUpload:", error.message);
    fs.unlink(filepath, (unlinkError) => {
      if (unlinkError) {
        console.error(`Error deleting file ${filepath}:`, unlinkError);
      } else {
        console.log(`File ${filepath} deleted after upload failure.`);
      }
    });
    throw error;
  }
};
