import { faCartPlus, faComment, faShare, faSmile } from '@fortawesome/free-solid-svg-icons'
import { faClipboard } from '@fortawesome/free-solid-svg-icons/faClipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function PostCard(props) {
    return (
        <div className='w-full bg-white rounded'>
            <div className='flex items-center justify-between py-2 md:py-2 md:px-4 px-2  border-b border-grey-300'>
                <div className='flex gap-2 items-center'>
                    <img src={props.utilisateur.photoProfile} alt="" className='w-8 h-8 rounded-full' />
                    <div>
                        <h3>{props.utilisateur.prenom + " " + props.utilisateur.nom}</h3>
                        <p>{props.post.datePublication}</p>
                    </div>
                </div>
                <div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1">...</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-red-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><button href='#'>marquer favori</button></li>
                            <li><button>Signaler</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <main className='flex flex-col'>

                <img className='min-w-86 h-80 object-cover lg:object-fill' src={""} alt="" />
                
                <div className="py-2 px-6 md:p-6 flex flex-col md:gap-6 gap-4 w-full bg-white rounded-lg">
                    <h2 className="md:text-3xl font-bold text-center text-gray-800">
                        {"titre"}
                    </h2>

                    {/* <div className="flex justify-between md:text-lg">
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">Tissus</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                {props.tissu.map((element, index) => (
                                    <li key={index}>{element} <input type="radio" name="tissu" value={element} /></li>
                                ))}
                            </ul>
                        </div>


                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">Materials</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                {props.materials.map((element, index) => (
                                    <li key={index}>{element}</li>
                                ))}
                            </ul>
                        </div>
                    </div> */}
                    {/* <div className="bg-gradient-to-r from-blue-500 to-red-500 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out w-fit self-center">
                    15000 fr
                </div> */}
                </div>

            </main>
            <div className="reactions flex justify-between items-center px-4 py-2 md:py-4 border-y border-grey-300  bg-white">
                <div className='flex gap-2 items-baseline  '>
                    <FontAwesomeIcon icon={faSmile} />
                    <p>Like</p>
                </div>
                <div className='flex gap-2 items-baseline'><FontAwesomeIcon icon={faComment} />
                    <p>Comment</p></div>
                <div className='flex gap-2 items-baseline'><FontAwesomeIcon icon={faShare} />
                    <p>Share</p></div>
            </div>
            <div className="reactions flex justify-between items-center px-4 py-2 md:py-4 border-y border-grey-300  bg-white">
                <span className='flex gap-2 items-baseline'>
                    <button className='btn btn-warning rounded h-10 text-white'>
                        <FontAwesomeIcon icon={faClipboard} />
                        <p>Add to WishList</p>
                    </button>
                </span>
                <span className='flex gap-2 items-baseline'>
                    <button className='btn rounded  h-10 text-white bg-blue-500'>
                        <FontAwesomeIcon icon={faCartPlus} />
                        <p>Add to cart</p>
                    </button>

                </span>
            </div>

            <div className="px-4 flex justify-center items-center py-4 bg-white">
                <div className="w-full bg-blue-100 rounded">
                    <input type="text" className='p-2 bg-transparent w-full border-none' placeholder='comment...' />
                </div>
            </div>
        </div>
    )
}
