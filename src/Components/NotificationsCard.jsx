import React from 'react';

const NotificationsCard = ({ notification }) => {
  return (
    <li className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <span className="text-blue-500 font-bold">🔔</span>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-700">{notification.title}</h4>
        <p className="text-gray-500">{notification.body}</p>
      </div>
    </li>
  );
};

export default NotificationsCard;
