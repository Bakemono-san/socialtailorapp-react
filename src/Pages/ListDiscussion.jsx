import React, { useEffect, useState } from 'react'
import Discussion from '../Components/Discussion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { DataContext } from '../App'
import DataHandler from '../DataHandler'
import LocalStorage from '../Utils/LocalStorage'
import ModalResponse from '../Components/Modals/ModalResponse'


const UserSelectionComponent = ({ setSelectedUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        DataHandler.getDatas("http://localhost:3004/following")
            .then((data) => {
                console.log(data);
                
                setUsers(data.followings)
            })
            .catch((err) => { console.log(err) })
    }, [])

    return (
        <div className='flex flex-wrap gap-4 bg-black/75 h-full w-fit justify-center p-4' >
            {users.length > 0 && users.map((user) => {
                return <div key={user.Users_Followers_followerIdToUsers.id}>
                    <div className='rounded-full shadow-md flex items-center cursor-pointer hover:animate-pulse' onClick={() => setSelectedUser(user.Users_Followers_followerIdToUsers)}>
                        <img src={user.Users_Followers_followerIdToUsers.photoProfile} alt={user.Users_Followers_followerIdToUsers.name} className='w-12 h-12 rounded-full' />
                        <span>{user.Users_Followers_followerIdToUsers.name}</span>
                    </div>
                </div>
            })}
        </div>
    )
}

export default function ListDiscussion() {
    // const [users,setUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [discussions, setDiscussions] = useState([])
    const [openSlider,setOpenSlider] = useState(null)
    const [error,setError] = useState(null)

    const createDiscussion = (receiver) => {
        const newId = discussions.length > 0 ? discussions[discussions.length - 1].id + 1 : 1;
    
        DataHandler.postData("http://localhost:3004/user/discussions/create", { receiverId: receiver.id })
            .then((data) => {
                console.log(data);
                setDiscussions([...discussions, {
                    id: newId,
                    receiverId: receiver.id,
                    userId: LocalStorage.get("userId"),
                    Users_UsersDiscussions_receiverIdToUsers: receiver,
                    Users_UsersDiscussions_userIdToUsers: LocalStorage.get("user"),
                    UsersDiscussionsMessages: []
                }]);
            })
            .catch((error) => {
                setError(error.response.data.message)
                console.error(error.response.data.message);
            });
    
    };
    

    useEffect(() => {
        if (selectedUser) {
            createDiscussion(selectedUser);
            setOpenSlider(null)
        }
    }, [selectedUser]);
        
    

    useEffect(() => {
        DataHandler.getDatas("http://localhost:3004/user/discussions")
            .then((data) => {
                console.log(data);

                setDiscussions(data)
            })
            .catch((err) => { console.log(err) })
    }, [])

    // const discussions = DataHandler.getDatas("http://localhost:3004/user/discussions").then((data) => { return data }).catch((err) => { console.log(err) });
    // console.log(discussions);


    return (
        <div className='w-full h-full relative flex'>
            {error && <ModalResponse message={error} />}
            <div className='w-full'>

                <div className='p-4 flex justify-between items-center'>
                    <h1 className='text-2xl font-bold'>Discussions</h1>
                    <button className='btn btn-success text-white' onClick={() => setOpenSlider(true)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <div className='overflow-y-scroll h-full pb-14'>
                    {
                        discussions.map((message, index) => {

                            return <Discussion key={message.Users_UsersDiscussions_receiverIdToUsers.id} id={message.id} profile={message.Users_UsersDiscussions_receiverIdToUsers.photoProfile} prenom={message.Users_UsersDiscussions_receiverIdToUsers.prenom} nom={message.Users_UsersDiscussions_receiverIdToUsers.nom} />
                        }
                        )
                    }
                </div>
            </div>
            {
                openSlider && 
            <UserSelectionComponent setSelectedUser={setSelectedUser} />
            }
        </div>
    )
}
