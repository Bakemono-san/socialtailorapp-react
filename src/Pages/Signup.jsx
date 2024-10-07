import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  // Déclaration des états pour chaque champ du formulaire
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [photoProfile, setPhotoProfile] = useState(null); // Pour gérer le fichier
  const [role, setRole] = useState("user"); // Valeur par défaut pour le rôle

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Validation simple des mots de passe
    if (password !== confirmationPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // Créer un formData si tu as besoin d'envoyer des fichiers au backend
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("photoProfile", photoProfile);

    // Logique d'inscription à ajouter ici (par exemple appel à une API)
    console.log("Inscription réussie avec les données :", {
      nom,
      prenom,
      email,
      password,
      role,
      photoProfile,
    });

    // Après inscription, rediriger vers la page de connexion
    navigate("/login");
  };

  
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-blue-500">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          {/* Nom */}

          <div className="mb-4">
            <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900">Nom</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-gray-200 text-black"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>

          {/* Prénom */}
          <div className="mb-4">
            <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900">Prénom</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none  bg-gray-200 text-black"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4 text-black">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none  bg-gray-200 text-black"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mot de passe</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none  bg-gray-200 text-black"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirmation Password */}
          <div className="mb-4">
            <label htmlFor="confirmationPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirmez le mot de passe</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none  bg-gray-200 text-black"
              placeholder="Confirmez le mot de passe"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              required
            />
          </div>

          {/* Photo de Profil */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">Photo de Profil</label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              onChange={(e) => setPhotoProfile(e.target.files[0])} // Gestion du fichier
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">Rôle</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none  bg-gray-200 text-black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">Tailleur</option>
              <option value="admin">Visiteur</option>
              <option value="moderator">Vendeur</option>
            </select>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
