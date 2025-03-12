const Tweet = require('../models/Tweet');

exports.createTweet = async (req, res) => {
    const { contenue, attachment } = req.body;
    try {
        console.log(req.user);
        const newTweet = new Tweet({ id_user: req.user.id, contenue, attachment });
        await newTweet.save();
        res.status(201).json(newTweet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find().populate('id_user', 'pseudo');
        res.json(tweets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTweetById = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id).populate('id_user', 'pseudo');
        if (!tweet) return res.status(404).json({ message: 'Tweet introuvable' });
        res.json(tweet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTweet = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (!tweet) return res.status(404).json({ message: 'Tweet introuvable' });

        if (tweet.id_user.toString() !== req.user.id)
            return res.status(403).json({ message: 'Accès refusé' });

        await tweet.deleteOne();
        res.json({ message: 'Tweet supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
