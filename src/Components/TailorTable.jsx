import React from 'react';

export default function TailorTable({ tailors, handleFollow, handleUnfollow, handleSignal }) {
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
                {tailors.map(tailor => (
                    <tr key={tailor.id} className="text-center border-b hover:bg-gray-100">
                        <td className="px-4 py-2 border">{tailor.name}</td>
                        <td className="px-4 py-2 border">
                            <img src={tailor.photo} alt={`${tailor.name}'s`} className="w-17 h-16 object-cover mx-auto" />
                        </td>
                        <td className="px-4 py-2 border">
                            <div className="flex justify-center space-x-2 md:space-x-6">
                                <button 
                                    onClick={() => handleFollow(tailor.id)} 
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Follow
                                </button>
                                <button 
                                    onClick={() => handleUnfollow(tailor.id)} 
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Unfollow
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
