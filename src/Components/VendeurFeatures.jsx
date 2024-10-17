import React from 'react';
import ProfileCard from "./ProfileCard";


export default function VendeurFeatures() {
  return (
    <div className="space-y-6">
      {/* Catalogue de produits */}
      <ProfileCard title="Mon Catalogue">
        <button className="bg-purple-500 text-white px-4 py-2 rounded-md">Ajouter un produit</button>
        <p>Vous avez 12 produits dans votre catalogue.</p>
      </ProfileCard>

      {/* Suivi des ventes */}
      <ProfileCard title="Suivi des Ventes">
        <p>Vous avez vendu 15 articles ce mois-ci.</p>
      </ProfileCard>

      {/* Promotions */}
      <ProfileCard title="Promotions en cours">
        <p>Vous avez 2 promotions actives : -10% sur les tissus wax, -15% sur le satin de soie.</p>
      </ProfileCard>

      {/* Factures récentes */}
      <ProfileCard title="Mes Factures">
        <p>Facture n°12345 - 100.000 CFA - Payée le 12 Oct 2024</p>
        <p>Facture n°12346 - 200.000 CFA - En attente de paiement</p>
      </ProfileCard>
    </div>
  );
}
