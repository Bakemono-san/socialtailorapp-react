import React from 'react'
import StoryContainer from '../Components/StoryContainer'
import PostCardContainer from '../Components/PostCardContainer'
import StatsCard from '../Components/StatsCard'
import Post from '../Components/Forms/Post'
import { useContext } from 'react'
import { DataContext } from '../App'

export default function MainPage() {
  const { value, setValue } = useContext(DataContext);

  return (
    <main className="text-sm md:w-full flex flex-col md:gap-8 h-full">
      <StoryContainer stories={value.stories} />
      <div className='flex gap-4 h-full'>
        <div className='flex flex-col gap-4 h-full w-full'>
          <Post />
          <PostCardContainer />
        </div>
        <div className='flex flex-col gap-4 h-full'>

          <StatsCard title="Stats" />
        </div>
      </div>
    </main>
  )
}
