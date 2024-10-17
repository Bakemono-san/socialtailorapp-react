import React from 'react';

export default function TailorTable({ tailors, handleToggleFollow, handleSignal, userFollowedTailors }) {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="px-4 py-2 border">Nom</th>
          <th className="px-4 py-2 border">Photo</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tailors.map((tailor) => (
          <tr key={tailor.id} className="text-center border-b hover:bg-gray-100">
            <td className="px-4 py-2 border">{`${tailor.prenom} ${tailor.nom}`}</td>
            <td className="px-4 py-2 border">
              <img
                src={
                  tailor.photoProfile.includes('http')
                    ? tailor.photoProfile
                    : `/path/to/local/images/${tailor.photoProfile}`
                }
                alt={tailor.nom}
                className="w-17 h-16 object-cover mx-auto"
              />
            </td>
            <td className="px-4 py-2 border">
              <div className="flex justify-center space-x-2 md:space-x-6">
                <button
                  onClick={() => handleToggleFollow(tailor.id)}
                  className={`px-3 py-1 rounded text-white ${
                    userFollowedTailors.includes(tailor.id) ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {userFollowedTailors.includes(tailor.id) ? 'Unfollow' : 'Follow'}
                </button>
                <button
                  onClick={() => handleSignal(tailor.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Signal
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
