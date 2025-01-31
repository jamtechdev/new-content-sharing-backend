const multer = require("multer");
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/uploads')
  },
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname )
  },
})
const fileFilter = (req, file, cb)=>{
  if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true)
  }
  else {
    cb(null, false)
    return cb("Supported file format: .jpg, .jpeg, .png", false)
  }
}
const upload = multer({ storage, fileFilter });



module.exports = { upload };

// console.log("Image path =========>", path.join(__dirname, "../public", "avatar") )