const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../controllers/userController'); // Import de la clé

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
