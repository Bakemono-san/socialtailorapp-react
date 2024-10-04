import React from 'react'
import StoryContainer from '../Components/StoryContainer'
import PostCardContainer from '../Components/PostCardContainer'

export default function MainPage() {
  return (
    <main className="md:px-4 md:container flex flex-col gap-4 overflow-y-scroll">
          <StoryContainer />
          <PostCardContainer/>
        </main>
  )
}
