import React from 'react'
import StoryContainer from '../Components/StoryContainer'
import PostCardContainer from '../Components/PostCardContainer'
import StatsCard from '../Components/StatsCard'
import Post from '../Components/Forms/Post'

export default function MainPage() {
  return (
    <main className="md:px-4 md:container flex flex-col gap-4 overflow-y-scroll">
      <StoryContainer />
      <Post />  
      <div className='flex gap-4'>
        <PostCardContainer />
        <StatsCard title="Stats"/>
      </div>
    </main>
  )
}
