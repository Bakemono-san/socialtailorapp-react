import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';

// Liste fictive des stories avec leurs images respectives
const storiesData = [
  { id: 1, title: "Josephine Water", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSsG6tsv7jBEEZbHs0UTvAa4pmL8X31von1A&s" },
  { id: 2, title: "Sunrise", image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e0ca2a79-9357-4dfd-b264-ef4f7c81adfd/d898dq7-72e00cc8-694a-4ff7-a274-9b3af033181d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UwY2EyYTc5LTkzNTctNGRmZC1iMjY0LWVmNGY3YzgxYWRmZFwvZDg5OGRxNy03MmUwMGNjOC02OTRhLTRmZjctYTI3NC05YjNhZjAzMzE4MWQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ydSQ32iSqeJ0zGxtP-aKL6k2xYCiTM7dmgpWfWLVHZM" },
  { id: 3, title: "Adventure", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToMGkeWU1HEGo6Yc7F8f20oU6-4Z6gWF-Upw&s" },
  { id: 4, title: "Mountain Story", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGdwrHRr5hroz-7f_fWYxMNphZj0N1wh3qA&s" },
  { id: 5, title: "Beach Vibes", image: "https://i.pinimg.com/736x/de/a2/d6/dea2d69ad49802076c5a81dce804c67c.jpg" }
];

export default function StoryContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const openModal = (index) => {
    setCurrentStoryIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStoryIndex(null);
  };

  const handleLike = () => {
    setLikes(likes + 1); // Incrémentation des likes
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="flex gap-8 w-full !min-w-32 py-4 px-2 md:py-0">
      {/* Bouton pour créer une nouvelle story */}
      <button
        className="btn rounded w-40 h-40 flex flex-col border border-blue-500 p-2"
        onClick={() => document.getElementById('my_modal_2').showModal()}
      >
        <div className="bg-blue-400/50 justify-center items-center rounded h-full gap-2 w-full flex flex-col">
          <div className="w-12 h-12 p-4 rounded-full bg-blue-400 flex items-center justify-center">
            +
          </div>
          <p>Add Story</p>
        </div>
      </button>

      {/* Liste des stories */}
      <div className="flex gap-8 overflow-x-scroll w-full">
        {storiesData.map((story, index) => (
          <div
            key={story.id}
            className="w-40 h-40 bg-cover bg-center bg-no-repeat rounded-md cursor-pointer"
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

      {/* Modal pour afficher une story en grand */}
      {isModalOpen && currentStoryIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute left-0 p-4 text-white text-3xl"
              onClick={() => setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + storiesData.length) % storiesData.length)}
            >
              &#8249;
            </button>
            <div className="w-full h-full flex flex-col items-center justify-center">
              <img
                src={storiesData[currentStoryIndex].image}
                alt={storiesData[currentStoryIndex].title}
                className="max-w-4xl max-h-3xl w-auto h-auto"
              />
              <div className="mt-4 text-white text-2xl">{storiesData[currentStoryIndex].title}</div>

              {/* Actions: Like, Comment, Share */}
              <div className="flex justify-around mt-4 w-full max-w-lg text-white">
                <button className="flex items-center gap-2" onClick={handleLike}>
                  <FontAwesomeIcon icon={faThumbsUp} /> {likes} Likes
                </button>
                <button className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faComment} /> {comments.length} Comments
                </button>
                <button className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faShare} /> Share
                </button>
              </div>

              {/* Comment Section */}
              <div className="mt-6 w-full max-w-lg">
                <form onSubmit={handleCommentSubmit} className="flex">
                  <input
                    type="text"
                    className="w-full p-2 rounded-l-md"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-r-md"
                  >
                    Send
                  </button>
                </form>

                {/* Afficher les commentaires */}
                <div className="mt-4 text-white">
                  {comments.map((comment, idx) => (
                    <div key={idx} className="bg-gray-800 p-2 my-2 rounded-md">
                      {comment}
                    </div>
                  ))}
                </div>
              </div>
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
        </div>
      )}
    </div>
  );
}