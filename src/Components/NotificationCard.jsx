import React from 'react';

const NotificationCard = ({ notifications }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold">Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="py-2 border-b">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationCard;
