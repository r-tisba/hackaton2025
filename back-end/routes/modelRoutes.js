const express = require('express');
const { predictEmotion, uploadImage } = require('../controllers/modelController');

const router = express.Router();

router.post('/predict', uploadImage, predictEmotion);

module.exports = router;