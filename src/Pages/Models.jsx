import React, { useState, useEffect, useContext } from 'react';
import Form from '../Components/Forms/Form';
import DataHandler from '../DataHandler';
import { DataContext } from '../App';

export default function ModelPage() {
    const [models, setModels] = useState([]);
    const [selectedModelId, setSelectedModelId] = useState(null);
    const { value } = useContext(DataContext);

    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        try {
            const response = await DataHandler.getDatas(`/model/${value.user.id}/getModels`);
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
            photos: formData.contenu,
        };

        try {
            await DataHandler.postData(`/model/${value.user.id}`, newModel);
            fetchModels();
        } catch (error) {
            console.error("Erreur lors de la création du modèle :", error);
        }
    };

    const handleDelete = async (modelId) => {
        if (!modelId) {
            console.error("Invalid model ID");
            return;
        }

        try {
            await DataHandler.deleteData(`/model/${modelId}/delete`);
            fetchModels();
            console.log(`Modèle avec ID ${modelId} supprimé avec succès`);
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

    const handleEdit = (id) => {
        setSelectedModelId(id);
    };

    const resetSelectedModel = () => {
        setSelectedModelId(null);
    };

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 overflow-y-scroll">
            <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">Gestion des Modèles</h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="shadow-lg p-6 bg-white rounded-lg lg:col-span-1">
                    <Form 
                        onSubmit={handleSubmit} 
                        selectedModel={models.find(model => model.id === selectedModelId)} 
                    />
                </div>

                <div className="shadow-lg p-6 bg-white rounded-lg lg:col-span-1">
                    <ul className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
                        {models.map((model) => (
                            <li key={model.id} className="flex justify-between items-center p-5 hover:bg-gray-100 transition duration-200">
                                <div className="flex items-center space-x-4">
                                    {model.photos && model.photos.length > 0 && model.photos.map((photo, index) => (
                                        <img key={index} src={photo} alt={model.libelle} className="w-20 h-20 object-cover rounded-full" />
                                    ))}
                                    <div>
                                        <h3 className="font-bold text-blue-600 text-xl">{model.libelle}</h3>
                                        <p className="text-gray-600">Prix : {model.prix} €</p>
                                        <p className="text-gray-600">Quantité : {model.quantite}</p>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => handleEdit(model.id)} className="mr-2 text-blue-500 hover:text-blue-600">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onClick={() => handleDelete(model.id)} className="text-red-500 hover:text-red-600">
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
