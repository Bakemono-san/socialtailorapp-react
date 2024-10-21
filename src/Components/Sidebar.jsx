import React from 'react';
import ProfileItem from './ProfileItem';
import SidebarItem from './SidebarItem';
import { faCog, faCoins, faHome, faMessage, faVest, faTrophy, faBell } from '@fortawesome/free-solid-svg-icons'; // Ajoutez faBell ici
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

export default function Sidebar(props) {
  const items = [
    { icon: faTrophy, name: "Ranking", path: '/rang' },
    { icon: faVest, name: "Models", path: '/models' },
    { icon: faMessage, name: "Discussion", path: '/discussion' },
    { icon: faCoins, name: "Achat Credit", path: '/achatcredit' },
    { icon: faCog, name: "Params", path: '/params' },
    { icon: faNewspaper, name: "Article", path: '/article' },
    { icon: faBell, name: "Notifications", path: '/notifications' }, // Ajoutez cette ligne
  ];

  const location = useLocation();

  return (
    <div className={`bg-white bg-opacity-90 shadow-lg md:py-6 flex md:flex-col md:gap-6 md:h-full lg:min-w-64 text-gray-700 md:rounded-lg w-full min-h-12 border border-gray-300 md:w-fit md:px-4`}>
      <div className='hidden md:block'>
        <SidebarItem icon={faHome} name="Home" path="/" active={location.pathname === '/'} />
      </div>
      <hr className="border-gray-300" />
      <div className='flex-1 md:flex-col md:gap-6 justify-between md:justify-normal flex'>
        {
          items.map((link) => (
            <SidebarItem
              key={link.name}
              icon={link.icon}
              name={link.name}
              path={link.path}
              active={location.pathname === link.path}
            />
          ))
        }
        <ProfileItem
          profilePicture="https://via.placeholder.com/150"
          name="Mon profile"
          path="/profile"
        />
      </div>
    </div>
  );
}
