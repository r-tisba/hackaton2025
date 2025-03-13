const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Récupérer le token Bearer depuis l'en-tête
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Décoder le token avec la clé secrète
    req.user = decoded; // Ajouter l'utilisateur décodé dans req.user
    next(); // Passer à la route suivante
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }

};

module.exports = authMiddleware;
