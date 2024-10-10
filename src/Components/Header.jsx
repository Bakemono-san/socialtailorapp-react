import { faBasketShopping, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'; // Import de l'icône de cœur
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { DataContext } from "../App";

export default function Header() {
  const { value, setValue } = useContext(DataContext);
  return (
    <div className="bg-[#3b5999] text-sm md:text-2xl text-white py-2 px-4 md:px-10 flex justify-between md:relative w-full  items-center">
      <div className="flex items-center gap-24 flex-1">
        <h1 className=" font-bold animate-pulse">Social Tailor</h1>
      </div>
      <div className="flex items-center gap-12 flex-1 justify-end">
        <div className="flex justify-between gap-2 md:gap-4">

          <div className="notif flex items-center justify-center p-2 cursor-pointer hover:text-red-500">
            <Link to={"/panier"}>
              <FontAwesomeIcon icon={faBasketShopping} />
            </Link>
          </div>

          <div className="notif flex items-center justify-center p-2 cursor-pointer hover:text-red-500">
            <Link to={"/listesouhait"}>
              <FontAwesomeIcon icon={faHeart} />
            </Link>
          </div>
          <div className="notif flex items-center justify-center p-2 cursor-pointer">
            <FontAwesomeIcon icon={faBell} path="/Models" />
          </div>
          <div className="profile flex gap-1 md:gap-2 cursor-pointer items-center">
            <img
              className="w-6 h-6 md:w-12 rounded-full md:h-12"
              src={value.user.photoProfile}
              alt=""
            />
            <div className="text-sm">
              <h2>Josephine</h2>
              <p className="hidden">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
