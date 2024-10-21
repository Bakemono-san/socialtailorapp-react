import React, { useEffect, useState } from "react";
import DataHandler from "../DataHandler"; // Ajustez ce chemin si nécessaire
import NotificationsCard from "../Components/NotificationsCards"; // Assurez-vous que ce composant existe

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await DataHandler.getDatas("/notifications");
        setNotifications(response.notifications);
      } catch (err) {
        setError("Impossible de récupérer les notifications.");
      }
    };

    fetchNotifications();
  }, []);

  // Fonction pour marquer une notification comme lue
  const handleMarkAsRead = async (notificationId) => {
    try {
      await DataHandler.updateData(`/notifications/${notificationId}/read`); // Appel API pour marquer comme lu
      setNotifications(
        notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la notification :", err);
    }
  };

  // Fonction pour supprimer une notification
  const handleDeleteNotification = async (notificationId) => {
    try {
      await DataHandler.deleteData(`/notifications/${notificationId}`); // Appel de la méthode de suppression
      setNotifications(notifications.filter((notification) => notification.id !== notificationId)); // Mettre à jour l'état
    } catch (err) {
      console.error("Erreur lors de la suppression de la notification :", err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mes Notifications</h3>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-500">Aucune notification trouvée.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <NotificationsCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead} // Passer la fonction de marquage comme lue
              onDelete={handleDeleteNotification} // Passer la fonction de suppression
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
