import React from 'react'

export default function MessageItem({color,position,message}) {

    return (
        <div className={`${color} ${position} relative px-2 py-4 w-fit rounded max-w-60 sm:max-w-sm md:max-w-72 lg:max-w-lg xl:max-w-xl`}>
            <p>{message}</p>
        </div>
    )
}

