import React, { useEffect, useState } from 'react'
import Discussion from '../Components/Discussion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { DataContext } from '../App'
import DataHandler from '../DataHandler'

export default function ListDiscussion() {
    const { value, setDiscussion } = useContext(DataContext)

    const [discussions, setDiscussions] = useState([])

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
        <div className='w-full h-full'>
            <div className='p-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Discussions</h1>
                <button className='btn btn-success text-white'>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className='overflow-y-scroll h-full pb-14'>
                {
                    discussions.map((message, index) => {

                        return <Discussion key={message.Users_UsersDiscussions_receiverIdToUsers.id} id={message.id} profile={message.Users_UsersDiscussions_receiverIdToUsers.photoProfile} />
                    }
                    )
                }
            </div>
        </div>
    )
}
