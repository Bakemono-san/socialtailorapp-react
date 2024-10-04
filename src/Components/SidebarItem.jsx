import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SidebarItem(props) {
  return (
    <Link to={props.path ?? '/'} className='bg-blue-700 md:bg-blue-400 md:p-4 cursor-pointer flex-1 border-r border-blue-400 md:rounded flex items-center justify-center'>
        <FontAwesomeIcon icon={props.icon} />
    </Link>
  )
}
