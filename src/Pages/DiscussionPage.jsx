import React, { useRef, useState } from 'react'
import MessageItem from '../Components/MessageItem'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../App';

export default function DiscussionPage() {
  const params = useParams();

  const {value , setValue} = useContext(DataContext);

  const [messages,setMessage] = useState(value.message[params.id].UsersDiscussionsMessages);

  const connectedUser = useRef(value.user.id);

  return (
    <div className='flex flex-col justify-between h-full w-full'>
      <div className='flex flex-col gap-4  w-full h-full'>
        <div>
          <h1 className='lg:text-2xl hidden font-bold'>Discussion</h1>
          <div className='flex items-center gap-4 w-full lg:p-4 p-2 bg-white'>
            <img src={value.message[params.id].Users_UsersDiscussions_receiverIdToUsers.photoProfile} alt="" className='rounded-full w-12 h-12 lg:w-20 lg:h-20 object-cover' />
            <h2 className='text-2xl'>Username {params.id}</h2>
          </div>
        </div>
        <div className='flex flex-col gap-2 md:gap-4 w-full overflow-y-scroll h-full'>

        {
          messages.map(
            (message) => {
              const color = connectedUser.current === message.senderId ? "bg-blue-400" : "bg-yellow-400";
              const position = connectedUser.current === message.senderId? "left-2" : "self-end";
             return <MessageItem color={color} position={position} message={message.content} />
            }
          )
        }
        </div>
        <form className='flex gap-4 p-2 bg-gray-100 md:bg-transparent md:mx-2'>
          <input type="text" name='message' placeholder="Message" className="input input-bordered w-full" />
          <input type="file" name='image' className="file-input w-full max-w-xs" />
          <button className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  )
}
