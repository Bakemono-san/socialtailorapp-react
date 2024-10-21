import React, { useState, useContext } from "react";
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
      setMessage(response);
      setMessageColor("text-green-500");
    } catch (err) {
      setMessage(err.response?.data || "Erreur lors du changement de rôle");
      setMessageColor("text-red-500");
      console.log(err);
    }

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 shadow-lg rounded-xl max-w-lg w-full transform transition duration-500 hover:shadow-2xl hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Changer de rôle
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Rôle actuel:{" "}
          <span className="text-blue-600 font-semibold">
            {connectedUser.role}
          </span>
        </p>

        <form onSubmit={handleChangeRole} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Sélectionnez un nouveau rôle
            </label>
            <select
              value={newSelectedRole}
              onChange={(e) => setNewSelectedRole(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ease-in-out"
            >
              <option value="tailleur">Tailleur</option>
              <option value="vendeur">Vendeur</option>
              <option value="visiteur">Visiteur</option>
            </select>
          </div>

          {message && (
            <p
              className={`text-center text-lg font-semibold mt-4 ${messageColor}`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition-transform duration-300 hover:scale-105"
          >
            Valider le changement
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeRole;
