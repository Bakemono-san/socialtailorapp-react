import React from 'react';
import ProfileCard from "./ProfileCard";


export default function ClientFeatures() {
  return (
    <div className="space-y-6">
      {/* Historique des commandes */}
      <ProfileCard title="Mes Commandes">
        <p>Vous avez 2 commandes en cours.</p>
      </ProfileCard>

      {/* Avis laissés aux tailleurs */}
      <ProfileCard title="Mes Avis">
        <p>Avis laissé à John Tailleur : "Très satisfait du service, le costume est parfait !"</p>
      </ProfileCard>

      {/* Liste des tailleurs suivis */}
      <ProfileCard title="Tailleurs suivis">
        <p>Vous suivez 5 tailleurs.</p>
      </ProfileCard>

      {/* Messages avec les tailleurs */}
      <ProfileCard title="Mes Messages">
        <p>Vous avez 2 nouveaux messages de vos tailleurs.</p>
      </ProfileCard>
    </div>
  );
}
