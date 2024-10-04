import React, { useState } from 'react';

export default function MeasurementForm({ onSubmit, measurements }) {
  const initialFormData = {
    cou: measurements.cou || '',
    longueurPantallon: measurements.longueurPantallon || '',
    epaule: measurements.epaule || '',
    longueurManche: measurements.longueurManche || '',
    hanche: measurements.hanche || '',
    poitrine: measurements.poitrine || '',
    cuisse: measurements.cuisse || '',
    longueur: measurements.longueur || '',
    tourBras: measurements.tourBras || '',
    tourPoignet: measurements.tourPoignet || '',
    ceinture: measurements.ceinture || ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Soumettre les données
    setFormData(initialFormData); // Réinitialiser le formulaire
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-blue-50 border border-blue-300 rounded-lg p-4 shadow-md w-full">
      <h4 className="text-lg text-center font-semibold mb-5">Formulaire de Mesures :</h4>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cou" className="block mb-1">Cou</label>
          <input type="number" min="1" name="cou" id="cou" placeholder="Cou" value={formData.cou} onChange={handleInputChange} className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full" />
        </div>
        <div>
          <label htmlFor="epaule" className="block mb-1">Épaule</label>
          <input type="number" min="1" name="epaule" id="epaule" placeholder="Épaule" value={formData.epaule} onChange={handleInputChange} className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full" />
        </div>
        <div>
          <label htmlFor="longueurPantallon" className="block mb-1">Longueur Pantallon</label>
          <input type="number" min="1" name="longueurPantallon" id="longueurPantallon" placeholder="Longueur Pantallon" value={formData.longueurPantallon} onChange={handleInputChange} className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full" />
        </div>
        <div>
          <label htmlFor="longueurManche" className="block mb-1">Longueur Manche</label>
          <input type="number" min="1" name="longueurManche" id="longueurManche" placeholder="Longueur Manche" value={formData.longueurManche} onChange={handleInputChange} className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full" />
        </div>
        <div>
          <label htmlFor="hanche" className="block mb-1">Hanche</label>
          <input type="number" min="1" name="hanche" id="hanche" placeholder="Hanche" value={formData.hanche} onChange={handleInputChange} className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full" />
        </div>
        <div>
          <label htmlFor="poitrine" className="block mb-1">Poitrine</label>
          <input type="number" min="1" name="poitrine" id="poitrine" placeholder="Poitrine" value={formData.poitrine} onChange={handleInputChange} className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full" />
        </div>
        <div>
          <label htmlFor="cuisse" className="block mb-1">Cuisse</label>
          <input type="number" min="1" name="cuisse" id="cuisse" placeholder="Cuisse" value={formData.cuisse} onChange={handleInputChange} className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full" />
        </div>
        <div>
          <label htmlFor="longueur" className="block mb-1">Longueur</label>
          <input type="number" min="1" name="longueur" id="longueur" placeholder="Longueur" value={formData.longueur} onChange={handleInputChange} className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full" />
        </div>
        <div>
          <label htmlFor="tourBras" className="block mb-1">Tour Bras</label>
          <input type="number" min="1" name="tourBras" id="tourBras" placeholder="Tour Bras" value={formData.tourBras} onChange={handleInputChange} className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full" />
        </div>
        <div>
          <label htmlFor="tourPoignet" className="block mb-1">Tour Poignet</label>
          <input type="number" min="1" name="tourPoignet" id="tourPoignet" placeholder="Tour Poignet" value={formData.tourPoignet} onChange={handleInputChange} className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full" />
        </div>
        <div>
          <label htmlFor="ceinture" className="block mb-1">Ceinture</label>
          <input type="number" min="1" name="ceinture" id="ceinture" placeholder="Ceinture" value={formData.ceinture} onChange={handleInputChange} className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full" />
        </div>
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200 w-full">Sauvegarder les mesures</button>
    </form>
  );
}
