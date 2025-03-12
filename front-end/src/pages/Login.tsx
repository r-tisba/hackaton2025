import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.email === email) {
      localStorage.setItem("loggedIn", "true");
      navigate("/home"); 
    } else {
      alert("Email incorrect !");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-4">Connexion</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full mb-2 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Se connecter
        </button>
        <p className="mt-2 text-sm">
          Pas encore de compte ?{" "}
          <button className="text-blue-600" onClick={() => navigate("/")}>
            Inscris-toi
          </button>
        </p>
      </form>
    </div>
  );
};

