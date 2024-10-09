import React, { useContext, useState } from 'react';
import { DataContext } from '../../App';

const ModelForm = () => {
    const { value, setValue } = useContext(DataContext);
    const [models, setModels] = useState(value.models);
    const [modelId, setModelId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);




    const handleSelectModel = (model) => {
        setModelId(model);
        setIsModalOpen(false); // Close the modal after selecting a model
    };

    return (
        <>
            <form className='flex flex-col gap-2  bg-white p-4 rounded-lg shadow-lg'>
                <div className='flex justify-between items-center '>
                    <h1 className='text-lg font-semibold text-gray-600'>Create a Post</h1>
                    <div className='flex flex-col h-content items-center justify-center'>...</div>
                </div>
                <div>
                    <input type="text" className='w-full bg-gray-200 p-2 rounded' placeholder='write something here...' />
                </div>
                <input
                    type="text"
                    id="modelId"
                    name="modelId"
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                    className="hidden"
                    required
                />
                {modelId && <p className="mt-2 text-gray-600">Selected Model: {modelId}</p>}
                <div className='p-1 flex justify-between items-center'>

                    <button
                        type="button"
                        className=" bg-blue-500 text-white px-3 py-1  w-fit rounded-lg hover:bg-blue-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Choose Model
                    </button>

                    <button
                        type="button"
                        className=" bg-green-500 text-white px-3 py-1  w-fit rounded-lg hover:bg-green-600"
                    >
                        publish
                    </button>

                </div>


                {/* <div className="flex flex-col gap-4 w-full md:w-4/5 bg-white p-2 rounded-lg shadow-lg">

                    <div className="flex sm:flex-row gap-4 justify-between">
                        <div className="flex-1">
                            <label htmlFor="titre" className="font-semibold">Titre</label>
                            <input
                                type="text"
                                id="titre"
                                name="titre"
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="description" className="font-semibold">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div>

                            <label htmlFor="modelId" className="font-semibold">Model</label>
                            <button
                                type="button"
                                className="ml-4 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Choose Model
                            </button>
                            <input
                                type="text"
                                id="modelId"
                                name="modelId"
                                value={modelId}
                                onChange={(e) => setModelId(e.target.value)}
                                className="hidden"
                                required
                            />
                            {modelId && <p className="mt-2 text-gray-600">Selected Model: {modelId}</p>}
                        </div>
                        <button type='submit' className='btn btn-success text-white'>Post</button>

                    </div>
                </div>

                <div className='md:block hidden'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVv0X1OiwK4BXsh6RT2w1jXWPS3LoHJ74_Q&s" alt="" className='h-full w-full' />
                </div> */}


            </form>

            {/* Modal for Model Selection */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-10">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                        <h3 className="font-bold text-lg">Choose a Model</h3>
                        <div className="py-4">

                            {models.map((model) => {
                                return <button
                                    type="button"
                                    className="w-full bg-gray-100 hover:bg-gray-200 p-2 mb-2 rounded-lg"
                                    onClick={() => handleSelectModel(model.libelle)}
                                >
                                    {model.libelle}
                                </button>
                            })}
                            {/* Add more model options as needed */}
                        </div>
                        <div className="modal-action mt-4">
                            <button
                                className="btn bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModelForm;
