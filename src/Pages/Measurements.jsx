import React, { useState, useEffect } from 'react';
import { faRuler, faChild, faTshirt, faUser, faWeight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MeasurementForm from '../Components/Forms/MeasurementForm';

export default function Measurements() {
  const [measurements, setMeasurements] = useState({});
  const [userName, setUserName] = useState(''); // State to store the connected user's name
  const [userId, setUserId] = useState(''); // State to store the connected user's ID
  const [message, setMessage] = useState(''); // Success or error message
  const [loading, setLoading] = useState(false); // Loading indicator
  const [isResponseOk, setIsResponseOk] = useState(null); // Track API response status

  // Simulate fetching the connected user's data (can be from localStorage, API, or context)
  useEffect(() => {
    // Assuming the user's data (name and ID) is stored in localStorage after login
    const fetchedUserName = localStorage.getItem('userName');
    const fetchedUserId = localStorage.getItem('userId');

    if (fetchedUserName && fetchedUserId) {
      setUserName(fetchedUserName);
      setUserId(fetchedUserId);
    } else {
      setMessage('Erreur: Impossible de récupérer les informations de l’utilisateur.');
    }
  }, []);

  // Handle measurements submission
  const handleMeasurementSubmit = async (data) => {
    setMeasurements(data);

    if (!userId) {
      setMessage('Impossible d’ajouter les mesures: ID utilisateur introuvable.');
      return;
    }

    setLoading(true);
    setIsResponseOk(null); // Reset response state

    try {
      const response = await fetch(`http://localhost:3004/user/${userId}/addMesure`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add JWT token if needed
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsResponseOk(true);
        setMessage('Mesures ajoutées avec succès!');
        console.log('Réponse du serveur:', result);
      } else {
        setIsResponseOk(false);
        setMessage(result.error || 'Une erreur est survenue lors de l’ajout des mesures.');
      }
    } catch (error) {
      setIsResponseOk(false);
      setMessage('Erreur de connexion au serveur.');
      console.error('Erreur lors de la requête:', error);
    } finally {
      setLoading(false);
    }
  };

  const measurementIcons = {
    cou: <FontAwesomeIcon icon={faRuler} />,
    epaule: <FontAwesomeIcon icon={faChild} />,
    longueurPantallon: <FontAwesomeIcon icon={faUser} />,
    longueurManche: <FontAwesomeIcon icon={faRuler} />,
    hanche: <FontAwesomeIcon icon={faWeight} />,
    poitrine: <FontAwesomeIcon icon={faTshirt} />,
    cuisse: <FontAwesomeIcon icon={faRuler} />,
    longueur: <FontAwesomeIcon icon={faRuler} />,
    tourBras: <FontAwesomeIcon icon={faChild} />,
    tourPoignet: <FontAwesomeIcon icon={faRuler} />,
    ceinture: <FontAwesomeIcon icon={faWeight} />,
  };

  return (
    <div className="p-4 w-full overflow-y-scroll">
      <h2 className="text-2xl text-center font-bold mb-4">Mesures de l'utilisateur</h2>
      <div className="p-4 flex flex-col xl:flex-row md:justify-center gap-2">
        <div className="w-full xl:w-1/2">
          {/* Automatically show the connected user's name */}
          <div className="mb-4">
            <label htmlFor="userName" className="block font-semibold mb-2">Nom d’utilisateur :</label>
            <input
              type="text"
              id="userName"
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={userName}
              disabled
            />
          </div>
          <MeasurementForm onSubmit={handleMeasurementSubmit} measurements={measurements} />
        </div>

        <div className="w-full xl:w-1/3 mt-4 bg-white border rounded-lg shadow-md p-4">
          <h4 className="text-lg text-center font-semibold mb-4">Mes Mesures :</h4>
          <ul className="list-none space-y-1">
            {Object.keys(measurements).length === 0 ? (
              <li className="text-center font-semibold">Aucune mesure disponible.</li>
            ) : (
              Object.entries(measurements).map(([key, value]) => (
                <li key={key} className="flex items-center space-x-2 font-semibold">
                  <span className="bg-blue-400 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                    {measurementIcons[key]}
                  </span>
                  <span className="text-lg">{`${key}: ${value || 'NULL'}`}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {message && (
        <p className={`mt-4 text-center font-semibold ${loading ? 'text-blue-500' : isResponseOk ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
