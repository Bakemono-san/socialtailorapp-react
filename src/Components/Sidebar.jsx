
import React from 'react'
import ProfileItem from './ProfileItem';  
import SidebarItem from './SidebarItem'
import { faCog, faCoins, faHome, faMessage, faVest, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

export default function Sidebar(props) {
  const items = [
    {icon: faTrophy, name:"Ranking" , path:'/rang' },
    // {icon: faHome, name:"Home" , path:'/'},
    {icon: faVest, name:"Models" , path:'/Models'},
    {icon: faMessage, name:"Discussion" , path:'/discussion'},
    {icon: faCoins, name:"achatcredit" , path:'/achatcredit'},
    {icon: faNewspaper, name:"Article" , path:'/article'},
    {icon: faUser, name:"Tailleurs" , path:'/tailleurs'},
        
  ]
  const location = useLocation();

  return (
    <div className={props.color + ` bg-[#3b5999] md:py-8 flex md:flex-col md:gap-10 md:h-full lg:min-w-72 text-white md:rounded w-full min-h-12 border-t border-gray-300 shadow md:w-fit md:px-2`}>
      <div className='hidden md:block'>
        <SidebarItem icon={faHome} name="Home" path="/" active={location.pathname === '/' }/>
      </div>
      <hr />
      <div className='flex-1 md:flex-col md:gap-8 justify-between md:justify-normal flex'>

        {
          items.map((link) => {
            return <SidebarItem icon={link.icon} name={link.name} path={link.path} active={location.pathname === link.path} />
          })
        }
<ProfileItem 
          profilePicture="https://via.placeholder.com/150" 
          name="Mon profile" path="/profile"/>
      </div>
    </div>
  );
}
