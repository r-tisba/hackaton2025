const express = require('express');
const { createTweet, getAllTweets, getTweetById, getMyTweet, deleteTweet } = require('../controllers/tweetController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createTweet);
router.get('/', getAllTweets);
router.get('/mytweets', authMiddleware, getMyTweet);
router.get('/:id', getTweetById);
router.delete('/:id', authMiddleware, deleteTweet);

module.exports = router;
