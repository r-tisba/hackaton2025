const express = require('express');
const { likeTweet, retweetTweet, followUser } = require('../controllers/interactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/like/:tweetId', authMiddleware, likeTweet);
router.post('/retweet/:tweetId', authMiddleware, retweetTweet);
router.post('/follow/:userId', authMiddleware, followUser);

module.exports = router;
