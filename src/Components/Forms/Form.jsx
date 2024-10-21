import React, { useState, useEffect, useRef } from 'react';
import { validateModel } from '../../Validation/validation';
import DataHandler from "../../DataHandler";

export default function Form({ onSubmit, selectedModel }) {
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

    const getValidationIcon = (field, value) => {
        if (formErrors[field]) {
            return <i className="fas fa-exclamation-circle text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2"></i>;
        } else if (!formErrors[field] && value.length > 0) {
            return <i className="fas fa-check-circle text-blue-500 absolute right-1 top-[60px] transform -translate-y-1/2"></i>;
        }
        return null;
    };

    useEffect(() => {
        return () => {
            contenu.forEach(file => {
                URL.revokeObjectURL(file);
            });
        };
    }, [contenu]);

    return (
        <form onSubmit={handleSubmit} ref={form} className="bg-white shadow-md rounded-lg p-8 max-w-xl mx-auto">
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

            <div className="form-group mb-6 relative">
                <label htmlFor="contenu" className="block text-gray-700 font-semibold text-lg">Contenu</label>
                <input
                    type="file"
                    id="contenu"
                    multiple
                    onChange={handleContenuChange}
                    className={`file-input file-input-bordered file-input-primary w-full max-w-xs ${formErrors.contenu ? 'border-red-500' : 'border-gray-300'}`}
                />
                {getValidationIcon('contenu', contenu)}
                {formErrors.contenu && <span className="text-red-500 text-sm">{formErrors.contenu}</span>}
                <p className="text-gray-500 text-sm">Téléchargez une ou plusieurs contenus pour le modèle.</p>
            </div>

            <div className="flex flex-wrap mt-4">
                {contenu.map((photo, index) => {
                    if (photo instanceof File) {
                        const objectUrl = URL.createObjectURL(photo);
                        return (
                            <div key={index} className="w-20 h-20 mr-2 mb-2">
                                <img
                                    src={objectUrl}
                                    alt={`Preview ${index}`}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                        );
                    } else {
                        console.error("L'élément n'est pas un fichier valide:", photo);
                        return null;
                    }
                })}
            </div>

            <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-200 text-lg"
            >
                {selectedModel ? 'Mettre à jour le modèle' : 'Créer un modèle'}
            </button>
        </form>
    );
}
