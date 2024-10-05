import React from "react";
import SidebarItem from "./SidebarItem";
import {
  faCog,
  faCoins,
  faHome,
  faMessage,
  faVest,
  faTrophy
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar(props) {
  return (
    <div
      className={
        props.color +
        ` md:py-8 md:px-4 flex md:flex-col md:gap-10 md:h-full text-white md:rounded fixed md:relative bottom-0 w-full min-h-12 border-t border-gray-300 shadow md:w-fit `
      }
    >
      <div className="flex-1 hidden md:block">
        <SidebarItem icon={faHome} path="/" />
      </div>
      <hr />
      <div className="flex-1 md:flex-col md:gap-8 justify-between flex">
        <Link to="/rang">
          <FontAwesomeIcon
            icon={faTrophy}
            className="bg-blue-700 md:bg-blue-400 md:p-4 cursor-pointer flex-1 border-r border-blue-400 md:rounded flex items-center justify-center"
          />
        </Link>

        <SidebarItem icon={faVest} path="/Models" />
        <SidebarItem icon={faMessage} path="/discussion" />
        <SidebarItem icon={faCoins} path="/Charger-credit" />
        <SidebarItem icon={faCog} path="/params" />
      </div>
    </div>
  );
}
