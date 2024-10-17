import React from 'react';
import { Link } from 'react-router-dom';

const CreditCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 mb-4 w-full max-w-xl border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Achat de Crédits</h3>
      <p className="text-gray-600">Achetez des crédits pour améliorer votre visibilité sur la plateforme.</p>
      <Link to="/achatcredit" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Acheter des crédits
      </Link>
    </div>
  );
};

export default CreditCard;
