import {
  faCartPlus,
  faComment,
  faShare,
  faSmile,
  faStar as fasStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as farStar,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";

import { faClipboard } from "@fortawesome/free-solid-svg-icons/faClipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataHandler from "../DataHandler";

export default function PostCard(props) {
  const { notes } = props; // Déstructurer les props pour plus de lisibilité
  const [currentRating, setCurrentRating] = useState(notes);
  //
  const [notification, setNotification] = useState({ message: "", type: "" });

  //
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    if (typeof notes === "number") {
      // Si notes est déjà une moyenne
      setAverageRating(Math.round(notes * 2) / 2);
    } else if (Array.isArray(notes) && notes.length > 0) {
      // Si notes est un tableau de notes individuelles
      const sum = notes.reduce(
        (acc, curr) => acc + (typeof curr === "number" ? curr : curr.rate),
        0
      );
      const avg = sum / notes.length;
      setAverageRating(Math.round(avg * 2) / 2);
    } else {
      // Si notes n'est ni un nombre ni un tableau valide
      setAverageRating(0);
    }
  }, [notes]);

  const handleRating = async (newRating) => {
    try {
      const response = await DataHandler.postData(
        `/notes/${props.post.Users.id}`,
        { rate: newRating }
      );
      setCurrentRating(newRating);
      setAverageRating(
        (prev) => Math.round(((prev * 5 + newRating) / 6) * 2) / 2
      );

      // Mettre à jour la notification en vert en cas de succès
      setNotification({
        message: "Note ajoutée avec succès",
        type: "success",
      });

      // alert("Note ajoutée avec succès");
    } catch (error) {
      //
      // console.error("Erreur lors de la notation:", error.response.data);
      const errorMessage =
        typeof error.response.data === "object"
          ? JSON.stringify(error.response.data)
          : error.response.data;
      // alert(`Erreur Notation: ${errorMessage}`);
      // Mettre à jour la notification en rouge en cas d'erreur
      setNotification({
        message: `Erreur Notation: ${errorMessage}`,
        type: "error",
      });
    }
  };

  // Effet pour masquer la notification après 3 secondes
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000); // 3 secondes

      return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté
    }
  }, [notification]);

  const toggleRating = () => {
    setShowRating(!showRating);
  };

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

            {props.utilisateur.role == "tailleur" && (
              <>
                <div className="mt-4 flex items-center">
                  {renderStars(averageRating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({averageRating.toFixed(1)})
                  </span>
                </div>

                <button
                  onClick={toggleRating}
                  className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {showRating ? "Terminer" : "Noter"}
                </button>

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
              // <div className="mt-4 flex">
              //   {[...Array(5)].map((_, index) => (
              //     <svg
              //       // key={index}
              //       // xmlns="http://www.w3.org/2000/svg"
              //       // fill={index < currentRating ? "currentColor" : "none"}
              //       // viewBox="0 0 24 24"
              //       // strokeWidth="1.5"
              //       // stroke="currentColor"
              //       // className={`h-4 w-4 cursor-pointer ${
              //       //   index < currentRating ? "text-yellow-500" : "text-gray-300"
              //       key={index}
              //       xmlns="http://www.w3.org/2000/svg"
              //       fill={index < notes ? "currentColor" : "none"}
              //       viewBox="0 0 24 24"
              //       strokeWidth="1.5"
              //       stroke="currentColor"
              //       className={`h-4 w-4 ${
              //         index < notes
              //           ? "text-yellow-500"
              //           : "text-gray-300" /* Coloration conditionnelle */
              //       }`}
              //       onClick={() => handleRating(index + 1)}
              //     >
              //       <path
              //         strokeLinecap="round"
              //         strokeLinejoin="round"
              //         d="M12 17.25l-6.172 3.246 1.178-6.872-4.993-4.87 6.897-1.002L12 2.75l3.09 6.002 6.897 1.002-4.993 4.87 1.178 6.872L12 17.25z"
              //       />
              //     </svg>
              //   ))}
              // </div>
            )}
            {/* <p>{noteErrorMsg}</p> */}
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
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
