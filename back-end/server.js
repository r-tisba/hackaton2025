require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importation des routes
const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const interactionRoutes = require('./routes/interactionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Permet de traiter les requêtes JSON
app.use(cors()); // Autorise les requêtes cross-origin

// Connexion à MongoDB
connectDB();

// Définition des routes
app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/interactions', interactionRoutes);

// Route par défaut
app.get('/', (req, res) => {
  res.send('API Twitter Hackathon is running...');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});