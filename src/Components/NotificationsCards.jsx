import React from 'react';

const NotificationsCards = ({ notification, onMarkAsRead, onDelete }) => {
  const handleMarkAsRead = async () => {
    try {
      // Appelle la fonction pour marquer la notification comme lue
      await onMarkAsRead(notification.id);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la notification :", err);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(notification.id); // Appeler la fonction de suppression
    } catch (err) {
      console.error("Erreur lors de la suppression de la notification :", err);
    }
  };

  return (
    <li className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <span className="text-blue-500 font-bold">🔔</span>
      </div>
      <div>
        <h4 className={`text-lg font-semibold text-gray-700 ${notification.read ? 'line-through' : ''}`}>
          {notification.action}
        </h4>
        <p className={`text-gray-500 ${notification.read ? 'line-through' : ''}`}>{notification.message}</p>
        {!notification.read && (
          <button 
            onClick={handleMarkAsRead}
            className="text-blue-500 underline">
            Marquer comme lue
          </button>
        )}
        <button 
          onClick={handleDelete}
          className="text-red-500 underline ml-2">
          Supprimer
        </button>
      </div>
    </li>
  );
};

export default NotificationsCards;
