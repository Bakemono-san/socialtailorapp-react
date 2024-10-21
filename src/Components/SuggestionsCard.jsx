import React from 'react';

const SuggestionsCard = ({ suggestions }) => (
  <div className="p-4 bg-white shadow rounded">
    <h3 className="font-bold text-lg mb-2">Suggestions de Tailleurs</h3>
    {suggestions.length === 0 ? (
      <p>Aucune suggestion</p>
    ) : (
      suggestions.map(tailor => (
        <div key={tailor.id} className="border-b py-2">
          <p>{tailor.name}</p>
        </div>
      ))
    )}
  </div>
);

export default SuggestionsCard;
