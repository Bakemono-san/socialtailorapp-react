import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SidebarItem(props) {
  return (
    <Link to={props.path ?? '/'} className={`${props.className} ${props.icon ? 'bg-blue-700 hover:bg-blue-600 md:p-4 md:gap-8': 'md:bg-transparent' }  cursor-pointer flex-1 md:rounded flex items-center max-h-16 gap-1 md:justify-start justify-center`}>
      {
        props.icon ? <FontAwesomeIcon icon={props.icon} /> : <img src={props.image} alt={props.image} className='rounded-lg w-16 h-14'/>
      }
        
        <p className='hidden md:block'>{props.name}</p>
    </Link>
  )
}
