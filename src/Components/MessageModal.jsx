// MessageModal.jsx
import React from 'react';

export function MessageModal({ message, isOpen, onClose }) {
  if (!isOpen) return null; // Ne rien afficher si le modal est fermé

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Notification</h2>
        <p className="text-gray-700">{message}</p>
        <button
          className="btn btn-primary mt-4"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
