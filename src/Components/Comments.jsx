import { useState } from "react";
import DataHandler from "../DataHandler";

export function Comments({
  comments,
  setComments,
  commentText,
  setCommentText,
  handleComment,
  handleKeyPress,
  isModalOpen,
  setIsModalOpen,
}) {
  const [replyTexts, setReplyTexts] = useState({}); // Gérer les réponses
  const [showReplies, setShowReplies] = useState({}); // Gérer l'affichage des réponses
  //const [comments, setComments] = useState([]); // Gérer les commentaires en local

  const toggleReplies = (commentId) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplyTextChange = (commentId, value) => {
    setReplyTexts((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const handleReply = async (parentCommentId) => {
    const replyContent = replyTexts[parentCommentId]?.trim();

  
    if (replyContent) {
      try {
        const response = await DataHandler.postData(
          `/comments/${parentCommentId}/reply`,
          { content: replyContent }
        );
  
        console.log("Réponse API :", response); // Vérification du format
  
        // Puisque l'API retourne l'objet directement
        const newReply = response.newReply;
  
        // Mettre à jour les commentaires localement
        const updatedComments = comments.map((comment) =>
          comment.id === parentCommentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), newReply],
              }
            : comment
        );
  
        setComments(updatedComments); // Mettre à jour l’état des commentaires
        setReplyTexts((prev) => ({ ...prev, [parentCommentId]: "" })); // Réinitialiser le champ de texte
      } catch (error) {
        console.error("Erreur lors de l'envoi de la réponse", error);
      }
    }
  };
  
  

  return (
    <div className="comments-section px-4 py-4 bg-white rounded-lg shadow">
      <button
        className="btn btn-outline btn-primary mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Voir les commentaires
      </button>

      <div className="w-full bg-blue-50 rounded p-4">
        <input
          id="comment-input"
          type="text"
          className="p-2 bg-white w-full border border-gray-300 rounded-lg outline-none"
          placeholder="Écrivez un commentaire..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="btn btn-primary mt-2" onClick={() => handleComment()}>
          Envoyer
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
            <h2 className="text-lg font-bold mb-4">Tous les commentaires</h2>
            <div className="max-h-80 overflow-y-auto">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 bg-gray-100 rounded my-2 flex items-start gap-4"
                  >
                    <img
                      src={comment.photoProfile}
                      alt={`${comment.prenom} ${comment.nom}`}
                      className="w-10 h-10 rounded-full"
                    />

                    <div className="w-full">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-800">
                          {comment.prenom} {comment.nom}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <p className="mt-2 text-gray-700">{comment.content}</p>

                      <button
                        className="text-sm text-blue-500 mt-2"
                        onClick={() => toggleReplies(comment.id)}
                      >
                        {showReplies[comment.id] ? "Masquer les réponses" : "Répondre"}
                      </button>

                      {showReplies[comment.id] && (
                        <div className="mt-4 ml-8">
                          <input
                            type="text"
                            className="p-2 w-full bg-gray-50 border rounded-lg outline-none"
                            placeholder="Répondez à ce commentaire..."
                            value={replyTexts[comment.id] || ""}
                            onChange={(e) =>
                              handleReplyTextChange(comment.id, e.target.value)
                            }
                          />
                          <button
                            className="btn btn-sm btn-primary mt-2"
                            onClick={() => handleReply(comment.id)}
                          >
                            Envoyer la réponse
                          </button>

                          {comment.replies?.length > 0 && (
                            <div className="mt-4">
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="flex items-start gap-4 bg-gray-200 rounded-lg p-2 mt-2"
                                >
                                  <img
                                    src={reply.photoProfile}
                                    alt={`${reply.prenom} ${reply.nom}`}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <div>
                                    <p className="font-semibold">
                                      {reply.prenom} {reply.nom}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {new Date(reply.createdAt).toLocaleString()}
                                    </p>
                                    <p className="mt-1">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
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
