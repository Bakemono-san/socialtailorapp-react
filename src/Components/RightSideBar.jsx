import React, { useContext } from "react";
import SidebarItem from "./SidebarItem";
import { faSearch, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../App";
import { Link } from "react-router-dom"; // Import de Link pour la redirection
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar(props) {
  const { value, setDiscussion } = useContext(DataContext);

  return (
    <div className={props.color + `  bg-white hidden md:flex md:py-4 md:px-5 md:flex-col md:gap-10 md:h-full text-white md:rounded w-full min-h-12 shadow md:w-24 tv:w-max tv:bg-blue-400 2xl:w-full`}>
      <div className='hidden md:block bg-[#3b5999] rounded'>
        <SidebarItem icon={faSearch} path="/" />
      </div>

      <Link to="/myFollowers" className="hidden md:block bg-[#3b5999] rounded">
          <FontAwesomeIcon icon={faUserFriends} />
          <span>Followers</span>
        </Link>
      <hr />

      <div className='flex-1 md:flex-col md:gap-8 justify-between md:justify-normal flex'>
        {
          value.message.map((message, index) => {
            return <div className='tv:flex justify-between gap-4  items-center tv:gap-8'>
              <SidebarItem key={message.Users_UsersDiscussions_receiverIdToUsers.id} image={message.Users_UsersDiscussions_receiverIdToUsers.photoProfile} path={`/discussion/${message.id}`} />
              <p className='max-w-32 truncate text-xl'>Moustapha diagne</p>
            </div>
          }
          )
        }
        {/* <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/1" className="sm:hidden" />
        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/2" />
        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/3" />
        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/4" />
        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/5" /> */}
      </div>
    </div>
  );
}

