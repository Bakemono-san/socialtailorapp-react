// components/post/Comments.jsx
export function Comments({ comments, commentText, setCommentText, handleComment, 
    handleKeyPress, isModalOpen, setIsModalOpen }) {

      
    return (
      <div className="comments-section px-4 py-4 bg-white rounded-b-xl">
        <button
          className="btn btn-outline btn-primary mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Voir les commentaires
        </button>
  
        <div className="w-full bg-blue-100 rounded p-4">
          <input
            id="comment-input"
            type="text"
            className="p-2 bg-transparent w-full border-none outline-none"
            placeholder="Écrivez un commentaire..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="btn btn-primary mt-2" onClick={handleComment}>
            Envoyer
          </button>
        </div>
  
        <div>
          {comments.length > 0 ? (
            <div key={comments[0].id}>
              <p>{comments[0].content}</p>
            </div>
          ) : (
            <p>Aucun commentaire disponible</p>
          )}
        </div>
  
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded p-6 max-w-lg w-full">
              <h2 className="text-lg font-bold mb-4">Tous les commentaires</h2>
              <div className="max-h-80 overflow-y-auto">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="p-2 bg-gray-100 rounded my-2">
                      <p>{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Aucun commentaire pour l'instant.</p>
                )}
              </div>
              <button
                className="btn btn-outline btn-primary mt-4"
                onClick={() => setIsModalOpen(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }