import React, { useContext, useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { faSearch, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../App";
import { Link } from "react-router-dom"; // Import de Link pour la redirection
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataHandler from "../DataHandler";

export default function Sidebar(props) {
  const [discussions,setDiscussions] = useState([]);

  useEffect(() => {
    DataHandler.getDatas("http://localhost:3004/user/discussions")
        .then((data) => {

            setDiscussions(data)
        })
        .catch((err) => { console.log(err) })
}, [])

  return (

    <div className={props.color + ` hidden md:flex md:py-4 md:px-5 md:flex-col md:gap-10 md:h-full text-white md:rounded w-full min-h-12 shadow md:w-fit tv:w-max  2xl:w-full`}>
      {/* <div className='hidden md:block bg-[#3b5999] rounded'>
        <SidebarItem icon={faSearch} path="/" />
      </div> */}


<Link to="/following" className="hidden md:block bg-[#3b5999] rounded">
        <FontAwesomeIcon icon={faUserFriends} />
        <span>Suivis</span>
      </Link>
      <hr />
      <Link to="/myFollowers" className="hidden md:block bg-[#3b5999] rounded p-4">
          <FontAwesomeIcon icon={faUserFriends} />
          <span>Followers</span>
        </Link>
      <hr />

      <div className='flex-1 md:flex-col md:gap-8 justify-between md:justify-normal flex'>
        <h1 className="text-center font-bold text-lg bg-[#3b5999] rounded py-1 px-4">Discussions</h1>
        {
          discussions.length > 0 && discussions.map((message, index) => {
            return <div className='tv:flex justify-between gap-4 items-center text-[#3b5999]  '>
              <SidebarItem key={message.Users_UsersDiscussions_receiverIdToUsers.id} image={message.Users_UsersDiscussions_receiverIdToUsers.photoProfile} path={`/discussion/${message.id}`} />
              <div className='max-w-32 truncate md:flex flex-col justify-between gap-2 hidden'>
                <p className="text-xl font-bold">{message.Users_UsersDiscussions_receiverIdToUsers.prenom}</p>
                <p>{message.Users_UsersDiscussions_receiverIdToUsers.nom}</p>
              </div>
            </div>
          
        })}
        {/* <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/1" className="sm:hidden" />
        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/2" />
        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/3" />
        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/4" />
        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/5" /> */}
      </div>
    </div>
  );
}
