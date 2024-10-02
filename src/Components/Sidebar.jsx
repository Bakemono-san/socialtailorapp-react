import React from 'react'
import SidebarItem from './SidebarItem'
import { faCog, faCoins, faComment, faHome, faVest } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar(props) {
  return (
    <div className={props.color+ ` md:py-8 md:px-4 flex md:flex-col md:gap-10 md:h-full text-white md:rounded fixed md:relative bottom-0 w-full min-h-12 border-t border-gray-300 shadow md:w-fit `}>
            <div className='flex-1 hidden md:block'>
                <SidebarItem icon={faHome} />
            </div>
            <hr />
            <div className='flex-1 md:flex-col md:gap-8 justify-between flex'>
                <SidebarItem icon={faHome} />
                <SidebarItem icon={faVest} />
                <SidebarItem icon={faComment} />
                <SidebarItem icon={faCoins} />
                <SidebarItem icon={faCog} />
            </div>

    </div>
  )
}
