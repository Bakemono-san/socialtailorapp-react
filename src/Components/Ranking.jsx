import React, { useEffect, useState } from "react";
import NotificationsCard from "../Components/NotificationsCard"; // Pour les notifications

const Ranking = () => {
  const [notifications, setNotifications] = useState([]);

  // Simule quelques données de notifications pour le moment
  useEffect(() => {
    const fakeNotifications = [
      { id: 1, title: "Nouvelle commande", body: "Vous avez reçu une nouvelle commande." },
      { id: 2, title: "Rappel paiement", body: "Veuillez effectuer votre paiement avant le 20." },
      { id: 3, title: "Mise à jour de profil", body: "Votre profil a été mis à jour avec succès." }
    ];
    setNotifications(fakeNotifications);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full border border-gray-200 transition-transform hover:shadow-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h3>
      <ul className="divide-y divide-gray-100 space-y-4">
        {notifications.map((notification, index) => (
          <NotificationsCard notification={notification} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
