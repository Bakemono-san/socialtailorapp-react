import React, { useEffect, useState } from 'react'
import MessageItem from '../Components/MessageItem'
import DataHandler from '../DataHandler';
import { useParams } from 'react-router-dom';

export default function DiscussionPage() {
  const { id: discussionId } = useParams();
  const [textos, setTextos] = useState([]);
  const [connectedUser, setConnectedUser] = useState(1);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    DataHandler.getDatas(`http://localhost:3004/user/discussion/${discussionId}`)
      .then(data => {
        setTextos(data);
        setMessages(data.UsersDiscussionsMessages);
      })
      .catch(err => {
        console.error('Error fetching discussion data:', err);
      });

    // DataHandler.getDatas("http://localhost:3004/getConnectedUser")
    //   .then(data => {
    //     setConnectedUser(data);
    //   })
    //   .catch(err => {
    //     console.error('Error fetching connected user:', err);
    //   });
  }, [discussionId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Logic to handle sending the message and file
    console.log("Sending message:", newMessage, "with file:", file);
  };

  return (
    <div className='flex flex-col justify-between h-full w-full'>
      <div className='flex flex-col gap-4 w-full h-full'>
        {textos && textos.Users_UsersDiscussions_receiverIdToUsers && (
          <div>
            <h1 className='lg:text-2xl hidden font-bold'>Discussion</h1>
            <div className='flex items-center gap-4 w-full lg:p-4 p-2 bg-white'>
              <img 
                src={textos.Users_UsersDiscussions_receiverIdToUsers.photoProfile} 
                alt="" 
                className='rounded-full w-12 h-12 lg:w-20 lg:h-20 object-cover' 
              />
              <h2 className='text-2xl'>
                {`${textos.Users_UsersDiscussions_receiverIdToUsers.prenom} ${textos.Users_UsersDiscussions_receiverIdToUsers.nom}`}
              </h2>
            </div>
          </div>
        )}
        
        <div className='flex flex-col gap-2 md:gap-4 w-full overflow-y-scroll h-full'>
          {messages.length > 0 ? (
            messages.map((message) => {
              const isSender = connectedUser.id === message.senderId;
              const color = isSender ? "bg-blue-400" : "bg-yellow-400";
              const position = isSender ? "left-2" : "self-end";
              return (
                <MessageItem 
                  key={message.id} 
                  color={color} 
                  position={position} 
                  message={message.content} 
                />
              );
            })
          ) : (
            <p>No messages yet.</p>
          )}
        </div>
  
        <form className='flex gap-4 p-2 bg-gray-100 md:bg-transparent md:mx-2' onSubmit={handleSendMessage}>
          <input 
            type="text" 
            name='message' 
            placeholder="Message" 
            className="input input-bordered w-full" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <input 
            type="file" 
            name='image' 
            className="file-input w-full max-w-xs" 
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  );
  
}
