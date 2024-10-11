import React, { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard'
import { useContext } from 'react'
import { DataContext } from '../App'
import DataHandler from '../DataHandler';

export default function PostCardContainer() {
  const { value, setValue } = useContext(DataContext);
  const [posts,setPost] = useState([]);


  useEffect(() => {
    DataHandler.getDatas('http://localhost:3004/post')
     .then(data => {
        setPost(data)
      })
     .catch(error => {
        console.error('Erreur lors de la récupération des posts :', error)
      })
  },[])

  return (
    <div className='flex justify-between flex-col w-full gap-10 md:pb-63 md:px-0 pb-40  overflow-y-scroll'>
      {
        posts.map(

          (post,index) => {

           return <PostCard key={post.id} post={post} utilisateur={post.Users} />
          }
        )
      }
    </div>
  )
}
