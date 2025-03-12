const path = require('path');
const { spawn } = require('child_process');
const multer = require('multer');
const fs = require('fs');
const fetch = require('node-fetch'); // Assurez-vous d'installer node-fetch

const upload = multer({ dest: 'uploads/' });

exports.uploadImage = upload.single('image');

exports.predictEmotion = (req, res) => {
    const imagePath = req.file.path;
    const { tweetId, userId } = req.body; // Récupérer tweetId et userId du corps de la requête

    console.log(`Received image at path: ${imagePath}`);

    const pythonProcess = spawn('python', [path.join(__dirname, '../../IA/main.py'), imagePath]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
        console.log(`Python stdout: ${data.toString()}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
        console.error(`Python stderr: ${data.toString()}`);
    });

    pythonProcess.on('close', async (code) => {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); // Supprimer le fichier temporaire après traitement
        }

        if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
            return res.status(500).json({ error: error.trim() });
        }

        console.log(`Python process exited with code ${code}`);
        const emotion = result.trim();

        // appel l'API pour mettre à jour les émotions
        try {
            const response = await fetch('http://localhost:5000/api/emotions/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tweetId, userId, emotion })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour des émotions');
            }

            const updateResult = await response.json();
            console.log('Emotions mises à jour:', updateResult);
            res.json({ result: emotion });
        } catch (updateError) {
            console.error('Erreur lors de la mise à jour des émotions:', updateError);
            res.status(500).json({ error: updateError.message });
        }
    });
};