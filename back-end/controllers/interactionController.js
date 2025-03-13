const Like = require('../models/Like');
const Retweet = require('../models/Retweet');
const Follow = require('../models/Follow');
const Signet = require('../models/Signet');

exports.getMyLikes = async (req, res) => {
    try {
        const likes = await Like.find({ id_user: req.user.id });
        res.json(likes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.likeTweet = async (req, res) => {
    try {
        const like = new Like({ id_user: req.user.id, id_tweet: req.params.tweetId });
        await like.save();
        res.json({ message: 'Tweet liké' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.unLikeTweet = async (req, res) => {
    try {
        const like = await Like.findById(req.params.likeId);
        if (!like) return res.status(404).json({ message: 'Like introuvable' });

        if (like.id_user.toString() !== req.user.id)
            return res.status(403).json({ message: 'Accès refusé' });

        await like.deleteOne();
        res.json({ message: 'Like supprimé' });
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

exports.unRetweetTweet = async (req, res) => {
    try {
        const retweet = await Retweet.findById(req.params.retweetId);
        if (!retweet) return res.status(404).json({ message: 'Retweet introuvable' });

        if (retweet.id_user.toString() !== req.user.id)
            return res.status(403).json({ message: 'Accès refusé' });

        await retweet.deleteOne();
        res.json({ message: 'Retweet supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyRetweets = async (req, res) => {
    try {
        const retweets = await Retweet.find({ id_user: req.user.id });
        res.json(retweets);
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

exports.unFollowUser = async (req, res) => {
    try {
        const follow = await Follow.findOne({ id_user: req.user.id, id_followe: req.params.userId });
        if (!follow) return res.status(404).json({ message: 'Follow introuvable' });
        await follow.deleteOne();
        res.json({ message: 'Follow supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyFollows = async (req, res) => {
    try {
        const follows = await Follow.find({ id_user: req.user.id });
        res.json(follows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.signetTweet = async (req, res) => {
    try {
        const signet = new Signet({ id_user: req.user.id, id_tweet: req.params.tweetId });
        await signet.save();
        res.json({ message: 'Tweet signeté' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSignet = async (req, res) => {
    try {
        const signet = await Signet.findOne({ id: req.params.id });
        if (!signet) return res.status(404).json({ message: 'Signet introuvable' });
        await signet.deleteOne();
        res.json({ message: 'Signet supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMySignets = async (req, res) => {
    try {
        const signets = await Signet.find({ id_user: req.user.id });
        res.json(signets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
