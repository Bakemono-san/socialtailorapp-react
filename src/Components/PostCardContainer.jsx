import React from 'react'
import PostCard from './PostCard'

export default function PostCardContainer() {
  return (
    <div className='flex justify-between flex-col w-full gap-10 md:pb-63 md:pb-0 md:px-0 pb-40  overflow-y-scroll'>
        <PostCard materials={["aiguilles","boutons","damina"]} tissu={['getzner', 'ganila', 'percale']} />
        <PostCard materials={["aiguilles","boutons","damina"]} tissu={['percale', 'ndockette']} />
        <PostCard materials={["aiguilles","boutons","damina"]} tissu={['thioup', 'bazzin', 'facebook']} />
    </div>
  )
}
