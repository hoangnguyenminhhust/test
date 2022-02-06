const router = require('express').Router();
const uploadController = require('../controllers/upload.controller');

router.post('/base64', uploadController.getImagePreSignUrl);
router.post('/', uploadController.getPreSignUrl);
router.put('/', uploadController.uploadIamge);

router.post('/delete', uploadController.deleteImage);

module.exports = router;
