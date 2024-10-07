import React, { useState } from 'react';
import { faRuler, faChild, faTshirt, faUser, faWeight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MeasurementForm from '../Components/Forms/MeasurementForm';

export default function Measurements() {
  const [measurements, setMeasurements] = useState({});

  // Gérer la soumission des mesures
  const handleMeasurementSubmit = (data) => {
    setMeasurements(data); // Mettre à jour les mesures
  };

  // Associer les icônes FontAwesome à chaque mesure
  const measurementIcons = {
    cou: <FontAwesomeIcon icon={faRuler} />,
    epaule: <FontAwesomeIcon icon={faChild} />,
    longueurPantallon: <FontAwesomeIcon icon={faUser} />, // Icône alternative pour pantalon
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
    <div className="p-4 w-full">
      <h2 className="text-2xl text-center font-bold mb-4">Mesures de l'utilisateur</h2>
      <div className="p-4 flex flex-col md:flex-row md:justify-center gap-2">
        <div className="w-full md:w-1/2">
          <MeasurementForm onSubmit={handleMeasurementSubmit} measurements={measurements} />
        </div>
        <div className="w-full md:w-1/3 mt-4 bg-white border rounded-lg shadow-md p-4">
          <h4 className="text-lg text-center font-semibold mb-4">Mes Mesures :</h4>
          <ul className="list-none space-y-2">
            {Object.keys(measurements).length === 0 ? (
              <li className="text-center font-semibold">Aucune mesure disponible.</li>
            ) : (
              Object.entries(measurements).map(([key, value]) => (
                <li key={key} className="flex items-center space-x-2 font-semibold">
                  <span className="bg-blue-400 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
                    {measurementIcons[key]}
                  </span>
                  <span className="text-lg">{`${key}: ${value || 'NULL'}`}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
