import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  // Déclaration des états pour chaque champ du formulaire
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [photoProfile, setPhotoProfile] = useState(null); // Fichier image
  const [role, setRole] = useState("tailleur"); // Valeur par défaut pour le rôle

  const navigate = useNavigate();

  //handleSignup en utilisant axios
  const handleSignup = async (e) => {
    e.preventDefault();
  
    // Validation des mots de passe
    if (password !== confirmationPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
  console.log(nom,prenom,email,password,confirmationPassword,role,photoProfile);
    // Créer un objet FormData pour envoyer l'image à Cloudinary
    const formData = new FormData();
    formData.append('file', photoProfile);
    formData.append('upload_preset', 'eqen5qg3');  // Remplacez par votre preset Cloudinary
  
    try {
     console.log(formData);
      
      // 1. Upload de l'image sur Cloudinary
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dhivn2ahm/image/upload`,
        formData
      );
  
      const imageUrl = uploadResponse.data.secure_url; // Récupère l'URL sécurisée de l'image
  
      // 2. Créer les données d'inscription utilisateur, avec l'URL de l'image Cloudinary
      const userData = {
        nom,
        prenom,
        email,
        password,
        confirmationPassword,
        role,
        photoProfile: imageUrl // Utilisez l'URL de Cloudinary
      };
      
      // 3. Envoyer les données d'inscription au backend
      const response = await axios.post("http://localhost:3004/register", userData);
  
      if (response.status === 201) {
        console.log("Inscription réussie avec les données :", response.data);
        navigate("/login");
      } else {
        console.error("Erreur lors de l'inscription", response.data);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error.response ? error.response.data : error.message);
    }
  };
  
  
  const handleSignupRedirect = () => {
    navigate("/login"); // Redirection vers la page de connexion si l'utilisateur clique sur "Sign In"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-gray-200 text-black"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-gray-200 text-black"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-gray-200 text-black"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-gray-200 text-black"
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
              onChange={(e) => setPhotoProfile(e.target.files[0])} // Gestion du fichier image
              required
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">Rôle</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-gray-200 text-black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="tailleur">Tailleur</option>
              <option value="visiteur">Visiteur</option>
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
