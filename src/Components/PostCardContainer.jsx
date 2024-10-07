import React, { useRef, useState } from 'react'
import PostCard from './PostCard'
import { useContext } from 'react'
import { DataContext } from '../App'

export default function PostCardContainer() {
  const { value, setValue } = useContext(DataContext);

  const [posts,setPost] = useState(value.posts) ;
  return (
    <div className='flex justify-between flex-col w-full gap-10 md:pb-63 md:pb-0 md:px-0 pb-40  overflow-y-scroll'>
      {
        posts.map(

          (post) => {
            console.log(post, value.user);

           return <PostCard key={post.id} post={post} utilisateur={value.user} />
          }
        )
      }
      <PostCard materials={["aiguilles", "boutons", "damina"]} tissu={['getzner', 'ganila', 'percale']} />
      <PostCard materials={["aiguilles", "boutons", "damina"]} tissu={['percale', 'ndockette']} />
      <PostCard materials={["aiguilles", "boutons", "damina"]} tissu={['thioup', 'bazzin', 'facebook']} />
    </div>
  )
}
