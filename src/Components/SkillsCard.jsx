import React from 'react';
import ProfileCard from "./ProfileCard";



export default function SkillsCard({ skills }) {
  return (
    <ProfileCard title="Skills & Endorsements">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {skill}
          </span>
        ))}
      </div>
    </ProfileCard>
  );
}
