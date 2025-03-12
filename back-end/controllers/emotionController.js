const Tweet = require('../models/Tweet');
const User = require('../models/User');

exports.updateEmotions = async (req, res) => {
    const { tweetId, userId, emotion } = req.body;

    try {
        // Mettre à jour les émotions du tweet
        const tweet = await Tweet.findById(tweetId);
        console.log("EOMOTION reçue-----> ",emotion)
        console.log("tweet[emotion] -----> ",tweet[emotion])

        // console.log("THE TWEET",tweet);
        if (!tweet) return res.status(404).json({ message: 'Tweet introuvable' });
        tweet[emotion] += 1;
        await tweet.save();

        // Mettre à jour les émotions de l'utilisateur
        const user = await User.findById(userId);
        // console.log("THE USER",user);
        if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
        user[emotion] += 1;
        await user.save();

        res.json({ message: 'Emotions mises à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};