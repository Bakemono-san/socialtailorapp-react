import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function SidebarItem(props) {
  return (
    <div className='bg-blue-700 md:bg-blue-400 md:p-4 flex-1 border-r border-blue-400 md:rounded flex items-center justify-center'>
        <FontAwesomeIcon icon={props.icon} />
    </div>
  )
}
