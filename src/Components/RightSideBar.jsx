
import React from 'react'
import SidebarItem from './SidebarItem'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar(props) {
  return (
    <div className={props.color + ` hidden md:flex md:py-4 md:px-5 md:flex-col md:gap-10 md:h-full text-white md:rounded w-full min-h-12 shadow md:w-24`}>
      <div className='hidden md:block'>
        <SidebarItem icon={faSearch} path="/" />
      </div>
      <hr />
      <div className='flex-1 md:flex-col md:gap-8 justify-between md:justify-normal flex'>

        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/1" className="sm:hidden" />
        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/2" />
        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/3" />
        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/4" />
        <SidebarItem image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s'} path="/discussion/5" />
      </div>
    </div>
  );
}
