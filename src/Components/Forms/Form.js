import React, { useState, useEffect } from 'react';
import { validateModel } from '../../Validation/validation'; // Import your validation function

export default function Form({ onSubmit, selectedModel }) {
    const [libelle, setLibelle] = useState('');
    const [prix, setPrix] = useState('');
    const [quantite, setQuantite] = useState('');
    const [photo, setPhoto] = useState('');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (selectedModel) {
            setLibelle(selectedModel.libelle);
            setPrix(selectedModel.prix);
            setQuantite(selectedModel.quantite);
            setPhoto(selectedModel.photo);
        } else {
            resetForm();
        }
    }, [selectedModel]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateModel(libelle, prix, quantite, photo);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            const formData = { libelle, prix, quantite, photo };
            onSubmit(formData);
            resetForm();
        }
    };

    const resetForm = () => {
        setLibelle('');
        setPrix('');
        setQuantite('');
        setPhoto('');
        setFormErrors({});
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getValidationIcon = (field, value) => {
        if (formErrors[field]) {
            return <i className="fas fa-exclamation-circle text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2"></i>;
        } else if (!formErrors[field] && value.length > 0) {
            return <i className="fas fa-check-circle text-blue-500 absolute right-1 top-[60px] transform -translate-y-1/2"></i>;
        }
        return null;
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 max-w-xl mx-auto">
            {/* Libelle */}
            <div className="form-group mb-5 relative">
                <label htmlFor="libelle" className="block text-gray-700 font-semibold text-lg">Libelle</label>
                <input
                    type="text"
                    id="libelle"
                    value={libelle}
                    onChange={(e) => setLibelle(e.target.value)}
                    className={`mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.libelle ? 'border-red-500' : 'border-gray-300'}`}
                />
                {getValidationIcon('libelle', libelle)}
                {formErrors.libelle && <span className="text-red-500 text-sm">{formErrors.libelle}</span>}
            </div>

            {/* Prix */}
            <div className="form-group mb-5 relative">
                <label htmlFor="prix" className="block text-gray-700 font-semibold text-lg">Prix (€)</label>
                <input
                    type="text"
                    id="prix"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    className={`mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.prix ? 'border-red-500' : 'border-gray-300'}`}
                />
                {getValidationIcon('prix', prix)}
                {formErrors.prix && <span className="text-red-500 text-sm">{formErrors.prix}</span>}
            </div>

            {/* Quantite */}
            <div className="form-group mb-5 relative">
                <label htmlFor="quantite" className="block text-gray-700 font-semibold text-lg">Quantité</label>
                <input
                    type="text"
                    id="quantite"
                    value={quantite}
                    onChange={(e) => setQuantite(e.target.value)}
                    className={`mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.quantite ? 'border-red-500' : 'border-gray-300'}`}
                />
                {getValidationIcon('quantite', quantite)}
                {formErrors.quantite && <span className="text-red-500 text-sm">{formErrors.quantite}</span>}
            </div>

            {/* Photo */}
            <div className="form-group mb-6 relative">
                <label htmlFor="photo" className="block text-gray-700 font-semibold text-lg">Photo</label>
                <input
                    type="file"
                    id="photo"
                    onChange={handlePhotoChange}
                    className={`file-input file-input-bordered w-full max-w-xs ${formErrors.photo ? 'border-red-500' : 'border-gray-300'}`}
                />
                {getValidationIcon('photo', photo)}
                {formErrors.photo && <span className="text-red-500 text-sm">{formErrors.photo}</span>}
                <p className="text-gray-500 text-sm">Téléchargez une photo pour le modèle.</p>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full p-3 bg-[#3b5999] text-white rounded hover:bg-blue-500 transition duration-200 text-lg"
            >
                {selectedModel ? 'Mettre à jour le modèle' : 'Créer un modèle'}
            </button>
        </form>
    );
}
