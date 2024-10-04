import React, { useState } from 'react';

export default function ListeSouhaits() {
  const [wishList] = useState([
    { id: 1, nom: 'Produit 1', prix: 29.99, image: 'https://www.boutiquesenegal.com/public/public/storage/article/1666978472.jpg' },
    { id: 2, nom: 'Produit 2', prix: 49.99, image: 'https://www.boutiquesenegal.com/public/public/storage/article/1666978472.jpg' },
    { id: 3, nom: 'Produit 3', prix: 19.99, image: 'https://www.boutiquesenegal.com/public/public/storage/article/1666978472.jpg' }
  ]);

  const handleCommander = (item) => {
    // Logique pour gérer la commande
    console.log(`Commande passée pour ${item.nom} au prix de ${item.prix}€`);
  };

  return (
    <div className="p-6 mx-4 w-full bg-gradient-to-br from-green-200 to-yellow-300 min-h-screen animate-fade-in">
      <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-12 drop-shadow-lg">Votre Liste de Souhaits</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 animate-fade-in">
        {wishList.length === 0 ? (
          <p className="text-center text-gray-700 font-semibold">Votre liste de souhaits est vide.</p>
        ) : (
          wishList.map((item) => (
            <div 
              key={item.id} 
              className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-out animate-pop"
            >
              <img 
                src={item.image} 
                alt={item.nom} 
                className="w-full h-48 object-cover rounded-t-lg mb-4 transition-all duration-500 hover:opacity-90"
              />
              <div className="flex flex-col justify-between items-center text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{item.nom}</h2>
                <p className="text-lg text-green-600 font-semibold mb-4">Prix : {item.prix} €</p>
              </div>
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => handleCommander(item)} 
                  className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 transform active:scale-95 active:bg-blue-700"
                >
                  Commander
                </button>
                <button 
                  onClick={() => {}} 
                  className="bg-red-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-600 transition-all duration-300 transform active:scale-95 active:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Ajout des animations CSS
const styles = `
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease forwards;
}

@keyframes pop {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-pop {
  animation: pop 0.5s ease-out forwards;
}

// Transition bouton sur clic
button:active {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

// Améliorations pour le style des cartes
.bg-white {
  background-color: white;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.transition-all {
  transition: all 0.3s ease;
}

.hover\\:scale-105 {
  transform: scale(1.05);
}

.hover\\:shadow-2xl {
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}
`

document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);
