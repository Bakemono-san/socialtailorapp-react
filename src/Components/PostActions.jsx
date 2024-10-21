// components/post/PostActions.jsx
//import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
export function PostActions({ handleAddToWishList }) {
  return (
    <div className="reactions flex justify-between items-center px-4 py-2 md:py-4 border-y border-grey-300 bg-white">
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
        <button className="btn rounded h-10 text-white bg-blue-500">
          <FontAwesomeIcon icon={faCartPlus} />
          <p>Add to cart</p>
        </button>
      </span>
    </div>
  );
}