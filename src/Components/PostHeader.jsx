// components/post/PostHeader.jsx
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar as farStar, faStarHalfAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar,faStarHalfAlt,} from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

export function PostHeader({
  utilisateur,
  post,
  averageRating,
  showRating,
  toggleRating,
  userRating,
  handleRating,
  notification,
  renderStars,
  handleAddToFavoris,
  handleSubmit,
  reason,
  setReason,
  responseMessage,
  responseSuccess,
  isFollowing: initialFollowing,
  onFollowUser,
  connectedUser
}) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing); // Gérer l'état local pour le suivi
  const [message, setMessage] = useState("");

  // Met à jour l'état local lorsqu'il change dans le parent
  useEffect(() => {
    setIsFollowing(initialFollowing);
  }, [initialFollowing]);

  const handleClick = async () => {
    const newFollowState = !isFollowing;
    await onFollowUser(utilisateur.id, newFollowState);

    // Met à jour l'état local pour le bouton
    setIsFollowing(newFollowState);

    setMessage(
      newFollowState
        ? "Vous suivez ce tailleur"
        : "Vous vous êtes désabonné de ce tailleur"
    );
    setTimeout(() => {
      setMessage("");
    }, 4000);
  }; 
  

  return (
    <div className="flex items-center justify-between py-2 md:py-2 md:px-4 px-2 border-b border-grey-300 rounded-t-xl">
      <div className="flex gap-2 items-center">
        <img
          src={utilisateur.photoProfile}
          alt=""
          className="w-8 h-8 rounded-full shadow-lg"
        />
        <div>
          <h3>{utilisateur.prenom + " " + utilisateur.nom}</h3>
          <p>{post.datePublication}</p>

          {connectedUser.id !== post.Users.id &&
            (isFollowing ?  (
              <button
                className="bg-red-500 text-white border-none p-2.5 px-5 cursor-pointer rounded-md hover:opacity-80 transition-opacity"
                onClick={handleClick}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white border-none p-2.5 px-5 cursor-pointer rounded-md hover:opacity-80 transition-opacity"
                onClick={handleClick}
              >
                Follow
              </button>
            ))
            }

          {/* {isFollowing ? (
            <button
              className="bg-red-500 text-white border-none p-2.5 px-5 cursor-pointer rounded-md hover:opacity-80 transition-opacity"
              onClick={handleClick}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white border-none p-2.5 px-5 cursor-pointer rounded-md hover:opacity-80 transition-opacity"
              onClick={handleClick}
            >
              Follow
            </button>
          )} */}

          {/* Affichage conditionnel du message */}
          {message && (
            <p className="mt-2 text-sm text-gray-600 animate-fade">{message}</p>
          )}

          {utilisateur.role === "tailleur" && (
          //  {utilisateur.role === "tailleur" && (
            <>
              <div className="mt-4 flex items-center">
                {renderStars(averageRating)}
                <span className="ml-2 text-sm text-gray-600">
                  ({averageRating.toFixed(1)})
                </span>
              </div>
              
              {connectedUser.id !== post.Users.id &&  
              <button
                onClick={toggleRating}
                className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                {showRating ? "Terminer" : "Noter"}
              </button>
              }

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
                        star <= userRating ? "text-yellow-500" : "text-gray-300"
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
            <li>
              <button
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Signaler
              </button>
            </li>
          </ul>
        </div>
      </div>

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

