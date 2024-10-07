import React, { useState } from 'react';
import TailorCard from '../Components/TailorCard';
import TailorTable from '../Components/TailorTable';

const tailorsData = [
  { id: 1, name: 'Jean Michel', photo: 'https://img.freepik.com/photos-gratuite/jeune-homme-hispanique-tailleur-ecoutant-message-vocal-par-smartphone-dessinant-conception-vetements-atelier_839833-7530.jpg'},
  { id: 2, name: 'Marie Dupont', photo: 'https://www.shutterstock.com/image-photo/young-beautiful-hispanic-woman-tailor-260nw-2310294181.jpg'},
  { id: 3, name: 'Jeune Tailleur', photo: 'https://via.placeholder.com/150'},
  { id: 4, name: 'Anta Diop', photo: 'https://www.shutterstock.com/image-photo/professional-hipster-female-tailor-wearing-260nw-2207623955.jpg'},
  { id: 5, name: 'Louis Faye', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHxTOhCbcaI7p-hxjFfomZPAfFqKXAMf40pg&s'},
  { id: 6, name: 'Georges Dupont', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQISv-rQkj0lXK87JBd_Uw0fjyD5WnqdA1zBg&s'}
  // Ajoutez autant de tailleurs que nécessaire
];

export default function TailorsList() {
  const [tailors, setTailors] = useState(tailorsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Vous pouvez ajuster le nombre d'éléments par page
  const [filter, setFilter] = useState('');
  const [viewMode, setViewMode] = useState('card'); // 'card' ou 'table'

  // Filtrage des tailleurs
  const filteredTailors = tailors.filter(tailor => tailor.name.toLowerCase().includes(filter.toLowerCase()));

  // Pagination pour le tableau uniquement
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTailorsForTable = filteredTailors.slice(indexOfFirstItem, indexOfLastItem);

  // Changer de page pour le tableau
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fonctions Follow, Unfollow, et Signal
  const handleFollow = (tailorId) => {
    console.log(`Follow tailor with id: ${tailorId}`);
  };

  const handleUnfollow = (tailorId) => {
    console.log(`Unfollow tailor with id: ${tailorId}`);
  };

  const handleSignal = (tailorId) => {
    console.log(`Signal tailor with id: ${tailorId}`);
  };

  return (
    <div className='w-full p-4 overflow-y-scroll'>
      <h2 className='text-2xl font-bold mb-4'>Liste des tailleurs</h2>
      
      {/* Filtre */}
      <input
        type="text"
        placeholder="Rechercher un tailleur"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      {/* Switch entre vue card et tableau */}
      <div className="mb-4">
        <button onClick={() => setViewMode('card')} className="bg-blue-500 text-white px-4 py-2 mr-2">Vue Cards</button>
        <button onClick={() => setViewMode('table')} className="bg-blue-500 text-white px-4 py-2">Vue Tableau</button>
      </div>

      {/* Affichage sous forme de Cards ou Tableau */}
      {viewMode === 'card' ? (
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'> {/* Augmentez le gap pour plus d'espace entre les cartes */}
          {filteredTailors.map(tailor => (
            <TailorCard
              key={tailor.id}
              name={tailor.name}
              photo={tailor.photo}
              location={tailor.location} // Ajoutez la localisation
              onFollow={() => handleFollow(tailor.id)}
              onUnfollow={() => handleUnfollow(tailor.id)}
              onSignal={() => handleSignal(tailor.id)}
            />
          ))}
        </div>
      ) : (
        <>
          <TailorTable tailors={currentTailorsForTable} handleFollow={handleFollow} handleUnfollow={handleUnfollow} handleSignal={handleSignal} />
          {/* Pagination pour le tableau */}
          <div className="mt-4 flex justify-center">
            {[...Array(Math.ceil(filteredTailors.length / itemsPerPage)).keys()].map(pageNumber => (
              <button
                key={pageNumber + 1}
                onClick={() => paginate(pageNumber + 1)}
                className={`px-3 py-1 border ${currentPage === pageNumber + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
