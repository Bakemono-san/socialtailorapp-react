import React from 'react';
import ProfileCard from "./ProfileCard";

export default function TailleurFeatures() {
  return (
    <div className="space-y-6">
      {/* Notifications */}
      <ProfileCard title="Mes Notifications">
        <p>Vous avez 3 nouvelles notifications.</p>
      </ProfileCard>

      {/* Achats de crédit */}
      <ProfileCard title="Achats de Crédits">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">Acheter des crédits</button>
      </ProfileCard>

      {/* Classement des tailleurs */}
      <ProfileCard title="Mon Classement">
        <p>Votre classement : <span className="font-bold">#5</span> sur 50 tailleurs</p>
        <p>Note moyenne : <span className="font-bold">4.8/5</span></p>
      </ProfileCard>

      {/* Liste des postes publiés */}
      <ProfileCard title="Mes Publications">
        <div className="space-y-4 max-h-60 overflow-y-scroll">
          <PostCard content="Nouvelle création : Costume trois-pièces sur mesure." date="12 Oct 2024" />
          <PostCard content="J'organise une promo spéciale pour les mariages !" date="10 Oct 2024" />
          <PostCard content="Mes dernières créations pour le Dakar Fashion Show." date="5 Oct 2024" />
        </div>
      </ProfileCard>
    </div>
  );
}

function PostCard({ content, date }) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <p>{content}</p>
      <p className="text-gray-500 text-sm">{date}</p>
    </div>
  );
}
