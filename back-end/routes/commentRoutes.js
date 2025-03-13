const express = require('express');
const { getCommentsByTweetId, addComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:tweetId', getCommentsByTweetId);
router.post('/:tweetId', authMiddleware, addComment);

module.exports = router;