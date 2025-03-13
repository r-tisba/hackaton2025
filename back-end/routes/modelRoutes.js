const express = require('express');
const { predictEmotion, uploadImage } = require('../controllers/modelController');

const router = express.Router();

router.post('/predict', predictEmotion);

module.exports = router;