// LikeCount.jsx
import { useEffect, useState } from "react";
import DataHandler from "../DataHandler";

export default function LikeCount({ postId }) {
  const [likeCount, setLikeCount] = useState(0); // Gérer le nombre de likes

  // Récupérer le nombre de likes via l'API au montage du composant
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await DataHandler.getData(`/post/${postId}/likes`);
        setLikeCount(response.data.likes.length); // Correction ici
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre de likes", error);
      }
    };
    fetchLikeCount();
  }, [postId]);
  // Rappel chaque fois que `postId` change

  return (
    <div className="text-gray-700 text-sm font-semibold">
      {likeCount} {likeCount === 1 ? "Like" : "Likes"}
    </div>
  );
}
