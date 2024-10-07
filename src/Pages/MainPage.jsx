import React from 'react'
import StoryContainer from '../Components/StoryContainer'
import PostCardContainer from '../Components/PostCardContainer'
import StatsCard from '../Components/StatsCard'
import Post from '../Components/Forms/Post'

export default function MainPage() {
  return (
    <main className="text-sm md:w-full flex flex-col md:gap-8 h-full">
      <StoryContainer />
      <div className='flex gap-4 h-full'>
        <div className='flex flex-col gap-4 h-full w-full'>
          <Post />
          <PostCardContainer />
        </div>
        <StatsCard title="Stats" />
      </div>
    </main>
  )
}
