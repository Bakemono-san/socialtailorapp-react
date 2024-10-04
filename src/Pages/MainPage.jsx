import React from 'react'
import StoryContainer from '../Components/StoryContainer'
import PostCardContainer from '../Components/PostCardContainer'
import StatsCard from '../Components/StatsCard'
import Post from '../Components/Forms/Post'

export default function MainPage() {
  return (
    <main className="text-sm md:w-full flex flex-col gap-8 overflow-y-scroll ">
      <StoryContainer />
      <div className='flex gap-4'>
        <div className='flex flex-col gap-4 overflow-scroll w-full'>
          <Post />
          <PostCardContainer />
        </div>
        <StatsCard title="Stats" />
      </div>
    </main>
  )
}
