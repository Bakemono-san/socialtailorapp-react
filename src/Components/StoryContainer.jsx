import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import StoryItem from './StoryItem';


export default function StoryContainer(props) {
  
  const [storiesData, setStoriesData] = useState(props.stories || [
    {
      Models: {
        contenu: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSsG6tsv7jBEEZbHs0UTvAa4pmL8X31von1A&s",
        titre: "Josephine Water"
      }
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [likesCount, setLikesCount] = useState(Array(storiesData.length).fill(0));
  const [isCommentInputVisible, setCommentInputVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [viewedStories, setViewedStories] = useState([]); // Pour gérer les stories vues

  const [selectedModel, setSelectedModel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedModel) {
      alert("Veuillez sélectionner un modèle.");
      return;
    }
    console.log("Modèle partagé :", selectedModel);
    document.getElementById("my_modal_2").close(); // Fermer le modal après partage
  };

  const openModal = (index) => {
    moveStoryToEnd(index);
    setCurrentStoryIndex(storiesData.length - 1); // Pointe vers la dernière story
    setIsModalOpen(true);
    setCommentInputVisible(false);
  };

  const moveStoryToEnd = (index) => {
    const storyToMove = storiesData[index];

    // Nouvelle liste sans la story vue
    const updatedStories = storiesData.filter((_, i) => i !== index);

    // Ajoute la story vue à la fin
    setStoriesData([...updatedStories, storyToMove]);

    // Marque la story comme vue
    setViewedStories([...viewedStories, storyToMove.id]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStoryIndex(null);
    setShowEmojiPicker(false);
  };

  const handleLike = (index) => {
    const newLikesCount = [...likesCount];
    newLikesCount[index] += 1;
    setLikesCount(newLikesCount);
  };

  const handleComment = () => {
    setCommentInputVisible(!isCommentInputVisible);
  };

  const addEmoji = (emoji) => {
    setCommentText(commentText + emoji.native);
  };

  return (
    <div className="flex gap-4 w-full py-4 px-2">
      <button className="rounded md:w-28 w-28 md:h-28 max-h-28 bg-white flex flex-col justify-between p-1.5 min-w-26" onClick={() => document.getElementById('my_modal_2').showModal()} >
        <div className="bg-blue-400/50 flex flex-col justify-center w-full h-full items-center gap-2 bg-cover bg-center bg-no-repeat rounded-md cursor-pointer">
          <div className="w-6 h-6 p-4 rounded-full bg-blue-400 flex items-center justify-center">+</div>
          <p>Add Story</p>
        </div>
      </button>

      <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Créer une story</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="model"
                    className="block text-gray-700 font-semibold mb-2"
                  >
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
                    onClick={() => document.getElementById("my_modal_2").close()}
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

      <div className="flex gap-4 overflow-x-scroll w-full">
        {storiesData.map((story, index) => (
          <StoryItem key={story.id} bg={story.Models.contenu} onClick={() => openModal(index)} title={story.Models.titre} />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && currentStoryIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute left-0 p-4 text-white text-3xl"
              onClick={() => setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + storiesData.length) % storiesData.length)}
            >
              &#8249;
            </button>
            <div className="flex justify-center items-center w-[500px] h-[500px] bg-black">
              <img
                src={storiesData[currentStoryIndex].Models.contenu}
                alt={storiesData[currentStoryIndex].Models.titre}
                className="w-[500px] h-[880px] object-cover rounded-lg"
              />
            </div>
            <button
              className="absolute right-0 p-4 text-white text-3xl"
              onClick={() => setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % storiesData.length)}
            >
              &#8250;
            </button>
            <button
              className="absolute top-4 right-4 p-2 text-white text-lg"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>

          

          {/* Interactions */}
          <div className="flex gap-4 justify-center items-center mt-6 w-full">
            <button className="flex items-center gap-2 text-white" onClick={() => handleLike(currentStoryIndex)}>
              <FontAwesomeIcon icon={faThumbsUp} className="text-2xl" />
              <span>Like</span>
              <span>{likesCount[currentStoryIndex]}</span>
            </button>
            <button className="flex items-center gap-2 text-white" onClick={handleComment}>
              <FontAwesomeIcon icon={faComment} className="text-2xl" />
              <span>Comment</span>
            </button>
            <button className="flex items-center gap-2 text-white">
              <FontAwesomeIcon icon={faShare} className="text-2xl" />
              <span>Share</span>
            </button>
          </div>

          {isCommentInputVisible && (
            <div className="mt-4">
              <textarea
                className="p-2 border rounded w-full bg-white"
                rows="3"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setShowEmojiPicker(true)}>Add Emoji</button>
              {showEmojiPicker && <Picker data={data} onEmojiSelect={addEmoji} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
