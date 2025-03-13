const User = require('../models/User');

exports.updateEmotions = async (req, res) => {
    const { userId, emotions } = req.body;
    console.log(`User ID reçu: ${userId}`);
    console.log(`Emotions reçues: ${JSON.stringify(emotions)}`);

    try {
        // Mettre à jour les émotions de l'utilisateur
        const user = await User.findById(userId);
        console.log(`Utilisateur trouvé: ${JSON.stringify(user)}`);
        if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

        for (const [emotion, percentage] of Object.entries(emotions)) {
            if (user[emotion] !== undefined) {
                user[emotion] += 1;
                console.log(`Emotion mise à jour: ${emotion} = ${user[emotion]}`);
            } else {
                console.log(`Emotion invalide: ${emotion}`);
                return res.status(400).json({ message: 'Emotion invalide pour l\'utilisateur' });
            }
        }
        await user.save();
        console.log('Utilisateur mis à jour:', user);

        res.json({ message: 'Emotions mises à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour des émotions:', error);
        res.status(500).json({ message: error.message });
    }
};