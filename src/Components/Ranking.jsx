import React, { useEffect, useState } from "react";
import NotificationsCard from "../Components/NotificationsCard";
import DataHandler from "../DataHandler";

const Ranking = () => {
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

  const markAsRead = async (notificationId) => {
    try {
      await DataHandler.updateData(`/notifications/${notificationId}/read`, {});
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      setError("Impossible de marquer la notification comme lue.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h3>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-500">Aucune notification trouvée.</p>
      ) : (
        <div className="overflow-y-auto max-h-28">
          <ul className="divide-y divide-gray-100 space-y-4">
            {notifications.map((notification) => (
              <NotificationsCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Ranking;
