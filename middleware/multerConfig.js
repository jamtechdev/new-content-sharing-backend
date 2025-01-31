const multer = require("multer");


// console.log("Image path =========>", path.join(__dirname, "../public", "avatar") )

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/avatar')
  },
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname )
  },
})

const upload = multer({ storage });



module.exports = { upload };
