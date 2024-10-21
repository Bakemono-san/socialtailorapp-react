import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SidebarItem(props) {
  return (
    <Link
      to={props.path ?? '/'}
      className={`${props.className} ${props.active && 'bg-blue-500 text-white'} hover:bg-blue-100 hover:text-blue-600 transition-colors duration-300 ease-in-out flex-1 md:p-3 md:gap-5 cursor-pointer flex items-center rounded-lg`}
    >
      {
        props.icon
          ? <FontAwesomeIcon icon={props.icon} size="lg" className="text-blue-400" />
          : <img src={props.image} alt={props.image} className='rounded-lg w-12 h-12' />
      }
      <p className='hidden md:block font-medium'>{props.name}</p>
    </Link>
  );
}
