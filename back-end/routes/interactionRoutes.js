const express = require('express');
const { likeTweet, unLikeTweet,  getMyLikes, retweetTweet, unRetweetTweet, getMyRetweets, followUser, unFollowUser, getMyFollows, signetTweet, deleteSignet, getMySignets } = require('../controllers/interactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/like/:tweetId', authMiddleware, likeTweet);
router.delete('/like/:likeId', authMiddleware, unLikeTweet);
router.get('/mylikes', authMiddleware, getMyLikes);

router.post('/retweet/:tweetId', authMiddleware, retweetTweet);
router.delete('/retweet/:retweetId', authMiddleware, unRetweetTweet);
router.get('/myretweets', authMiddleware, getMyRetweets);

router.post('/follow/:userId', authMiddleware, followUser);
router.delete('/follow/:followId', authMiddleware, unFollowUser);
router.get('/myfollows', authMiddleware, getMyFollows);

router.post('/signet/:tweetId', authMiddleware, signetTweet);
router.delete('/signet/:signetId', authMiddleware, deleteSignet);
router.get('/mysignets', authMiddleware, getMySignets);

module.exports = router;
