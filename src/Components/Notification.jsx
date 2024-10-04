import { faBell, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Notification() {
    return (
        <div className="dropdown notif justify-center p-2">
            <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-none text-white hover:text-red-500 hover:bg-transparent flex items-center">
                <FontAwesomeIcon icon={faBell} className='md:w-6 md:h-6  rounded-full' />
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-gray-400 rounded z-[1] w-52 p-2 shadow ">
                <li className='border-b border-white p-1 '>
                    <div className='flex justify-between w-full'>
                        <p>Notification 1</p>
                        <FontAwesomeIcon icon={faXmark} className='hover:text-red-500 p-2' onClick={() => console.log('close')} />
                    </div>
                </li>
                <li className='border-white p-1 '>
                    <div className='flex justify-between w-full'>
                        <p>Notification 2</p>
                        <FontAwesomeIcon icon={faXmark} className='hover:text-red-500 p-2' onClick={() => console.log('close')} />
                    </div>
                </li>
            </ul>
        </div>
    )
}
