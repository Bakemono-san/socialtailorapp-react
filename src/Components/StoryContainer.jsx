import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons'; 
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const initialStoriesData = [
  { id: 1, title: "Josephine Water", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSsG6tsv7jBEEZbHs0UTvAa4pmL8X31von1A&s" },
  { id: 2, title: "Sunrise", image: "https://i.pinimg.com/736x/36/7e/39/367e39a52d963b9ac380c9ea3012ca25.jpg" },
  { id: 3, title: "Adventure", image: "https://cdn-fijdp.nitrocdn.com/GVSxVNifwoHWotRFwNIamxBUqgcxVTHc/assets/images/optimized/rev-765e644/narutoshop.fr/wp-content/uploads/2024/07/variant-image-couleur-akatsuki-a-2.jpeg" },
  { id: 4, title: "Mountain Story", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGdwrHRr5hroz-7f_fWYxMNphZj0N1wh3qA&s" },
  { id: 5, title: "Beach Vibes", image: "https://i.pinimg.com/736x/de/a2/d6/dea2d69ad49802076c5a81dce804c67c.jpg" },
  { id: 6, title: "Sunset", image: "https://w0.peakpx.com/wallpaper/502/884/HD-wallpaper-inata-anim-girl-hyuga-love-naruto-shy.jpg" },
  { id: 7, title: "Sunset", image: "https://www.nuitonepiece.com/wp-content/themes/nuitonpiece/assets/img/zoro.png" },
  { id: 8, title: "Sunset", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeciL6f9NVs33cKGR1BBewMFV-SeZQQFGNpqbDiCoArDCbM_C5FClWixuKMyAD5yGfRWQ&usqp=CAU" },
];

export default function StoryContainer() {
  const [storiesData, setStoriesData] = useState(initialStoriesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [likesCount, setLikesCount] = useState(Array(storiesData.length).fill(0));
  const [isCommentInputVisible, setCommentInputVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [viewedStories, setViewedStories] = useState([]); // Pour gérer les stories vues

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
      <button className="btn w-[10rem] h-[16rem] bg-cover bg-center bg-no-repeat rounded-md cursor-pointer flex flex-col border border-blue-500 p-2" onClick={() => document.getElementById('my_modal_2').showModal()} >
        <div className="bg-blue-400/50 justify-center items-center gap-2 w-[09rem] h-[16rem] bg-cover bg-center bg-no-repeat rounded-md cursor-pointer">
          <div className="w-12 h-12 p-4 rounded-full bg-blue-400 flex items-center justify-center">+</div>
          <p>Add Story</p>
        </div>
      </button>

      <div className="flex gap-4 overflow-x-scroll w-full">
        {storiesData.map((story, index) => (
          <div
            key={story.id}
            className={`w-[10rem] h-[16rem] bg-cover bg-center bg-no-repeat rounded-md cursor-pointer 
              `}  
            style={{
              backgroundImage: `url(${story.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={() => openModal(index)}
          >
            <div className="flex items-center justify-center h-full bg-black bg-opacity-25 text-white">
              {story.title}
            </div>
          </div>
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
                src={storiesData[currentStoryIndex].image}
                alt={storiesData[currentStoryIndex].title}
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
