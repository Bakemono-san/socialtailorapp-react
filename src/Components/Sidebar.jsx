
import React from 'react'
import SidebarItem from './SidebarItem'
import { faCog, faCoins, faHome, faMessage, faVest, faTrophy } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar(props) {
  return (
    <div className={props.color + ` md:py-8 flex md:flex-col md:gap-10 md:h-full lg:min-w-72 text-white md:rounded w-full min-h-12 border-t border-gray-300 shadow md:w-fit md:px-2`}>
      <div className='hidden md:block'>
        <SidebarItem icon={faHome} name="Home" path="/" />
      </div>
      <hr />
      <div className='flex-1 md:flex-col md:gap-8 justify-between md:justify-normal flex'>

        <SidebarItem icon={faTrophy} name="Ranking" path="/rang" />
        <SidebarItem icon={faHome} name="Home" path="/" className="sm:hidden" />
        <SidebarItem icon={faVest} name="Models" path="/Models" />
        <SidebarItem icon={faMessage} name="Discussion" path="/discussion" />
        <SidebarItem icon={faCoins} name="achatcredit" path="/achatcredit" />
        <SidebarItem icon={faCog} name="Params" path="/params" />
      </div>
    </div>
  );
}
