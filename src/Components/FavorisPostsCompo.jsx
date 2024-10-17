import React from "react";
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
import { Link } from "react-router-dom";

const FavorisPostsCompo = ({ props }) => {
  return (
    <div className="w-full bg-white rounded">
      <div className="flex items-center justify-between py-2 md:py-2 md:px-4 px-2  border-b border-grey-300">
        <div className="flex gap-2 items-center">
          <img
          src="https://res.cloudinary.com/dytchfsin/image/upload/v1728488365/persons/xs45tfdhcpkd2jxgoyor.jpg"
            // src={props.utilisateur.photoProfile}
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3>Prénom nom auteur</h3>
            <p>Date publi</p>
            {/* <h3>{props.utilisateur.prenom + " " + props.utilisateur.nom}</h3>
            <p>{props.post.datePublication}</p> */}
          </div>
        </div>
        <div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              ...
            </div>
          </div>
        </div>
      </div>
      <main className="flex flex-col">
        {/* <img
          className="min-w-86 h-80 object-cover lg:object-fill"
          src={props.post.Models.contenu}
          alt=""
        /> */}

        <div className="py-2 px-6 md:p-6 flex flex-col md:gap-6 gap-4 w-full bg-white rounded-lg">
          <h2 className="xl:text-3xl font-bold text-center text-gray-800">
            {/* {props.post.description} */}
            <p>description post</p>
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
            {/* <img
              src={props.utilisateur.photoProfile}
              alt=""
              className="w-8 h-8 rounded-full"
            /> */}
            <div>
              {/* <h3>{props.utilisateur.prenom + " " + props.utilisateur.nom}</h3> */}
              {/* <p>{props.post.datePublication}</p> */}
              <h3>Nom prénom auteur</h3>
              <p>Date Publi</p>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default FavorisPostsCompo;
