import React, { useState, useEffect, useContext } from 'react';
import Form from '../Components/Forms/Form';
import DataHandler from '../DataHandler';
import { DataContext } from '../App';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function ModelPage() {
    const [models, setModels] = useState([]);
    const [selectedModelId, setSelectedModelId] = useState(null);
    const [selectedModelDetails, setSelectedModelDetails] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); 
    const { value } = useContext(DataContext);

    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        try {
            const response = await DataHandler.getDatas(`/model/${value.user.id}/getModels`);
            console.log("Réponse des modèles :", response);
            setModels(response);
        } catch (error) {
            console.error("Erreur lors de la récupération des modèles :", error);
        }
    };

    const handleSubmit = async (formData) => {
        if (selectedModelId) {
            await updateModel(selectedModelId, formData);
        } else {
            await createModel(formData);
        }
        resetSelectedModel();
    };

    const createModel = async (formData) => {
        const newModel = {
            libelle: formData.libelle,
            prix: formData.prix,
            quantite: formData.quantite,
            photos: formData.contenu, // Traiter les photos
        };

        try {
            const response = await DataHandler.postData(`/model/${value.user.id}`, newModel);

            if (response) {
                setModels((prevModels) => [...prevModels, response]); // Met à jour la liste des modèles avec le nouveau modèle
            }
        } catch (error) {
            console.error("Erreur lors de la création du modèle :", error);
        }
    };

    const handleDelete = async (modelId) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce modèle ?");
        if (!confirmDelete) return;

        try {
            await DataHandler.deleteData(`/model/${modelId}/delete`);
            fetchModels();
        } catch (error) {
            console.error("Erreur lors de la suppression du modèle :", error.message);
        }
    };

    const updateModel = async (id, formData) => {
        const updatedModel = {
            libelle: formData.libelle,
            prix: formData.prix,
            quantite: formData.quantite,
            photos: formData.contenu,
        };

        try {
            await DataHandler.updateData(`/model/${id}/update`, updatedModel);
            fetchModels();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du modèle :", error);
        }
    };

    const handleViewDetails = (model) => {
        setSelectedModelDetails(model); // Afficher les détails
    };

    const resetSelectedModel = () => {
        setSelectedModelId(null);
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gestion des Modèles</h1>
                <button
                    onClick={() => {
                        setSelectedModelId(null);
                        setIsFormOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Ajouter un modèle
                </button>
            </div>

            {successMessage && ( // Affiche le message de succès si présent
                <div className="mb-4 p-2 bg-green-500 text-white rounded">
                    {successMessage}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  max-h-[600px] overflow-y-auto">
                {models.map((model) => (
                    <div
                        key={model.id}
                        className="bg-white w-full max-w-sm mx-auto rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 relative group"
                        onClick={() => handleViewDetails(model)} // Afficher les détails
                    >
                        <div className="relative">
                            {/* Carousel des photos */}
                            <div className="relative h-56 overflow-hidden">
                                {model.contenu && model.contenu.length > 0 ? (
                                    <div className="flex transition-transform duration-300 ease-in-out">
                                        {model.contenu.map((photo, index) => (
                                            <img
                                                key={index}
                                                src={photo}
                                                alt={`${model.libelle} - ${index + 1}`}
                                                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>Aucune image disponible</p>
                                )}
                            </div>

                            {/* Informations overlay qui apparaissent au survol */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center text-white p-4">
                                    <h3 className="text-lg font-semibold mb-1">{model.libelle}</h3>
                                    <p className="text-sm mb-1">Prix: <span className="font-bold">{model.prix} €</span></p>
                                    <p className="text-sm">Stock: <span className="font-bold">{model.quantite}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='p-4'>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Empêche l'ouverture des détails
                                        setSelectedModelId(model.id);
                                        setIsFormOpen(true);
                                    }}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Empêche l'ouverture des détails
                                        handleDelete(model.id);
                                    }}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Affichage des détails du modèle sélectionné */}
            {selectedModelDetails && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full overflow-auto h-4/5">
                        <h2 className="text-2xl font-bold mb-4">Détails du modèle</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid grid-cols-2 gap-2 h-80 overflow-y-auto">
                                {selectedModelDetails.contenu && selectedModelDetails.contenu.length > 0 ? (
                                    selectedModelDetails.contenu.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo}
                                            alt={`Photo ${index + 1}`}
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                    ))
                                ) : (
                                    <p>Aucune image disponible</p>
                                )}
                            </div>
                            <div>
                                <p><strong>Libelle:</strong> {selectedModelDetails.libelle}</p>
                                <p><strong>Prix:</strong> {selectedModelDetails.prix} €</p>
                                <p><strong>Quantité:</strong> {selectedModelDetails.quantite}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedModelDetails(null)}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            <Form
                onSubmit={handleSubmit}
                selectedModel={models.find(model => model.id === selectedModelId)}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
            />
        </div>
    );
}
