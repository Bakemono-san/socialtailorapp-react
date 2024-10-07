import React from 'react';

export default function TailorCard({ name, photo, onFollow, onUnfollow, onSignal }) {
    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden w-80 p-4">
            <img className="w-full h-40 object-cover rounded-md mb-3" src={photo} alt={`${name}'s`} />
            <h3 className="text-lg font-bold text-center">{name}</h3>
            <div className="flex justify-between mt-4 space-x-2">
                <button 
                    onClick={onFollow} 
                    className="bg-blue-500 text-white flex-1 px-3 py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Follow
                </button>
                <button 
                    onClick={onUnfollow} 
                    className="bg-red-500 text-white flex-1 px-3 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                    Unfollow
                </button>
                <button 
                    onClick={onSignal} 
                    className="bg-yellow-500 text-white flex-1 px-3 py-2 rounded hover:bg-yellow-600 transition duration-200"
                >
                    Signal
                </button>
            </div>
        </div>
    );
}
