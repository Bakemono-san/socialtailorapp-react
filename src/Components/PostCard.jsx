// PostCard.jsx
import { useEffect, useState } from "react";
import DataHandler from "../DataHandler";
// Remplacez l'import actuel de .tsx par .jsx
import ShareModal from './ShareModal.jsx'; // Mise à jour correcte

import { PostHeader } from "./PostHeader";
import { PostImage } from "./PostImage";
import { PostReactions } from "./PostReactions";
import { PostActions } from "./PostActions";
import { Comments } from "./Comments";
import {
  faStar as fasStar,
} from "@fortawesome/free-solid-svg-icons";
import {faStar as farStar,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataHandler from "../DataHandler";
import { Link } from "react-router-dom";

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
        const response = await DataHandler.getData(`/post/${props.post.id}/likes`);
        setLikeCount(response.data.likes.length); // Correction ici
      } catch (error) {
        console.error("Erreur lors de la récupération des likes", error);
      }
    };
    
    fetchLikeCount();
  },[props.post.id]);

  // Gestion des likes
  const handleLike = async () => {
    try {
      if (isLiked) {
        await DataHandler.postData(
          `/post/${props.post.id}/like/${props.utilisateur.id}/unlike`
        );
        setIsLiked(false);
        setLikeCount((prev) => Math.max(prev - 1, 0));  // Empêche d’avoir un compteur négatif
      } else {
        if (isDisliked) {
          await handleDislike();  // Retirer le dislike avant de liker
        }
        await DataHandler.postData(`/post/${props.post.id}/like`);
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }      
    } catch (error) {
      console.error("Erreur lors du like/unlike", error);
    }
  };

  // Effet pour récupérer les dislikes
  useEffect(() => {
    const fetchDislikes = async () => {
      try {
        const response = await DataHandler.getData(
          `/post/${props.post.id}/dislike`
        );
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
        await DataHandler.postData(`/post/${props.post.id}/dislike/${dislikeID}/undislike`);
        setIsDisliked(false);
      } else {
        if (isLiked) {
          await handleLike();
        }
        const response = await DataHandler.postData(
          `/post/${props.post.id}/dislike`
        );
        setIsDisliked(true);
        setDislikeID(response.data.dislike.id);
      }
    } catch (error) {
      console.error("Erreur lors du dislike/undislike", error);
    }
  };

  // Effet pour récupérer les commentaires
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await DataHandler.getDatas(
          `/post/${props.post.id}/comments`
        );
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

  // Effet pour calculer la moyenne des notes
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); // Contrôle du modal
  const [reason, setReason] = useState(""); // Raison du signalement
  const [responseMessage, setResponseMessage] = useState(null); // Stocker le message de réponse
  const [responseSuccess, setResponseSuccess] = useState(null); // Stocker le statut de succès ou d'échec

  useEffect(() => {
    if (typeof notes === "number") {
      setAverageRating(Math.round(notes * 2) / 2);
    } else if (Array.isArray(notes) && notes.length > 0) {
      const sum = notes.reduce(
        (acc, curr) => acc + (typeof curr === "number" ? curr : curr.rate),
        0
      );
      const avg = sum / notes.length;
      setAverageRating(Math.round(avg * 2) / 2);
    } else {
      setAverageRating(0);
    }
  }, [notes]);
  //test
  // Gestion des notes
  const handleRating = async (newRating) => {
    try {
      const response = await DataHandler.postData(`/notes/${props.post.Users.id}`, {
        rate: newRating,
      });
      setCurrentRating(newRating);
      setAverageRating((prev) => Math.round(((prev * 5 + newRating) / 6) * 2) / 2);
      setNotification({
        message: "Note ajoutée avec succès",
        type: "success",
      });
    } catch (error) {
      const errorMessage =
        typeof error.response.data === "object"
          ? JSON.stringify(error.response.data)
          : error.response.data;
      setNotification({
        message: `Erreur Notation: ${errorMessage}`,
        type: "error",
      });
    }
  };

  // Effet pour masquer la notification
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Toggle du système de notation
  const toggleRating = () => {
    setShowRating(!showRating);
  };

  // Fonction pour rendre les étoiles
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <FontAwesomeIcon key={i} icon={fasStar} className="text-yellow-500" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarHalfAlt}
            className="text-yellow-500"
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={farStar} className="text-gray-300" />
        );
      }
    }

    return stars;
  };

  // Gestion de l'ajout à la liste de souhaits
  const handleAddToWishList = () => {

    props.onAddToWishList(props.post.id, props.utilisateur.id); // Appelle la fonction du parent avec les IDs
  };

  const handleAddToFavoris = async () => {
    try {
      console.log("Début de handleAddToFavoris pour le post:", props.post.id);
      const response = await props.onAddToFavoris(props.post.id);
      console.log("Réponse reçue dans le composant enfant:", response);
      console.log("Type de response:", typeof response);
      console.log("Status de la réponse:", response.status);
      console.log("Data de la réponse:", response.data);

      if (response.status === 201) {
        console.log("Entré dans le bloc 201");
        setMessage(response.data || "Ajouté aux favoris !");
        setMessageColor("green");
      } else if (response.status === 400) {
        console.log("Entré dans le bloc 400");
        setMessage(response.data || "Ce post est déjà dans vos favoris.");
        setMessageColor("orange");
      } else if (response.status === 404) {
        console.log("Entré dans le bloc 404");
        setMessage(response.data || "Post non trouvé.");
        setMessageColor("red");
      } else {
        console.log("Entré dans le bloc else");
        setMessage(response.data || "Une erreur inattendue s'est produite.");
        setMessageColor("red");
      }
    } catch (error) {
      console.error("Erreur détaillée dans le composant enfant:", error);
      setMessage("Erreur lors de l'ajout aux favoris.");
      setMessageColor("red");
    }

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   props.onReportUser(props.post.id, props.utilisateur.id, reason); // Appel de la fonction du parent
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await props.onReportUser(
      props.post.id,
      props.utilisateur.id,
      reason
    ); // Appel de la fonction du parent
    setResponseMessage(response.message); // Stocker le message de réponse
    setResponseSuccess(response.success); // Stocker le statut de succès ou d'échec
    setReason(""); // Réinitialiser la raison après soumission

    setTimeout(() => {
      setResponseMessage(null);
      setResponseSuccess(null);
    }, 3000); // 3000ms = 3 secondes
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
        renderStars={renderStars}
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


      <PostActions handleAddToWishList={handleAddToWishList} />

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

                {showRating && (
                  <div className="mt-2 flex items-center">
                    <span className="mr-2 text-sm text-gray-600">
                      Votre note :
                    </span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesomeIcon
                        key={star}
                        icon={star <= userRating ? fasStar : farStar}
                        className={`cursor-pointer ${
                          star <= userRating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleRating(star)}
                      />
                    ))}
                  </div>
                )}
                {notification.message && (
                  <div
                    className={`mt-2 p-2 text-sm ${
                      notification.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {notification.message}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              ...
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-red-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <button onClick={handleAddToFavoris}>marquer favori</button>
              </li>
              {message && (
                <p style={{ color: messageColor, marginTop: "10px" }}>
                  {message}
                </p>
              )}
              <li>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                >
                  Signaler
                </button>
              </li>
              <li>
                <Link to="/favorisPosts">Mes Favoris</Link>
                {/* <button Link to='/favorisPosts'>Mes Favoris</button> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <main className="flex flex-col">
        <img
          className="min-w-86 h-80 object-cover lg:object-fill"
          src={props.post.Models.contenu}
          alt=""
        />

        <div className="py-2 px-6 md:p-6 flex flex-col md:gap-6 gap-4 w-full bg-white rounded-lg">
          <h2 className="xl:text-3xl font-bold text-center text-gray-800">
            {props.post.description}
          </h2>
        </div>
      </main>
      <div className="reactions flex justify-between items-center px-4 py-2 md:py-4 border-y border-grey-300  bg-white">
        <div className="flex gap-2 items-baseline  ">
          <FontAwesomeIcon icon={faSmile} />
          <p>Like</p>
        </div>
        <div className="flex gap-2 items-baseline">
          <FontAwesomeIcon icon={faComment} />
          <p>Comment</p>
        </div>
        <div className="flex gap-2 items-baseline">
          <FontAwesomeIcon icon={faShare} />
          <p>Share</p>
        </div>
      </div>
      <div className="reactions flex justify-between items-center px-4 py-2 md:py-4 border-y border-grey-300  bg-white">
        <span className="flex gap-2 items-baseline">
          <button
            className="btn btn-warning rounded h-10 text-white"
            onClick={handleAddToWishList}
          >
            <FontAwesomeIcon icon={faClipboard} />
            <p>Add to WishList</p>
          </button>
        </span>
        <span className="flex gap-2 items-baseline">
          <button className="btn rounded  h-10 text-white bg-blue-500" onClick={addToCart}>
            <FontAwesomeIcon icon={faCartPlus} />
            <p>Add to cart</p>
          </button>
        </span>
      </div>

      <div className="px-4 flex justify-center items-center py-4 bg-white">
        <div className="w-full bg-blue-100 rounded">
          <input
            type="text"
            className="p-2 bg-transparent w-full border-none"
            placeholder="comment..."
          />
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        {/* {console.log(props.utilisateur)} */}
        <div className="modal-box bg-white">
          <div className="flex gap-2 items-center">
            <img
              src={props.utilisateur.photoProfile}
              alt=""
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h3>{props.utilisateur.prenom + " " + props.utilisateur.nom}</h3>
              <p>{props.post.datePublication}</p>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* MODAL SIGNALEMENT UTILISATEUR */}

      <dialog id="my_modal_5" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form onSubmit={handleSubmit}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  Indiquez la raison du signalement
                </span>
              </div>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Raison Signalement"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <button type="submit" className="btn btn-success">
              Signaler
            </button>
          </form>
          {responseMessage && (
            <div
              className={`mt-4 text-center ${
                responseSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {responseMessage}
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}