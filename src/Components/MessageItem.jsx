import React from 'react'

export default function MessageItem({color,position}) {

    return (
        <div className={`${color} ${position} relative px-2 py-4 w-fit rounded max-w-60 sm:max-w-sm md:max-w-72 lg:max-w-lg xl:max-w-xl`}>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero fugiat magni delectus culpa?</p>
        </div>
    )
}
