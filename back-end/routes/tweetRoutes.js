const express = require('express');
const { createTweet, getAllTweets, getTweetById, deleteTweet } = require('../controllers/tweetController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createTweet);
router.get('/', getAllTweets);
router.get('/:id', getTweetById);
router.delete('/:id', authMiddleware, deleteTweet);

module.exports = router;
