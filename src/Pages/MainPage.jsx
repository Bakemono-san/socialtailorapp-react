import React from 'react';
import StoryContainer from '../Components/StoryContainer';
import PostCardContainer from '../Components/PostCardContainer';
import StatsCard from '../Components/StatsCard';
import Post from '../Components/Forms/Post';
import TailorList from '../Components/TailorList';

export default function MainPage() {
  return (
    <main className="text-sm md:w-full flex flex-col md:gap-8 h-full max-w-6xl">
      <StoryContainer stories={[]} />
      <div className='flex gap-4 h-full 2xl:gap-12'>
        <div className='flex flex-col gap-4 h-full w-full'>
          <Post />
          <PostCardContainer />
        </div>
        <div className='flex flex-col gap-4 h-full w-full'>
          <StatsCard title="Stats" />
          <TailorList />
        </div>
      </div>
    </main>
  );
}
