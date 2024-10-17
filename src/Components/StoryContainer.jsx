import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from '../App';
import DataHandler from '../DataHandler';

const StoryItem = ({ image, title, isCurrentUser, isViewed, onClick, isAdd = false }) => (
  <div 
    className="flex flex-col items-center space-y-1 cursor-pointer"
    onClick={onClick}
  >
    <div className={`relative w-20 h-20 rounded-full overflow-hidden ${
      isCurrentUser
        ? 'border-4 border-blue-500'
        : isViewed
        ? 'border-4 border-gray-300'
        : 'border-4 border-green-500'
    } bg-white p-0.5`}>
      <div className="w-full h-full rounded-full overflow-hidden">
        {isAdd ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <FontAwesomeIcon icon={faPlus} className="text-gray-600 text-xl" />
          </div>
        ) : (
          <>
            <img src={image} alt={title} className="w-full h-full object-cover" />
            {isCurrentUser && (
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                <FontAwesomeIcon icon={faUser} className="text-white text-xs" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
    <p className="text-xs text-center w-16 truncate">{isAdd ? "Ajouter" : title}</p>
  </div>
);


export default function StoryContainer() {
  const { value } = useContext(DataContext);
  const [models, setModels] = useState(value.models);
  const [userStories, setUserStories] = useState([]);
  const [otherUserStories, setOtherUserStories] = useState([]);
  const [viewedStories, setViewedStories] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [selectedModel, setSelectedModel] = useState("");
  const [isCurrentUserStory, setIsCurrentUserStory] = useState(false);

  useEffect(() => {
    fetchUserStories();
    fetchOtherUserStories();
    // Charger les stories vues depuis le localStorage
    const storedViewedStories = JSON.parse(localStorage.getItem('viewedStories') || '[]');
    setViewedStories(new Set(storedViewedStories));
  }, []);

  const fetchUserStories = async () => {
    try {
      const stories = await DataHandler.getDatas("/story/user-stories");
      setUserStories(stories);
    } catch (error) {
      console.error("Error fetching user stories:", error);
    }
  };

  const fetchOtherUserStories = async () => {
    try {
      const stories = await DataHandler.getDatas("/story/other-user-stories");
      setOtherUserStories(stories);
    } catch (error) {
      console.error("Error fetching other user stories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedModel) {
      alert("Veuillez sélectionner un modèle.");
      return;
    }

    try {
      await DataHandler.postData("/story/create", {
        model: selectedModel.id
      });
      fetchUserStories();
      document.getElementById("my_modal_2").close();
    } catch (error) {
      console.error("Error creating story:", error);
      alert("Une erreur s'est produite lors de la création de la story.");
    }
  };

  const openModal = (index, isCurrentUser = false) => {
    setCurrentStoryIndex(index);
    setIsModalOpen(true);
    setIsCurrentUserStory(isCurrentUser);

    if (!isCurrentUser) {
      const storyId = otherUserStories[index].id;
      incrementStoryView(storyId);
      setViewedStories(prev => {
        const newSet = new Set(prev);
        newSet.add(storyId);
        // Sauvegarder dans le localStorage
        localStorage.setItem('viewedStories', JSON.stringify([...newSet]));
        return newSet;
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStoryIndex(null);
  };

  const handleDeleteStory = async (storyId) => {
    try {
      await DataHandler.deleteData(`/story/${storyId}`);
      fetchUserStories();
      closeModal();
    } catch (error) {
      console.error("Error deleting story:", error);
      alert("Une erreur s'est produite lors de la suppression de la story.");
    }
  };

  const incrementStoryView = async (storyId) => {
    try {
      await DataHandler.postData(`/story/${storyId}/view`);
    } catch (error) {
      console.error("Error incrementing story view:", error);
    }
  };

  return (
    <div className="flex flex-col w-full bg-gray-100">
      <div className="bg-white p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Stories</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <StoryItem
            isAdd={true}
            onClick={() => document.getElementById('my_modal_2').showModal()}
          />
          {userStories.map((story, index) => (
            <StoryItem
              key={story.id}
              image={story.Models.contenu}
              title={story.Models.titre}
              isCurrentUser={true}
              isViewed={false}
              onClick={() => openModal(index, true)}
            />
          ))}
          {otherUserStories.map((story, index) => (
            <StoryItem
              key={story.id}
              image={story.Models.contenu}
              title={story.Models.titre}
              isCurrentUser={false}
              isViewed={viewedStories.has(story.id)}
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && currentStoryIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full h-[80vh] flex flex-col">
            <div className="relative flex-grow">
              <img
                src={(isCurrentUserStory ? userStories[currentStoryIndex] : otherUserStories[currentStoryIndex]).Models.contenu}
                alt={(isCurrentUserStory ? userStories[currentStoryIndex] : otherUserStories[currentStoryIndex]).Models.titre}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold mb-2">
                {(isCurrentUserStory ? userStories[currentStoryIndex] : otherUserStories[currentStoryIndex]).Models.titre}
              </h3>
              {isCurrentUserStory && (
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {userStories[currentStoryIndex].Views} vues
                  </p>
                  <button 
                    className="btn btn-error btn-sm"
                    onClick={() => handleDeleteStory(userStories[currentStoryIndex].id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Créer une story</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="model" className="block text-gray-700 font-semibold mb-2">
                Sélectionnez un modèle :
              </label>
              <select
                id="model"
                value={selectedModel ? selectedModel.libelle : ""}
                onChange={(e) => {
                  const model = models.find(m => m.libelle === e.target.value);
                  setSelectedModel(model);
                }}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choisir un modèle --</option>
                {models.map(model => (
                  <option key={model.id} value={model.libelle}>{model.libelle}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => document.getElementById("my_modal_2").close()} className="btn btn-outline">
                Fermer
              </button>
              <button type="submit" className="btn btn-primary">
                Partager le modèle
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}