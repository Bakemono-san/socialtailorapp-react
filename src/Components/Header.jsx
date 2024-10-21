import { faBasketShopping, faBell, faHeart, faMedal, faCheckCircle, faCertificate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import LocalStorage from "../Utils/LocalStorage";

export default function Header() {
  const { value } = useContext(DataContext);
  const [user,setUser] = useState(LocalStorage.get("user"))
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Gérer le type de message

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
          <div className="notif p-2 cursor-pointer hover:text-red-500">
            <Link to={"/panier"}>
              <FontAwesomeIcon icon={faBasketShopping} />
            </Link>
          </div>

          <div className="notif p-2 cursor-pointer hover:text-red-500">
            <Link to={"/listesouhait"}>
              <FontAwesomeIcon icon={faHeart} />
            </Link>
          </div>

          <div className="notif p-2 cursor-pointer">
            <FontAwesomeIcon icon={faBell} />
          </div>

          {/* Bouton pour acheter un badge */}
          <div
            className={` p-2 cursor-pointer flex items-center ${user.badges == null ? '' : ' hidden' }`}
            onClick={user.badges ? null : acheterBadge} // Disable click if user has a badge
          >
            <FontAwesomeIcon icon={faMedal} size="sm" />
          </div>

          {/* Photo de profil avec icône de certification */}
          <div className="relative flex justify-between items-center">
            <img
              className="w-6 h-6 md:w-12 rounded-full md:h-12"
              src={user.photoProfile}
              alt="Profile"
            />
            
            
            <div className="text-sm md:ml-1">
              <h2>{user.prenom} <FontAwesomeIcon icon={faCertificate} size="sm" className={`ml-1 text-blue-400 ${user.badges ? '' : 'hidden'}`} /> </h2>
              <p className="hidden">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour les messages d'erreur ou succès */}
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
