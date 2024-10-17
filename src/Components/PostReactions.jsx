// components/post/PostReactions.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
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
      <div className="flex gap-2 items-baseline" onClick={handleLike}>
        <FontAwesomeIcon
          icon={faThumbsUp}
          className={isLiked ? "text-blue-600" : ""}
        />
        <p>{isLiked ? "Unlike" : "Like"}</p>
        {likeCount !== null && <span>({likeCount})</span>}
      </div>

      <div className="flex gap-2 items-baseline" onClick={handleDislike}>
        <FontAwesomeIcon
          icon={faThumbsDown}
          className={isDisliked ? "text-red-600" : ""}
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