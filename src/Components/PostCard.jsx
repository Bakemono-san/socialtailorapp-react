import { useEffect, useState } from "react";
import DataHandler from "../DataHandler";
import ShareModal from './ShareModal.jsx';
import { PostHeader } from "./PostHeader";
import { PostImage } from "./PostImage";
import { PostReactions } from "./PostReactions";
import { PostActions } from "./PostActions";
import { Comments } from "./Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { MessageModal } from "./MessageModal"; // Importer le composant MessageModal

export default function PostCard(props) {
  // États
  const { notes } = props;
  const [currentRating, setCurrentRating] = useState(notes);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(null);
  const [isDisliked, setIsDisliked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dislikeID, setDislikeID] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // État pour ouvrir/fermer le MessageModal
  const [modalMessage, setModalMessage] = useState(""); // Message à afficher dans le modal
  const [toggleRating, setToggleRating] = useState(false);
  const [handleRating, setHandleRating] = useState(false);

  // Fonction pour gérer l'ouverture/fermeture du modal de partage
  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  // Effet pour récupérer les likes existants
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await DataHandler.getDatas(`/post/${props.post.id}/likes`);
        const userHasLiked = response.data.likes.some(
          (like) => like.userId === props.utilisateur.id
        );
        setIsLiked(userHasLiked);
      } catch (error) {
        console.error("Erreur lors de la récupération des likes", error);
      }
    };
    fetchLikes();
  }, [props.post.id]);

  // Effet pour récupérer le nombre de likes
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await DataHandler.getDatas(`/post/${props.post.id}/likes`);
        setLikeCount(response.data.likes.length);
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre de likes", error);
      }
    };
    fetchLikeCount();
  }, [props.post.id]);

  // Gestion des likes
  const handleLike = async () => {
    try {
      if (isLiked) {
        await DataHandler.postData(`/post/${props.post.id}/unlike`);
        setIsLiked(false);
        setLikeCount((prev) => Math.max(prev - 1, 0));
      } else {
        if (isDisliked) {
          await handleDislike();
        }
        await DataHandler.postData(`/post/${props.post.id}/like`);
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      // Afficher le message d'erreur dans le modal
      setModalMessage(error.response?.data?.message || "Erreur lors du like.");
      setIsMessageModalOpen(true); // Ouvrir le modal de message
    }
  };

  // Effet pour récupérer les dislikes
  useEffect(() => {
    const fetchDislikes = async () => {
      try {
        const response = await DataHandler.getData(`/post/${props.post.id}/dislike`);
        const userDislike = response.data.dislikes.find(
          (dislike) => dislike.userId === props.utilisateur.id
        );
        if (userDislike) {
          setIsDisliked(true);
          setDislikeID(userDislike.id);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des dislikes", error);
      }
    };
    fetchDislikes();
  }, [props.post.id]);

  // Gestion des dislikes
  const handleDislike = async () => {
    try {
      if (isDisliked) {
        await DataHandler.postData(`/post/${props.post.id}/undislike`);
        setIsDisliked(false);
      } else {
        if (isLiked) {
          await handleLike();
        }
        await DataHandler.postData(`/post/${props.post.id}/dislike`);
        setIsDisliked(true);
      }
    } catch (error) {
      // Afficher le message d'erreur dans le modal
      setModalMessage(error.response?.data?.message || "Erreur lors du dislike.");
      setIsMessageModalOpen(true); // Ouvrir le modal de message
    }
  };

  // Effet pour récupérer les commentaires
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await DataHandler.getDatas(`/post/${props.post.id}/comments`);
        if (response && response.comments && Array.isArray(response.comments)) {
          setComments(response.comments);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires", error);
        setComments([]);
      }
    };
    fetchComments();
  }, [isModalOpen]);

  // Gestion des commentaires
  const handleComment = async () => {
    if (commentText.trim()) {
      try {
        const response = await DataHandler.postData(
          `/post/${props.post.id}/comments/create`,
          { content: commentText }
        );
        setComments([...comments, response.newComment]);
        setCommentText("");
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire", error);
        setNotification({
          message: "Erreur lors de l'ajout du commentaire",
          type: "error",
        });
      }
    }
  };

  // Gestion des touches pour les commentaires
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleComment();
    }
  };

  return (
    <div className="w-full bg-white rounded">
      <PostHeader
        utilisateur={props.utilisateur}
        post={props.post}
        averageRating={averageRating}
        showRating={showRating}
        toggleRating={toggleRating}
        userRating={userRating}
        handleRating={handleRating}
        notification={notification}
      />

      <PostImage post={props.post} />

      <PostReactions
        isLiked={isLiked}
        likeCount={likeCount}
        isDisliked={isDisliked}
        handleLike={handleLike}
        handleDislike={handleDislike}
        openShareModal={openShareModal}
      />

      <PostActions handleAddToWishList={props.onAddToWishList} />

      <Comments
        comments={comments}
        commentText={commentText}
        setCommentText={setCommentText}
        handleComment={handleComment}
        handleKeyPress={handleKeyPress}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <ShareModal
        postId={props.post.id}
        isOpen={isShareModalOpen}
        onClose={closeShareModal}
      />

      {/* Modal de message pour les erreurs */}
      <MessageModal
        message={modalMessage}
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)} // Fermer le modal
      />
    </div>
  );
}
