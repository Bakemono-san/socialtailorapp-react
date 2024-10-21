import { faBasketShopping, faBell, faHeart, faMedal, faCheckCircle, faCertificate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DataHandler from "../DataHandler";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState ,useEffect} from "react";
import { DataContext } from "../App";
import LocalStorage from "../Utils/LocalStorage";

export default function Header() {
  const { value, setValue } = useContext(DataContext); // Récupérer setValue du contexte
  const [user,setUser] = useState(LocalStorage.get("user"))
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Gérer le type de message
  const [unreadNotifications, setUnreadNotifications] = useState(0); // Stocke le nombre de notifications non lues

 // Récupérer les notifications non lues via DataHandler dans le header
useEffect(() => {
  const fetchUnreadNotifications = async () => {
    try {
      const response = await DataHandler.getDatas("/notifications/unread");
      if (response.unreadCount !== undefined) {
        setUnreadNotifications(response.unreadCount); // Mettre à jour le nombre de notifications non lues
      } else {
        console.error("Erreur lors de la récupération des notifications non lues");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion au serveur:", error);
    }
  };

  fetchUnreadNotifications();
}, []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Gérer l'état du menu déroulant
  const navigate = useNavigate();

  // Gérer l'affichage du menu déroulant
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3004/logout", {
        method: "POST",
        credentials: "include", // Important pour envoyer le cookie
        headers: { "Content-Type": "application/json" }, // Assurez-vous de cette ligne
      });
      // setIsModalOpen(true); // Afficher le message de confirmation
      // setIsSuccess(true); // Afficher le message de succès
      // await response.json(); // Assurez-vous de cette ligne
      // setValue(null); // Vider le contexte
      // localStorage.removeItem("token"); // Supprimer le token du localStorage
     // navigate("/login"); // Rediriger vers la page de connexion
      if (response.ok) {
        localStorage.clear(); // Supprimer les données locales
        setValue(null); // Réinitialiser le contexte utilisateur
        setIsModalOpen(true); // Afficher le message de confirmation
        setIsSuccess(true); // Afficher le message de succès
        
        
        // Remplace l'historique au lieu de le pousser
        navigate("/login", { replace: true }); 
        //et affacer tous les données de l'historique
        window.history.pushState({}, "", "/login");
      } else {
        console.error("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      console.error("Erreur de connexion au serveur :", error);
    }
  };
  
  

  // Fonction pour acheter le badge
  const acheterBadge = async () => {
    if (user.badges) return; // Disable click if user already has a badge

    try {
      const response = await fetch("http://localhost:3004/user/acheterBadge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajouter JWT si nécessaire
        },
        body: JSON.stringify({ badgeId: user.badges }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage(data.message || "Badge acquis avec succès !");
        setIsSuccess(true);
      } else {
        setModalMessage(data.message || "Une erreur est survenue.");
        setIsSuccess(false);
      }
    } catch (error) {
      setModalMessage("Erreur de connexion au serveur.");
      setIsSuccess(false);
    } finally {
      setIsModalOpen(true); // Affiche la modal
    }
  };

  // Fermer la modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-[#3b5999] text-sm md:text-2xl text-white py-2 px-4 md:px-10 flex justify-between items-center w-full">
      <div className="flex items-center gap-4 flex-1">
        <img src={process.env.PUBLIC_URL + '/favicon.ico'} className="rounded" alt="" />
        <h1 className="font-bold animate-pulse hidden md:flex">Social Tailor</h1>
      </div>

      <div className="flex items-center gap-12 flex-1 justify-end">
        <div className="flex gap-4 items-center">
          <Link to={"/panier"} className="notif p-2 hover:text-red-500">
            <FontAwesomeIcon icon={faBasketShopping} />
          </Link>

          <Link to={"/listesouhait"} className="notif p-2 hover:text-red-500">
            <FontAwesomeIcon icon={faHeart} />
          </Link>

        {/* Icone de cloche avec le nombre de notifications non lues */}
<div className="relative notif p-2 cursor-pointer">
  <Link to={"/notifications"}>
    <FontAwesomeIcon icon={faBell} />
  </Link>
  
  {/* <FontAwesomeIcon icon={faBell} /> */}
  {unreadNotifications > 0 && (
    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {unreadNotifications}
    </span>
  )}
</div>



          <div


            className={` p-2 cursor-pointer flex items-center ${user.badges == null ? '' : ' hidden' }`}
            onClick={user.badges ? null : acheterBadge} // Disable click if user has a badge
          >
            <FontAwesomeIcon icon={faMedal} size="sm" />
          </div>

          {/* Photo de profil avec icône de certification */}
          <div className="relative flex justify-between items-center">
            {/* lien pour le profil */}
            <Link to={"/profil"}>
            </Link>



            <img

              src={user.photoProfile}
              alt="Profile"
              className="w-6 h-6 md:w-12 md:h-12 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Déconnexion
                </button>
               
              </div>
            )}
            
            
            <div className="text-sm md:ml-1">
              <h2>{user.prenom} <FontAwesomeIcon icon={faCertificate} size="sm" className={`ml-1 text-blue-400 ${user.badges ? '' : 'hidden'}`} /> </h2>
              <p className="hidden">Active</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
            <p
              className={`text-lg font-bold text-center ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {modalMessage}
            </p>
            <button
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
