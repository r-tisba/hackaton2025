const express = require('express');
const { updateEmotions } = require('../controllers/emotionController');

const router = express.Router();

router.post('/update', updateEmotions);

module.exports = router;