import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Discussion(props) {
    return (
        <div className='flex items-center px-4'>
            <Link to={`/discussion/${props.id}`} className='flex items-center gap-4 w-full p-4'>
                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s"} alt="" className='rounded-full md:w-20 md:h-20 w-16 h-16 object-contain' />
                <div className='flex justify-between h-full border-b md:gap-6 gap-2 p-2 border-gray-300 w-full'>
                    <div className='flex flex-col md:gap-4 gap-2'>
                        <h1 className='text-xl font-semibold'>Username</h1>
                        <p>il y'a 10 jours</p>
                    </div>
                </div>
            </Link>
            <div>
                <button className='btn text-white bg-red-500 rounded-full flex w-fit'>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}
