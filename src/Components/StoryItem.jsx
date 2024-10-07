import { faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function StoryItem(props) {
  return (
    <div className='rounded !w-28 max-h-28 bg-blue-400/50 flex flex-col justify-between p-4  cursor-pointer hover:text-white text-transparent' style={{ backgroundImage: `url(${props.bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={props.onClick}>
        <div>
            <FontAwesomeIcon icon={faSun} className='text-white'/>
        </div>
        <p className=' text-center overflow-hidden font-semibold '>
            {props.title}
        </p>
    </div>
  )
}

