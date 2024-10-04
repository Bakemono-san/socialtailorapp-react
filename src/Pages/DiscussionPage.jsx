import React from 'react'
import MessageItem from '../Components/MessageItem'
import { useParams } from 'react-router-dom';

export default function DiscussionPage() {
  const params = useParams();


  return (
    <div className='flex flex-col justify-between h-full w-full'>
      <div className='flex flex-col gap-4 p-4 w-full'>
        <div>
          <h1 className='text-2xl font-bold'>Discussion</h1>
          <div className='flex items-center gap-4 w-full p-4 bg-white rounded-lg'>
            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s"} alt="" className='rounded-full w-20 h-20 object-contain' />
            <h2 className='text-2xl'>Username {params.id}</h2>
          </div>
        </div>
        <div className='flex flex-col gap-4 w-full overflow-scroll'>

        <MessageItem color={'bg-blue-400'} position={'left-2'} />
        <MessageItem color={'bg-blue-400'} position={'left-2'} />
        <MessageItem color={'bg-blue-400'} position={'left-2'} />
        <MessageItem color={'bg-blue-400'} position={'left-2'} />
        <MessageItem color={'bg-blue-400'} position={'left-2'} />
        <MessageItem color={'bg-blue-400'} position={'left-2'} />
        <MessageItem color={'bg-blue-400'} position={'left-2'} />
        <MessageItem color={'bg-yellow-400'} position={'self-end'} />
        <MessageItem color={'bg-blue-400'} position={'left-2'} />
        <MessageItem color={'bg-yellow-400'} position={'self-end'} />
        </div>
      </div>
      <form className='flex gap-4 p-2 bg-gray-300 md:bg-transparent mx-2'>
        <input type="text" name='message' placeholder="Message" className="input input-bordered w-full" />
        <input type="file" name='image' className="file-input w-full max-w-xs" />
        <button className="btn btn-primary">Send</button>
      </form>
    </div>
  )
}
