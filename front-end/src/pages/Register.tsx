import axios from "axios";
import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Liste des centres d'intérêt avec images (Images en ligne fiables)
  const interestData: Record<string, { emotion: string; image: string }> = {
    "Humour": { emotion: "happy", image: "https://picsum.photos/150?random=1" },
    "Frustation": { emotion: "angry", image: "https://picsum.photos/150?random=2" },
    "Triste": { emotion: "sad", image: "https://picsum.photos/150?random=3" },
    "Surprise": { emotion: "surprise", image: "https://picsum.photos/150?random=4" },
    "Horreur": { emotion: "fear", image: "https://picsum.photos/150?random=5" },
    "Dégoût": { emotion: "disgust", image: "https://picsum.photos/150?random=7" },
    "Tout": { emotion: "neutral", image: "https://picsum.photos/150?random=6" }
  };

  const availableInterests = Object.keys(interestData);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Réinitialise les erreurs
  
    if (!email.includes("@")) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }
  
    if (interests.length < 2) {
      setError("Veuillez sélectionner au moins 2 types de contenu.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        pseudo: username,
        mail: email,
        pwd: password,
        interests
      });
      
      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("loggedIn", "true");
        navigate("/login");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Une erreur est survenue.");
    }
  };
  
  
  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  return (
    <div className="register-container">
      <div className="register-box">
        
        {/* Partie gauche avec une intro et une image */}
        <div className="register-left">
          <h1>Rejoignez Face-and-Tweet 🐦</h1>
          <p>Inscrivez-vous et personnalisez votre contenu selon vos préférences !</p>
          <img 
            className="mt-3"
            src="https://media.istockphoto.com/id/981630990/fr/vectoriel/vintage-big-brother-vous-regarde-yeux-surveillance-et-protection-des-renseignements.jpg?s=612x612&w=0&k=20&c=qTjruA_wuh6HhMOTFkgi9a0a3BtPIHY4S3JSMhYktz8=" 
            alt="Twitter Clone" 
            width="550px"
          />
        </div>

        {/* Partie droite : Formulaire d'inscription */}
        <div className="register-right">
          <form className="register-form" onSubmit={handleSignup}>
            <h2 className="mb-2">Créer un compte</h2>
            
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Sélection des centres d'intérêt */}
            <p>Choisissez vos centres d'intérêt :</p>
            <div className="interest-grid">
              {availableInterests.map((interest) => (
                <div 
                  key={interest} 
                  className={`interest-item ${interests.includes(interest) ? "selected" : ""}`}
                  onClick={() => toggleInterest(interest)}
                >
                  <img src={interestData[interest].image} alt={interest} />
                  <div className="interest-label">{interest}</div>
                </div>
              ))}
            </div>

            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

            <button type="submit">S'inscrire</button>
            <Link to="/login" className="signup-link">Déjà inscrit ? Connectez-vous</Link>
          </form>
        </div>

      </div>
    </div>
  );
}