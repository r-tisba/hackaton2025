# Hackathon 2025 - Application type Twitter avec IA

## Description
Ce projet est une application similaire à Twitter intégrant une analyse d'expressions faciales en temps réel via une API IA.
- **Front-end :** React.js
- **Back-end :** Node.js/Express
- **Base de données :** MongoDB Atlas
- **Module IA :** Flask (ou Django) avec un modèle CNN pour la reconnaissance d'expressions faciales

## Structure du projet
- **back-end/** : Code source du serveur Node.js/Express
- **front-end/** : Code source de l'application React
- **IA/** : API en Flask (ou Django) pour l'analyse des expressions faciales

## Instructions d'installation
### Back-end
1. Navigue dans le dossier `back-end`
2. Installe les dépendances : `npm install`
3. Lance le serveur : `node server.js`

### Front-end
1. Navigue dans le dossier `front-end`
2. Installe les dépendances : `npm install`
3. Lance l'application : `npm start`

### Module IA
1. Navigue dans le dossier `IA`
2. Active l'environnement virtuel : `venv\Scripts\activate` (Windows) ou `source venv/bin/activate` (macOS/Linux)
3. Installe Flask : `pip install flask`
4. Lance l'API : `python app.py`

## Déploiement
(Si tu utilises Docker, ajoute ici les instructions pour le docker-compose et le Dockerfile)

## Notes
- Assure-toi d'avoir les outils nécessaires installés : Node.js, npm, Python, etc.
- Utilise Git pour suivre les modifications : `git add .`, `git commit -m "Message"` puis `git push`.

