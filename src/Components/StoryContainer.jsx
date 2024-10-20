import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from '../App';
import DataHandler from '../DataHandler';

const StoryItem = ({ image, title, isCurrentUser, isViewed, onClick, isMyStories = false, prenom, storyCount }) => (
  <div 
    className="flex flex-col items-center space-y-2 cursor-pointer min-w-[80px]"
    onClick={onClick}
  >
    <div className="relative md:w-20 md:h-20 w-16 h-16 rounded-full overflow-hidden bg-white">
      <div className={`w-full h-full rounded-full ${
        isCurrentUser
          ? 'p-[3px] border-[3px] border-blue-500'
          : isViewed
          ? 'p-[3px] border-[3px] border-gray-300'
          : 'p-[3px] border-[3px] border-green-500'
      }`}>
        <div className="w-full h-full bg-white rounded-full">
          <div className="w-full h-full rounded-full overflow-hidden">
            {isMyStories && !image ? (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-gray-600 text-2xl" />
              </div>
            ) : (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>
      {isMyStories && (
        <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
          <FontAwesomeIcon icon={faPlus} className="text-white text-sm" />
        </div>
      )}
    </div>
    <div className="flex flex-col items-center">
      <p className="text-sm text-center w-20 truncate font-medium">
        {isMyStories ? "Votre story" : title}
      </p>
      <p className="text-xs text-gray-500 text-center">
        {isMyStories 
          ? storyCount === 0 
            ? "Appuyez pour ajouter" 
            : `${storyCount} ${storyCount === 1 ? 'story' : 'stories'}`
          : prenom}
      </p>
    </div>
  </div>
);

const StoryViewer = ({ stories, currentIndex, isCurrentUser, onClose, onDelete, onNavigate }) => {
  const story = stories[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full h-[80vh] flex flex-col relative">
        <div className="relative flex-grow">
          <img
            src={story.Models.contenu}
            alt={story.Models.titre}
            className="w-full h-full object-cover"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            onClick={onClose}
          >
            ✕
          </button>
          {currentIndex > 0 && (
            <button
              className="absolute top-1/2 left-4 text-white text-2xl hover:text-gray-300 transform -translate-y-1/2"
              onClick={() => onNavigate(-1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-2xl" />
            </button>
          )}
          {currentIndex < stories.length - 1 && (
            <button
              className="absolute top-1/2 right-4 text-white text-2xl hover:text-gray-300 transform -translate-y-1/2"
              onClick={() => onNavigate(1)}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
            </button>
          )}
        </div>
        <div className="p-6 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-xl font-semibold">{story.Models.titre}</h3>
            <p className="text-base text-gray-500">{isCurrentUser ? "Vous" : story.Users.prenom}</p>
          </div>
          {isCurrentUser && (
            <div className="flex justify-between items-center">
              <p className="text-base text-gray-600">{story.Views} vues</p>
              <button 
                className="btn btn-error"
                onClick={() => onDelete(story.id)}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AddStoryModal = ({ models, onSubmit, onClose }) => {
  const [selectedModel, setSelectedModel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedModel) {
      alert("Veuillez sélectionner un modèle.");
      return;
    }
    onSubmit(selectedModel);
  };

  return (
    <dialog id="add_story_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-xl mb-6">Créer une story</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="model" className="block text-gray-700 font-semibold mb-3">
              Sélectionnez un modèle :
            </label>
            <select
              id="model"
              value={selectedModel ? selectedModel.libelle : ""}
              onChange={(e) => {
                const model = models.find(m => m.libelle === e.target.value);
                setSelectedModel(model);
              }}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="">-- Choisir un modèle --</option>
              {models.map(model => (
                <option key={model.id} value={model.libelle}>{model.libelle}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Fermer
            </button>
            <button type="submit" className="btn btn-primary">
              Partager le modèle
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

const StoryContainer = () => {
  const { value } = useContext(DataContext);
  const [models, setModels] = useState(value.models);
  const [userStories, setUserStories] = useState([]);
  const [otherUserStories, setOtherUserStories] = useState([]);
  const [viewedStories, setViewedStories] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [isCurrentUserStory, setIsCurrentUserStory] = useState(false);

  useEffect(() => {
    fetchUserStories();
    fetchOtherUserStories();
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

  const handleAddStory = async (selectedModel) => {
    try {
      await DataHandler.postData("/story/create", {
        model: selectedModel.id
      });
      fetchUserStories();
      document.getElementById("add_story_modal").close();
    } catch (error) {
      console.error("Error creating story:", error);
      alert("Une erreur s'est produite lors de la création de la story.");
    }
  };

  const handleStoryClick = (index, isCurrentUser = false) => {
    if (isCurrentUser) {
      setIsCurrentUserStory(true);
      setCurrentStoryIndex(0);
      setIsModalOpen(true);
    } else {
      setIsCurrentUserStory(false);
      setCurrentStoryIndex(index);
      setIsModalOpen(true);
      const storyId = otherUserStories[index].id;
      incrementStoryView(storyId);
      setViewedStories(prev => {
        const newSet = new Set(prev);
        newSet.add(storyId);
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

  const handleNavigate = (direction) => {
    const stories = isCurrentUserStory ? userStories : otherUserStories;
    const newIndex = currentStoryIndex + direction;
    if (newIndex >= 0 && newIndex < stories.length) {
      setCurrentStoryIndex(newIndex);
      if (!isCurrentUserStory) {
        const storyId = stories[newIndex].id;
        incrementStoryView(storyId);
        setViewedStories(prev => {
          const newSet = new Set(prev);
          newSet.add(storyId);
          localStorage.setItem('viewedStories', JSON.stringify([...newSet]));
          return newSet;
        });
      }
    }
  };

  const openAddStoryModal = () => {
    document.getElementById('add_story_modal').showModal();
  };

  return (
    <div className="flex flex-col w-full shadow-md bg-white md:rounded-md rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Stories</h2>
          <button 
            className="btn btn-primary"
            onClick={openAddStoryModal}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Ajouter une story
          </button>
        </div>
        <div className="flex space-x-6 overflow-x-auto pb-4">
          <StoryItem
            isMyStories={true}
            image={userStories[0]?.Models.contenu}
            storyCount={userStories.length}
            isCurrentUser={true}
            onClick={() => userStories.length > 0 ? handleStoryClick(0, true) : openAddStoryModal()}
          />
          {otherUserStories.map((story, index) => (
            <StoryItem
              key={story.id}
              image={story.Models.contenu}
              title={story.Models.titre}
              isCurrentUser={false}
              isViewed={viewedStories.has(story.id)}
              onClick={() => handleStoryClick(index)}
              prenom={story.Users.prenom}
            />
          ))}
        </div>
      </div>

      {isModalOpen && currentStoryIndex !== null && (
        <StoryViewer
          stories={isCurrentUserStory ? userStories : otherUserStories}
          currentIndex={currentStoryIndex}
          isCurrentUser={isCurrentUserStory}
          onClose={closeModal}
          onDelete={handleDeleteStory}
          onNavigate={handleNavigate}
        />
      )}

      <AddStoryModal
        models={models}
        onSubmit={handleAddStory}
        onClose={() => document.getElementById("add_story_modal").close()}
      />
    </div>
  );
};

export default StoryContainer;