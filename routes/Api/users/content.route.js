const express = require('express')
const router = express.Router()

const {authenticateToken } = require('../../../middleware/middleware')
const {upload} = require('../../../middleware/multerConfig')
const {  
    uploadImage,
    createContent,
    uploadContent,
    getContent,
    updateContent,
} = require('../../../controller/content/content.controller')


router.put('/upload-image', authenticateToken, upload.single('image'), uploadImage)
router.post('/create-content', authenticateToken, upload.single('content'), createContent)
router.put('/upload-content/:contentId', authenticateToken, upload.single('mediaFile'), uploadContent)
router.get('/get-content', authenticateToken, getContent)
router.put('/update-content', authenticateToken, updateContent)



module.exports = router;


