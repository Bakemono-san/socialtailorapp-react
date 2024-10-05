import React, { useState } from 'react';
import StoryItem from './StoryItem';

export default function StoryContainer() {
    const [selectedModel, setSelectedModel] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedModel) {
            alert('Veuillez sélectionner un modèle.');
            return;
        }
        console.log('Modèle partagé :', selectedModel);
        document.getElementById('my_modal_2').close(); // Fermer le modal après partage
    };

    return (
        <div className="flex gap-8 w-full !min-w-32 pt-4 md:py-0">
            <button
                className="btn rounded w-28 h-28 flex flex-col border border-blue-500 p-2"
                onClick={() => document.getElementById('my_modal_2').showModal()}
            >
                <div className="bg-blue-400/50 justify-center items-center rounded h-full gap-2 w-full flex flex-col">
                    <div className="w-12 h-12 p-4 rounded-full bg-blue-400 flex items-center justify-center">+</div>
                    <p>Add Story</p>
                </div>
            </button>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Créer une story</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="model" className="block text-gray-700 font-semibold mb-2">
                                Sélectionnez un modèle :
                            </label>
                            <select
                                id="model"
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Choisir un modèle --</option>
                                <option value="Model 1">Modèle 1</option>
                                <option value="Model 2">Modèle 2</option>
                                <option value="Model 3">Modèle 3</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => document.getElementById('my_modal_2').close()}
                                className="btn bg-red-500 text-white hover:bg-red-600"
                            >
                                Fermer
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Partager le modèle
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            <div className="flex gap-8 overflow-x-scroll w-full">
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
            </div>
        </div>
    );
}

