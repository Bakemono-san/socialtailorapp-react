import { faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Discussion(props) {
    return (
        <div className='flex items-center'>
            <Link to={`/discussion/${props.id}`} className='flex items-center gap-4 w-full p-4'>
                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s"} alt="" className='rounded-full w-20 h-20 object-contain' />
                <div className='flex justify-between h-full border-b gap-6 p-2 border-gray-300 w-full'>
                    <div className='flex flex-col gap-4'>
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
