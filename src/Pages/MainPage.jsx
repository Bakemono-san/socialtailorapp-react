import React, { useState } from 'react';
import StoryContainer from '../Components/StoryContainer';
import PostCardContainer from '../Components/PostCardContainer';
import StatsCard from '../Components/StatsCard';
import Post from '../Components/Forms/Post';
import TailorList from '../Components/TailorList';

export default function MainPage() {
  const initialTailors = [
    {
      id: 1,
      name: "Alioune Ndiaye",
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
     
    },
    {
      id: 2,
      name: "Fatou Diop",
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
 
    },
    {
      id: 3,
      name: "Moussa Ba",
      photo: "https://randomuser.me/api/portraits/men/3.jpg",
  
    },
    {
      id: 4,
      name: "Awa Sarr",
      photo: "https://randomuser.me/api/portraits/women/4.jpg",
    
    },
    {
      id: 5,
      name: "Cheikh Sow",
      photo: "https://randomuser.me/api/portraits/men/5.jpg",
     
    },
  ];

  const [tailors] = useState(initialTailors);

  return (
    <main className="text-sm md:w-full flex flex-col md:gap-8 h-full">
      <StoryContainer stories={[]} />
      <div className='flex flex-col md:flex-row gap-4 h-full'>
        <div className='flex flex-col gap-4 h-full w-full md:w-2/3'>
          <Post />
          <PostCardContainer />
        </div>
        <div className='flex flex-col gap-4 h-full w-full md:w-1/3'>
          <StatsCard title="Stats" />
          <TailorList tailors={tailors} />
        </div>
      </div>
    </main>
  );
}
