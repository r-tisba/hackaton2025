# Hackathon 2025 - Application type Twitter avec IA

## Description
Ce projet est une application similaire à Twitter intégrant une analyse d'expressions faciales en temps réel via une API IA.
- **Front-end :** React.js
- **Back-end :** Node.js/Express
- **Base de données :** MongoDB Atlas
- **Module IA :** Python avec un module CNN pour la reconnaissance d'expressions faciales

## Structure du projet
- **back-end/** : Code source du serveur Node.js/Express
- **front-end/** : Code source de l'application React
- **IA/** : API Express connectée a un script python pour l'analyse des expressions faciales

## Instructions d'installation
### 1. Lancer le Back-end

⚠️ **WARNING : Avant de lancer le backend, assure-toi de le faire dans l'environnement virtuel créé au préalable.**

1. Navigue dans le dossier `back-end` :
   ```bash
   cd back-end
   ```
2. Initialise le projet et installe les dépendances :
   ```bash
   npm init -y
   npm install express mongoose dotenv cors bcrypt jsonwebtoken multer
   ```
3. Lance le serveur :
   ```bash
   npm start
   ```
   **Note :** Le backend doit être lancé dans l'environnement Python créé au préalable.

4. N'oubliez pas de créer un fichier `.env` à la racine du projet avec les informations suivantes :
   ```env
   MONGO_URI=mongodb+srv://boobacar5252:ddyug4yCMcO3T5N7@cluster0.kdc5xtk.mongodb.net/twitter_hackathon?retryWrites=true&w=majority
   
   SECRET_KEY=example
   ```

### 2. Lancer le Front-end
1. Ouvre un nouveau terminal et navigue dans le dossier `front-end` :
   ```bash
   cd front-end
   ```
2. Installe les dépendances :
   ```bash
   npm install
   ```
3. Lance l'application :
   ```bash
   npm start
   ```

### 3. Lancer le Module IA
1. Ouvre un nouveau terminal et navigue dans le dossier `IA` :
   ```bash
   cd IA
   ```
2. Active l'environnement virtuel :
   - Windows :
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux :
     ```bash
     source venv/bin/activate
     ```
3. Lance l'API :
   ```bash
   python app.py
   ```

## Notes Importantes
- Assure-toi d'avoir les outils nécessaires installés : Node.js, npm, Python, etc.
- Utilise Git pour suivre les modifications :
  ```bash
  git add .
  git commit -m "Message"
  git push
  ```

---

# Hackathon 2025 - Module IA pour la reconnaissance d'expressions faciales

## Description
Ce module IA utilise un modèle de machine learning pré-entraîné pour détecter et analyser les expressions faciales à partir d'images. Il identifie 7 émotions : colère, dégoût, peur, joie, neutre, tristesse et surprise.

## Prérequis
- Python 3.8+
- PIL (Pillow)
- PyTorch
- Transformers

## Installation
1. Navigue dans le dossier `IA`
2. Active l'environnement virtuel :
   ```bash
   venv\Scripts\activate   # Pour Windows
   source venv/bin/activate  # Pour macOS/Linux
   ```
3. Installe les dépendances requises :
   ```bash
   pip install torch pillow transformers
   ```

## Utilisation
Pour analyser une expression faciale dans une image, utilisez la commande suivante :

Lancez le script dans le dossier IA detect.ipynb et souriez, vous êtes filmé.😁😁😁😁😁😁😒😒😒😒😒

Le script retourne une des émotions suivantes :
- anger (colère)
- disgust (dégoût)
- fear (peur)
- happy (joie)
- neutral (neutre)
- sad (tristesse)
- surprise

## Structure du code
Le script [main.py](c:\Users\smour\Documents\HACKATHON\hackaton2025\IA\main.py) :
1. Charge le modèle et le processeur depuis les fichiers pickle
2. Reçoit le chemin d'une image en argument
3. Prétraite l'image avec le processeur
4. Effectue l'inférence pour détecter l'expression faciale
5. Retourne l'émotion identifiée

## Intégration
Ce module est conçu pour fonctionner comme un composant de l'application Twitter-like développée pour le Hackathon 2025, en s'intégrant avec :
- Le backend Node.js/Express
- Le frontend React

## Remarques
Les fichiers modèle et processeur doivent être présents dans le même dossier que le script principal pour que l'application fonctionne correctement.

**Note :** Pas besoin d'installer Flask et Docker.

## Liens Trello

https://trello.com/b/akMqPnYB/hackathon2025
