import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../App";
import DataHandler from "../../DataHandler";

const ChangeRole = () => {
  const { value } = useContext(DataContext);
  const connectedUser = value.user;
  const [newSelectedRole, setNewSelectedRole] = useState(connectedUser.role);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const handleChangeRole = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        userId: connectedUser.id,
        newRole: newSelectedRole,
      };
      const response = await DataHandler.postData("/changeRole", requestData);
      // Si la réponse est un succès
      setMessage(response);
      setMessageColor("text-green-500");
    } catch (err) {
      // Si une erreur se produit
      setMessage(err.response?.data || "Erreur lors du changement de rôle");
      setMessageColor("text-red-500");
      console.log(err);
    }
    // Timeout pour faire disparaître le message après 3 secondes
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Changement de rôle</h2>
        <h2 className="text-2xl font-semibold text-center mb-6">Votre rôle: {connectedUser.role}</h2>

        <form onSubmit={handleChangeRole}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Sélectionner un rôle
            </label>
            <select
              value={newSelectedRole}
              onChange={(e) => setNewSelectedRole(e.target.value)}
              id="role"
              className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="tailleur">Tailleur</option>
              <option value="vendeur">Vendeur</option>
              <option value="visiteur">Visiteur</option>
            </select>
          </div>

          {/* Affichage du message de réponse */}
          {message && (
            <p className={`text-center font-bold mb-4 ${messageColor}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeRole;
