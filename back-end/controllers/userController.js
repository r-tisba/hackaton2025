const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// Générer UNE seule fois la clé secrète
const SECRET_KEY = crypto.randomBytes(32).toString('hex');
exports.registerUser = async (req, res) => {
    const { pseudo, mail, pwd, interests } = req.body;

    const interestToEmotionMap = {
        "Humour": "happy",
        "Frustation": "angry",
        "Trise": "sad",
        "Surprise": "surprise",
        "Horreur": "fear",
        "Dégoût": "disgust",
        "Tout": "neutral"
    };

    try {
        const hashedPassword = await bcrypt.hash(pwd, 10);

        // Initialiser les compteurs d'émotions
        const emotionCounts = {
            happy: 0,
            angry: 0,
            sad: 0,
            surprise: 0,
            fear: 0,
            neutral: 0,
            disgust: 0
        };

        // Incrémenter les compteurs des émotions pour chaque centre d'intérêt
        interests.forEach(interest => {
            const emotion = interestToEmotionMap[interest];
            if (emotion) {
            emotionCounts[emotion] += 1; // Incrémenter le compteur correspondant
            }
        });

        const newUser = new User({
            pseudo,
            mail,
            pwd: hashedPassword,
            angry: emotionCounts.angry,
            disgust: emotionCounts.disgust,
            fear: emotionCounts.fear,
            happy: emotionCounts.happy,
            neutral: emotionCounts.neutral,
            sad: emotionCounts.sad,
            surprise: emotionCounts.surprise
        });
        
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.SECRET_KEY = SECRET_KEY;

exports.loginUser = async (req, res) => {
    const { mail, pwd } = req.body;
    try {
        const user = await User.findOne({ mail });
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(pwd, user.pwd);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user._id },SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-pwd');
        if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
