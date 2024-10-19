import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ParamButton() {
    return (
        <div className='absolute bottom-6 right-6 bg-white rounded-full md:w-12 md:h-12 flex items-center justify-center cursor-pointer shadow-lg shadow-black'>
            <Link to={'/params'}>
                <FontAwesomeIcon icon={faCog} size='lg' />
            </Link>
        </div>
    )
}
