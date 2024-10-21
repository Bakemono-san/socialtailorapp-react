// Components/Sidebar.js
import React, { useContext } from "react";
import SidebarItem from "./SidebarItem";
import { faSearch, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../App";
import { Link } from "react-router-dom"; // Import de Link pour la redirection
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar(props) {
  const { value, setDiscussion } = useContext(DataContext);

  return (
    <div className={`${props.color} bg-white hidden md:flex md:py-6 md:px-4 flex-col gap-8 h-full text-white shadow-lg rounded-md md:w-24 lg:w-1/4 2xl:w-1/6 transition-all duration-300`}>
      {/* Section de recherche */}
      <div className="hidden md:flex items-center justify-center bg-blue-600 p-3 rounded-full hover:bg-blue-500 transition-colors duration-300">
        <SidebarItem icon={faSearch} path="/" className="text-xl text-white" />
      </div>

      {/* Section Followers */}
      <Link to="/myFollowers" className="hidden md:flex items-center justify-center bg-blue-600 p-3 rounded-full hover:bg-blue-500 transition-colors duration-300">
        <FontAwesomeIcon icon={faUserFriends} className="text-xl text-white" />
        <span className="ml-2 text-sm text-white hidden lg:block">Followers</span>
      </Link>

      {/* Ligne de séparation */}
      <hr className="border-gray-200 w-full" />

      {/* Liste des discussions */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
        {value.message.map((message, index) => (
          <div key={index} className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-md transition-all duration-300">
            {/* Image de profil */}
            <SidebarItem
              key={message.Users_UsersDiscussions_receiverIdToUsers.id}
              image={message.Users_UsersDiscussions_receiverIdToUsers.photoProfile}
              path={`/discussion/${message.id}`}
              className="w-10 h-10 rounded-full object-cover shadow-md"
            />
            {/* Nom de l'utilisateur */}
            <p className="text-lg font-semibold text-gray-800 truncate max-w-xs">{message.Users_UsersDiscussions_receiverIdToUsers.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
