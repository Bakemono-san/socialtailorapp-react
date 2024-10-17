import React, { useState } from 'react'

const Display = ({img,setPreview}) => {
    return (
        <div className='absolute inset-0 mx-auto h-screen bg-black bg-opacity-50 flex justify-center items-center z-10' onClick={() => setPreview(null)}>
            <img src={img} alt="preview" className='w-1/2 h-2/3 rounded'/>
        </div>
    )
}
export default function MessageItem({ color, position, message, file = null, heure }) {
    console.log(file);
    const [preview, setPreview] = useState(null);

    return (
            <div
                className={`${color} ${position} relative p-2 py-3 w-fit rounded-lg shadow-md max-w-60 sm:max-w-sm md:max-w-72 lg:max-w-lg xl:max-w-xl`}
                style={{ wordBreak: 'break-word', borderRadius: '10px' }}
                >
                {preview && <Display img={preview} setPreview={setPreview} />}
                {/* File Preview (if image file is provided) */}
                {file && (
                    <div className="mt-2">
                        <img
                            src={file}
                            alt="uploaded"
                            className="w-full max-h-32 cursor-pointer object-fill rounded-md transition-transform duration-300 hover:scale-105 shadow-sm"
                            onClick={() => setPreview(file)}
                        />
                    </div>
                )}
                {/* Message Text */}
                <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200 font-bold mb-2">
                    {message}
                </p>


                {/* Timestamp */}
                <span className="block mt-2 text-sm text-gray-500 dark:text-gray-400 text-right">
                    {heure}
                </span>

                {/* Tail for message box (arrow effect) */}
                <div className={`absolute bottom-0 -mb-2 ${position === 'self-start' ? '-left-2' : '-left-2'}`}>
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 0L24 12H0L12 0Z" />
                    </svg>
                </div>
            </div>

    )
}
