import {
  faCartPlus,
  faComment,
  faShare,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons/faClipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function PostCard(props) {

    const handleAddToWishList = () => {
        props.onAddToWishList(props.post.id, props.utilisateur.id); // Appelle la fonction du parent avec les IDs
    };
    
    return (
        <div className='w-full bg-white rounded'>
            <div className='flex items-center justify-between py-2 md:py-2 md:px-4 px-2  border-b border-grey-300'>
                <div className='flex gap-2 items-center'>
                    <img src={props.utilisateur.photoProfile} alt="" className='w-8 h-8 rounded-full' />
                    <div>
                        <h3>{props.utilisateur.prenom + " " + props.utilisateur.nom}</h3>
                        <p>{props.post.datePublication}</p>
                    </div>
                </div>
                <div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1">...</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-red-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><button href='#'>marquer favori</button></li>
                            <li><button>Signaler</button></li>
                        </ul>
                    </div>
                </div>
  return (
      <div className="w-full bg-white rounded">
        
      <div className="flex items-center justify-between py-2 md:py-2 md:px-4 px-2  border-b border-grey-300">
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
                <button href="#">marquer favori</button>
              </li>
              <li>
                <button>Signaler</button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  ✔️ Noter
                </button>
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

               <img className='min-w-86 h-80 object-cover lg:object-fill' src={props.post.Models.contenu} alt="" />
                
                <div className="py-2 px-6 md:p-6 flex flex-col md:gap-6 gap-4 w-full bg-white rounded-lg">
                    <h2 className="xl:text-3xl font-bold text-center text-gray-800">
                        {props.post.description}
                    </h2>
        <div className="py-2 px-6 md:p-6 flex flex-col md:gap-6 gap-4 w-full bg-white rounded-lg">
          <h2 className="xl:text-3xl font-bold text-center text-gray-800">
            {props.post.description}
          </h2>

          {/* <div className="flex justify-between md:text-lg">
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">Tissus</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                {props.tissu.map((element, index) => (
                                    <li key={index}>{element} <input type="radio" name="tissu" value={element} /></li>
                                ))}
                            </ul>
                        </div>


                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">Materials</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                {props.materials.map((element, index) => (
                                    <li key={index}>{element}</li>
                                ))}
                            </ul>
                        </div>
                    </div> */}
          {/* <div className="bg-gradient-to-r from-blue-500 to-red-500 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out w-fit self-center">
                    15000 fr
                </div> */}
                </div>

            </main>
            <div className="reactions flex justify-between items-center px-4 py-2 md:py-4 border-y border-grey-300  bg-white">
                <div className='flex gap-2 items-baseline  '>
                    <FontAwesomeIcon icon={faSmile} />
                    <p>Like</p>
                </div>
                <div className='flex gap-2 items-baseline'><FontAwesomeIcon icon={faComment} />
                    <p>Comment</p></div>
                <div className='flex gap-2 items-baseline'><FontAwesomeIcon icon={faShare} />
                    <p>Share</p></div>
            </div>
            <div className="reactions flex justify-between items-center px-4 py-2 md:py-4 border-y border-grey-300  bg-white">
                <span className='flex gap-2 items-baseline'>
                    <button className='btn btn-warning rounded h-10 text-white' onClick={handleAddToWishList} >
                        <FontAwesomeIcon icon={faClipboard} />
                        <p>Add to WishList</p>
                    </button>
                </span>
                <span className='flex gap-2 items-baseline'>
                    <button className='btn rounded  h-10 text-white bg-blue-500'>
                        <FontAwesomeIcon icon={faCartPlus} />
                        <p>Add to cart</p>
                    </button>
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
          <button className="btn btn-warning rounded h-10 text-white">
            <FontAwesomeIcon icon={faClipboard} />
            <p>Add to WishList</p>
          </button>
        </span>
        <span className="flex gap-2 items-baseline">
          <button className="btn rounded  h-10 text-white bg-blue-500">
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
          <div className="mt-4 flex">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={index < props.utilisateur.rank ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`h-5 w-5 ${
                index < props.utilisateur.rank ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 17.25l-6.172 3.246 1.178-6.872-4.993-4.87 6.897-1.002L12 2.75l3.09 6.002 6.897 1.002-4.993 4.87 1.178 6.872L12 17.25z"
              />
            </svg>
          ))}
        </div>
          {/* <div class="rating">
            <input
              type="radio"
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
              checked="checked"
            />
            <input
              type="radio"
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
            />
          </div> */}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
