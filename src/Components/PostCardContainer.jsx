import React from 'react'
import PostCard from './PostCard'

export default function PostCardContainer() {
  return (
    <div className='flex justify-between flex-col w-full gap-10 px-4 md:px-0 overflow-y-scroll'>
        <PostCard materials={["aiguilles","boutons","damina"]} tissu={['getzner', 'ganila', 'percale']} />
        <PostCard materials={["aiguilles","boutons","damina"]} tissu={['percale', 'ndockette']} />
        <PostCard materials={["aiguilles","boutons","damina"]} tissu={['thioup', 'bazzin', 'facebook']} />
    </div>
  )
}
