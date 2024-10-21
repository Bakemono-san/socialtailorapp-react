 // components/post/PostReactions.jsx
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import LikeCount from "./LikeCount";

  import {
    
    faComment,
    faShare,
    faThumbsDown,
    faThumbsUp,
  } from "@fortawesome/free-solid-svg-icons";

  export function PostReactions({ 
    isLiked, 
    likeCount, 
    isDisliked,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    handleLike, 
    handleDislike, 
    openShareModal 
  }) {
    return (

      <div className="reactions flex justify-between items-center px-4 py-2 md:py-4 border-y border-grey-300 bg-white">
         {/* Composant LikeCount pour afficher le nombre de likes */}
      <LikeCount postId={1} />  {/* Remplacez "1" par `props.post.id` selon le contexte */}

        <div className="flex gap-2 items-baseline" onClick={handleLike}>
        <FontAwesomeIcon
            icon={faThumbsUp}
            className={isLiked ? "text-blue-600" : "text-gray-400"}  // Changement de couleur conditionnel
          />
          <p>{isLiked ? "Unlike" : "Like"}</p>

          {likeCount !== null && <span>({likeCount})</span>}
        </div>

        <div className="flex gap-2 items-baseline" onClick={handleDislike}>
        <FontAwesomeIcon
            icon={faThumbsDown}
            className={isDisliked ? "text-red-600" : "text-gray-400"}
          />
          <p>{isDisliked ? "Undislike" : "Dislike"}</p>
        </div>

        <div
          className="flex gap-2 items-baseline"
          onClick={() => document.getElementById("comment-input").focus()}
        >
          <FontAwesomeIcon icon={faComment} />
          <p>Comment</p>
        </div>
        
        <div className="flex gap-2 items-baseline" onClick={openShareModal}>
          <FontAwesomeIcon icon={faShare} />
          <p>Share</p>
        </div>
      </div>
    );
  }