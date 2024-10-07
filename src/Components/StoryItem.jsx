import { faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function StoryItem() {
  return (
    <div className='rounded md:w-28 w-28 md:h-28 max-h-28 bg-blue-400/50 flex flex-col justify-between p-4 min-w-26'>
        <div>
            <FontAwesomeIcon icon={faSun} />
        </div>
        <div>
            Josephine water
        </div>
    </div>
  )
}
