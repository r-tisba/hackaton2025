const path = require('path');
const { spawn } = require('child_process');
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

exports.uploadImage = upload.single('image');

exports.predictEmotion = (req, res) => {
    const imagePath = req.file.path;

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

    pythonProcess.on('close', (code) => {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); // Supprimer le fichier temporaire après traitement
        }

        if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
            return res.status(500).json({ error: error.trim() });
        }

        console.log(`Python process exited with code ${code}`);
        res.json({ result: result.trim() });
    });
};