import React, { useEffect, useState } from 'react'
import MessageItem from '../Components/MessageItem'
import DataHandler from '../DataHandler';
import { useParams } from 'react-router-dom';
import LocalStorage from '../Utils/LocalStorage';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

export default function DiscussionPage() {
  const { id: discussionId } = useParams();
  const [textos, setTextos] = useState([]);
  const [connectedUser, setConnectedUser] = useState(LocalStorage.get("userId"));
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const id = messages.length + 1;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'eqen5qg3');  // Remplacez par votre preset Cloudinary

    try {
      console.log(formData);

      // 1. Upload de l'image sur Cloudinary
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dhivn2ahm/image/upload`,
        formData
      );

      const imageUrl = uploadResponse.data.secure_url;
      setMessages([...messages, { content: newMessage, discussionId, senderId: 1, createdAt: `${new Date().getHours()}:${new Date().getMinutes()}`, id: id, file: imageUrl }])
      setNewMessage("");
      DataHandler.postData(`http://localhost:3004/user/discussions/${discussionId}/messages`, { messageContent: newMessage, file: imageUrl })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.error('Error sending message:', err);
        });
    } catch (err) {
      console.error(err)
    }

    // Logic to handle sending the message and file
  };

  return (
    <div className='flex flex-col justify-between h-full w-full'>
      <div className='flex flex-col gap-4 w-full h-full'>
        {textos && textos.Users_UsersDiscussions_receiverIdToUsers  && (
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

              const isSender = connectedUser === message.senderId;
              const color = isSender ? "bg-blue-400" : "bg-yellow-400";
              const position = isSender ? "left-2" : "self-end";
              return (
                <MessageItem
                  key={message.id}
                  color={color}
                  position={position}
                  message={message.content}
                  file={message.file}
                  heure={message.createdAt}
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
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <label htmlFor="image" className='flex items-center cursor-pointer'>
            <FontAwesomeIcon icon={faPaperclip} className='text-gray-500 w-6 h-6' />
          </label>
          {
            file &&
            <div className={`preview w-fit `} >
              <img src={URL.createObjectURL(file)} alt="preview" className='w-10 h-10 rounded-full object-cover' />
            </div>
          }
          <input
            type="file"
            name='image'
            id='image'
            className="file-input w-full max-w-xs hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  );

}
