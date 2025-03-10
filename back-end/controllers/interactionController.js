const Like = require('../models/Like');
const Retweet = require('../models/Retweet');
const Follow = require('../models/Follow');

exports.likeTweet = async (req, res) => {
    try {
        const like = new Like({ id_user: req.user.id, id_tweet: req.params.tweetId });
        await like.save();
        res.json({ message: 'Tweet liké' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.retweetTweet = async (req, res) => {
    try {
        const retweet = new Retweet({ id_user: req.user.id, id_tweet: req.params.tweetId });
        await retweet.save();
        res.json({ message: 'Tweet retweeté' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.followUser = async (req, res) => {
    try {
        const follow = new Follow({ id_user: req.user.id, id_followe: req.params.userId });
        await follow.save();
        res.json({ message: 'Utilisateur suivi' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
