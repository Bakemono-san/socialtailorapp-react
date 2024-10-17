import React, { useState, useContext } from 'react';
import StoryContainer from '../Components/StoryContainer';
import PostCardContainer from '../Components/PostCardContainer';
import StatsCard from '../Components/StatsCard';
import Post from '../Components/Forms/Post';
import TailorList from '../Components/TailorList';
import { DataContext } from '../App'; // Ajout de DataContext

export default function MainPage() {
  const { value = {} } = useContext(DataContext);
  const stories = value.stories || [];

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
    <main className="text-sm md:w-full flex flex-col md:gap-8 h-full max-w-6xl">
      <StoryContainer stories={stories} /> 
      <div className='flex gap-4 h-full 2xl:gap-12'>
        <div className='flex flex-col gap-4 h-full w-full'>
          <Post />
          <PostCardContainer />
        </div>
        <div className='flex-col gap-4 h-full w-full hidden lg:flex'>
          <StatsCard title="Stats" />
          <TailorList tailors={tailors} />
        </div>
      </div>
    </main>
  );
}
