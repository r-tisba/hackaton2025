import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        mail: email,
        pwd: password
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("loggedIn", "true");
      navigate("/home");
    } catch (error: any) {
      alert(error.response?.data?.message || "Une erreur est survenue.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        {/* Partie gauche avec slogan ou image */}
        <div className="login-left">
          <h1>Bienvenue sur Face-and-Tweet 🐦</h1>
          <p>Rejoignez la communauté et soyez filmé en temps réel.</p>
        </div>

        {/* Partie droite : Formulaire de connexion */}
        <div className="login-right">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Connexion</h2>
            <input
              type="email"
              placeholder="Email"
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
            <button type="submit">Se connecter</button>
            <p className="signup-link" onClick={() => navigate("/")}>
              Pas encore de compte ? Inscris-toi
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-200">
//       <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
//         <h2 className="text-2xl mb-4">Connexion</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-2 p-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Mot de passe"
//           className="w-full mb-2 p-2 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button className="w-full bg-blue-500 text-white py-2 rounded">
//           Se connecter
//         </button>
//         <p className="mt-2 text-sm">
//           Pas encore de compte ?{" "}
//           <button className="text-blue-600" onClick={() => navigate("/")}>
//             Inscris-toi
//           </button>
//         </p>
//       </form>
//     </div>
//   );
// };

