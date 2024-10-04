import React, { useState } from 'react';
import Form from '../Components/Forms/Form';

export default function ModelPage() {
    const [models, setModels] = useState([]);
    const [selectedModelId, setSelectedModelId] = useState(null);

    const handleFormSubmit = (formData) => {
        if (selectedModelId) {
            // Mise à jour d'un modèle existant
            setModels(models.map((model) => 
                (model._id === selectedModelId ? { ...model, ...formData } : model)
            ));
        } else {
            // Création d'un nouveau modèle
            const newModel = {
                _id: Date.now(),
                ...formData,
            };
            setModels([...models, newModel]);
        }
        resetForm();
    };

    const resetForm = () => {
        setSelectedModelId(null);
    };

    const handleDelete = (modelId) => {
        setModels(models.filter((model) => model._id !== modelId));
    };

    const handleEdit = (model) => {
        setSelectedModelId(model._id);
    };

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">Gestion des Modèles</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Formulaire */}
                <div className="shadow-lg p-6 bg-white rounded-lg lg:col-span-1">
                    <Form 
                        onSubmit={handleFormSubmit} 
                        selectedModel={models.find(model => model._id === selectedModelId)} 
                    />
                </div>

                {/* Liste des modèles */}
                <div className="shadow-lg p-6 bg-white rounded-lg lg:col-span-1">
                    <ul className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
                        {models.map((model) => (
                            <li key={model._id} className="flex justify-between items-center p-5 hover:bg-gray-100 transition duration-200">
                                <div className="flex items-center space-x-4">
                                    {model.photo && <img src={model.photo} alt={model.libelle} className="w-20 h-20 object-cover rounded-full" />}
                                    <div>
                                        <h3 className="font-bold text-blue-600 text-xl">{model.libelle}</h3>
                                        <p className="text-gray-600">Prix : {model.prix} €</p>
                                        <p className="text-gray-600">Quantité : {model.quantite}</p>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => handleEdit(model)} className="mr-2 text-blue-500 hover:text-blue-600">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onClick={() => handleDelete(model._id)} className="text-red-500 hover:text-red-600">
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
