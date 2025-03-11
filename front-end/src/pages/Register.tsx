import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const navigate = useNavigate();

  const interestEmotionMap: Record<string, string> = {
    "Humour": "happy",        
    "Sport": "angry",         
    "Art": "sad",             
    "Musique": "surprise",    
    "Actualités": "fear",     
    "Gaming": "neutral",      
    "Gastronomie": "disgust"  
  };

  const availableInterests = Object.keys(interestEmotionMap);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Conversion des centres d'intérêt en émotions
    const selectedEmotions = interests.map(interest => interestEmotionMap[interest]);

    // Stocke les infos en localStorage (remplacer par une API plus tard)
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("interests", JSON.stringify(interests));
    localStorage.setItem("emotions", JSON.stringify(selectedEmotions));

    // Redirige vers la page d'accueil après inscription
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nom d'utilisateur</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* SECTION CHOIX DES INTÉRÊTS */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Quels contenus souhaitez-vous voir ?</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableInterests.map((interest) => (
                <label key={interest} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={interest}
                    checked={interests.includes(interest)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInterests([...interests, interest]);
                      } else {
                        setInterests(interests.filter((i) => i !== interest));
                      }
                    }}
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}
