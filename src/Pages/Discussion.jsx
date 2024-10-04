import React from 'react'
import MessageItem from '../Components/MessageItem'

export default function Discussion() {
  return (
    <div className='flex flex-col gap-4 w-full p-4 h-screen'>
        <MessageItem color={'bg-blue-400'} position={'left-2'} />
        <MessageItem color={'bg-yellow-400'} position={'self-end'} />
        <MessageItem color={'bg-blue-400'} position={'left-2'} />
        <MessageItem color={'bg-yellow-400'} position={'self-end'} />
    </div>
  )
}
