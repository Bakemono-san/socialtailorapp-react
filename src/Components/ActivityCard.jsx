import React from 'react';

export default function ActivityCard({ activityTitle, timeAgo, description }) {
  return (
    <div className="flex justify-between items-start bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      <div>
        <h3 className="text-md font-semibold text-gray-800">{activityTitle}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <span className="text-sm text-gray-400">{timeAgo}</span>
    </div>
  );
}
