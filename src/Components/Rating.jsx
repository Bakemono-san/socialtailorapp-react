import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export default function Rating() {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingClick = (index) => {
    setSelectedRating(index + 1);
  };

  return (
    <div>
      <span className='stars'>
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            onClick={() => handleRatingClick(index)}
            style={{ color: index < selectedRating ? 'yellow' : 'gray', cursor: 'pointer' }}
          />
        ))}
      </span>
    </div>
  )
}
