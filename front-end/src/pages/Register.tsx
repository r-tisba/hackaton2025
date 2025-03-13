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
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Créer un compte</h2>

        <form onSubmit={handleSignup}>

          {/* Champ Nom d'utilisateur */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nom d'utilisateur</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Champ Adresse e-mail */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Adresse e-mail</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Champ Mot de passe */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Sélection des centres d'intérêt */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Quels contenus souhaitez-vous voir ?</label>
            <div className="grid grid-cols-2 gap-4">
              {availableInterests.map((interest) => (
                <div 
                  key={interest} 
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    interests.includes(interest) ? "border-blue-500 scale-105" : "border-gray-300"
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  <img 
                    src={interestData[interest].image} 
                    alt={interest} 
                    className="w-full h-24 object-cover"
                  />
                  <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-center w-full p-1">
                    {interest}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message d'erreur en bas */}
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

          {/* Bouton de soumission */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
            S'inscrire
          </button>

          <Link to="/login" className="block text-center mt-4 text-blue-500">Déjà inscrit ? Connectez-vous</Link>

        </form>
      </div>
    </div>
  );
}
