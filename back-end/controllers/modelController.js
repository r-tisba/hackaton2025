const path = require('path');
const { spawn } = require('child_process');
const fetch = require('node-fetch');

exports.predictEmotion = (req, res) => {
    console.log('Starting main.py');

    const { userId } = req.body;
    console.log(`User ID reçu: ${userId}`);

    const pythonProcess = spawn('python', [path.join(__dirname, '../../IA/model-scratch.py')]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
        const dataStr = data.toString();
        console.log(`Python stdout: ${dataStr}`);
        // On accumule toutes les données de sortie
        result += dataStr;
    });

    pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
        console.error(`Python stderr: ${data.toString()}`);
    });

    pythonProcess.on('close', async (code) => {
        if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
            return res.status(500).json({ error: error.trim() });
        }

        console.log(`Python process exited with code ${code}`);
        try {
            // Chercher la ligne qui contient le résultat JSON
            const resultLine = result.split('\n').find(line => line.trim().startsWith('RESULT:'));
            if (!resultLine) {
                throw new Error('Aucun résultat JSON trouvé dans la sortie Python');
            }

            // Extraire et parser le JSON
            const jsonStr = resultLine.replace('RESULT:', '').trim();
            const emotions = JSON.parse(jsonStr);
            console.log(`Emotions reçues: ${JSON.stringify(emotions)}`);

            // Appel l'API pour mettre à jour les émotions
            const response = await fetch('http://localhost:5000/api/emotions/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, emotions })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour des émotions');
            }

            const updateResult = await response.json();
            console.log('Emotions mises à jour:', updateResult);
            res.json(emotions);
        } catch (parseError) {
            console.error('Erreur lors de l\'analyse du JSON:', parseError);
            res.status(500).json({ 
                error: 'Erreur lors de l\'analyse du JSON',
                details: parseError.message 
            });
        }
    });
};