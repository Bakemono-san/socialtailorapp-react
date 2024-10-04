import React from 'react'
import Discussion from '../Components/Discussion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ListDiscussion() {
    return (
        <div className='w-full'>
            <div className='p-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Discussions</h1>
                <button className='btn btn-success text-white'>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className='overflow-y-scroll h-full'>
                <Discussion id="1" />
                <Discussion id="2" />
                <Discussion id="3" />
                <Discussion id="3" />
                <Discussion id="3" />
                <Discussion id="3" />
                <Discussion id="3" />
                <Discussion id="3" />
                <Discussion id="3" />
                <Discussion id="3" />
                <Discussion id="3" />
                <Discussion id="3" />
            </div>
        </div>
    )
}
