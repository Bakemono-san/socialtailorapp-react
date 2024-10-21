// src/Pages/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();

    // Simuler une connexion (email et password hardcodés pour l'instant)
    if (email === "admin@example.com" && password === "password") {
      localStorage.setItem("isAuthenticated", "true"); // Stocker l'authentification simulée
      navigate("/"); // Rediriger vers la page d'accueil (MainPage)
    } else {
      alert("Email ou mot de passe incorrect.");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); // Redirection vers la page d'inscription si l'utilisateur clique sur "Sign Up"
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-blue-500 ">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl flex justify-center">
        {/* Partie gauche : Formulaire de connexion */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
          <div className="flex justify-center gap-4 mb-4 ">
            <button className="bg-gray-100 p-2 rounded-full">G</button>
            <button className="bg-blue-100 p-2 rounded-full">F</button>
            <button className="bg-gray-100 p-2 rounded-full">L</button>
          </div>
          <p className="text-center mb-4 text-gray-500">or use your email account</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-slate-200 text-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-slate-200 text-black"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* commet */}
            </div>
            <p className="text-right text-sm text-blue-600 mb-4 cursor-pointer hover:underline">
              Forgot your password?
            </p>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-200"
              onClick={handleSignupRedirect}
            >
              Sign in
            </button>
          </form>
        </div>

        {/* Partie droite : Message de bienvenue */}
        <div className="hidden md:flex md:w-1/2 bg-blue-700 text-white p-8 rounded-r-lg flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
          <p className="mb-4">
            Register with your personal details to access all our features.
          </p>
          <button
            onClick={handleSignupRedirect}
            className="border border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-purple-700 transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
