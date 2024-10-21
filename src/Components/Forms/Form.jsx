import React, { useState, useEffect, useRef } from 'react';
import { validateModel } from '../../Validation/validation';
import DataHandler from "../../DataHandler";

export default function Form({ onSubmit, selectedModel, isOpen, onClose }) {
    const [libelle, setLibelle] = useState('');
    const [prix, setPrix] = useState('');
    const [quantite, setQuantite] = useState('');
    const [contenu, setContenu] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const form = useRef();
     
    useEffect(() => {
        if (selectedModel) {
            setLibelle(selectedModel.libelle);
            setPrix(parseInt(selectedModel.prix));
            setQuantite(parseInt(selectedModel.quantite));
            setContenu(selectedModel.contenu || []);
        } else {
            resetForm();
        }
    }, [selectedModel]);

    const uploadImagesToCloudinary = async (files) => {
        const uploadedImages = [];
        const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
    
        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);
    
            try {
                const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
    
                if (!response.ok) {
                    throw new Error(data.message || 'Erreur inconnue');
                }
    
                uploadedImages.push(data.secure_url);
            } catch (error) {
                console.error("Erreur lors de l'upload de l'image :", error);
            }
        }
    
        return uploadedImages;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validation des champs du formulaire
        const errors = validateModel(libelle, prix, quantite, contenu);
        setFormErrors(errors);
        // Vérifie si le formulaire est valide (pas d'erreurs)
        if (Object.keys(errors).length === 0) {
        try {
        // Télécharge les images sur Cloudinary ou autre service d'hébergement
        const uploadedImages = await uploadImagesToCloudinary(contenu);
        // Prépare les données du formulaire à envoyer
        const formData = { libelle, prix, quantite, contenu: uploadedImages };
        // Si selectedModel est défini, c'est une mise à jour, sinon c'est une création
        if (selectedModel) {
        // Mise à jour du modèle existant
        const response = await DataHandler.updateData(`http://localhost:3004/model/${selectedModel.id}/update/`, formData);
        console.log("Réponse du serveur pour la mise à jour:", response);
        } else {
        // Création d'un nouveau modèle
        const response = await DataHandler.postData("http://localhost:3004/model/create", formData);
        console.log("Réponse du serveur pour la création:", response);
        }
        
        resetForm();
        } catch (error) {
        // Gestion des erreurs lors de la requête ou du téléchargement des images
        console.error("Erreur lors de la création ou mise à jour du modèle :", error);
        }
        }
        };
        
        

    const resetForm = () => {
        setLibelle('');
        setPrix('');
        setQuantite('');
        setContenu([]);
        setFormErrors({});
    };

    const handleContenuChange = (e) => {
        const files = Array.from(e.target.files);
        setContenu(files);
    };

    useEffect(() => {
        return () => {
            contenu.forEach(file => {
                if (file instanceof File) {
                    URL.revokeObjectURL(file);
                }
            });
        };
    }, [contenu]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform animate-slideIn">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {selectedModel ? 'Modifier le modèle' : 'Ajouter un nouveau modèle'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} ref={form} className="p-6">
                    <div className="space-y-6">
                        <div className="form-group relative">
                            <label htmlFor="libelle" className="block text-sm font-medium text-gray-700 mb-1">
                                Libelle
                            </label>
                            <input
                                type="text"
                                id="libelle"
                                value={libelle}
                                onChange={(e) => setLibelle(e.target.value)}
                                className={`block w-full px-4 py-3 rounded-md border ${
                                    formErrors.libelle ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                placeholder="Nom du modèle"
                            />
                            {formErrors.libelle && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.libelle}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group relative">
                                <label htmlFor="prix" className="block text-sm font-medium text-gray-700 mb-1">
                                    Prix (€)
                                </label>
                                <input
                                    type="number"
                                    id="prix"
                                    value={prix}
                                    onChange={(e) => setPrix(e.target.value)}
                                    className={`block w-full px-4 py-3 rounded-md border ${
                                        formErrors.prix ? 'border-red-500' : 'border-gray-300'
                                    } focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                    placeholder="0.00"
                                />
                                {formErrors.prix && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.prix}</p>
                                )}
                            </div>

                            <div className="form-group relative">
                                <label htmlFor="quantite" className="block text-sm font-medium text-gray-700 mb-1">
                                    Quantité
                                </label>
                                <input
                                    type="number"
                                    id="quantite"
                                    value={quantite}
                                    onChange={(e) => setQuantite(e.target.value)}
                                    className={`block w-full px-4 py-3 rounded-md border ${
                                        formErrors.quantite ? 'border-red-500' : 'border-gray-300'
                                    } focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                    placeholder="0"
                                />
                                {formErrors.quantite && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.quantite}</p>
                                )}
                            </div>
                        </div>

                        <div className="form-group relative">
                            <label htmlFor="contenu" className="block text-sm font-medium text-gray-700 mb-1">
                                Photos
                            </label>
                            <input
                                type="file"
                                id="contenu"
                                multiple
                                onChange={handleContenuChange}
                                accept="image/*"
                                className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            {formErrors.contenu && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.contenu}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-4">
                            {contenu.map((photo, index) => (
                                <div key={index} className="relative rounded-lg overflow-hidden group">
                                    <img
                                        src={photo instanceof File ? URL.createObjectURL(photo) : photo}
                                        alt={`Preview ${index}`}
                                        className="w-full h-24 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newContenu = [...contenu];
                                                newContenu.splice(index, 1);
                                                setContenu(newContenu);
                                            }}
                                            className="text-white hover:text-red-500 transition-colors"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {selectedModel ? 'Mettre à jour' : 'Créer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}