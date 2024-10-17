import React from 'react';

const PositionCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full border border-gray-200 transition-transform hover:shadow-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Ma Position</h3>
      <p className="text-gray-600">Niveau : Gold</p> {/* Simule la position */}
      <p className="text-gray-600">Classement : #5</p>
    </div>
  );
};

export default PositionCard;
