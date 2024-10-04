import React from 'react'
import StoryContainer from '../Components/StoryContainer'
import PostCardContainer from '../Components/PostCardContainer'
import StatsCard from '../Components/StatsCard'
import Post from '../Components/Forms/Post'

export default function MainPage() {
  return (
    <main className="text-sm md:w-full flex flex-col gap-4 overflow-y-scroll px-4">
      <StoryContainer />
      <Post />  
      <div className='flex gap-4 overflow-scroll'>
        <PostCardContainer />
        <StatsCard title="Stats"/>
      </div>
    </main>
  )
}
