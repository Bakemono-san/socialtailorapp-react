import React, { useContext, useState } from 'react';
import { DataContext } from '../../App';
import DataHandler from '../../DataHandler';

const ModelForm = () => {
    const { value, setValue } = useContext(DataContext);
    const [models, setModels] = useState(value.models);
    const [modelId, setModelId] = useState();
    const [selectedModel,setSelectedModel] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title,setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title,modelId);
        DataHandler.postData("http://localhost:3004/post/create",{modelId:modelId,titre:title,description: "hello world"})
        .then((data) => {
            if (data) {
                alert(data.message)
                alert(data.error)
                setTitle("");
                setModelId("");
            }
        })
        .catch((error) => {
            console.error(error.error);
        });
    }


    const handleSelectModel = (model,id) => {
        setSelectedModel(model);
        setModelId(id);
        setIsModalOpen(false); // Close the modal after selecting a model
    };

    return (
        <>
            <form className='flex flex-col gap-2  bg-white p-4 rounded-lg shadow-lg' onSubmit={handleSubmit}>
                <div className='flex justify-between items-center '>
                    <h1 className='text-lg font-semibold text-gray-600'>Create a Post</h1>
                    <div className='flex flex-col h-content items-center justify-center'>...</div>
                </div>
                <div>
                    <input type="text" className='w-full bg-gray-200 p-2 rounded' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='write something here...' />
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
                {modelId && <p className="mt-2 text-gray-600">Selected Model: {selectedModel}</p>}
                <div className='p-1 flex justify-between items-center'>

                    <button
                        type="button"
                        className=" bg-blue-500 text-white px-3 py-1  w-fit rounded-lg hover:bg-blue-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Choose Model
                    </button>

                    <button
                        type="submit"
                        className=" bg-green-500 text-white px-3 py-1  w-fit rounded-lg hover:bg-green-600"
                    >
                        publish
                    </button>

                </div>


            </form>

            {/* Modal for Model Selection */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-10">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                        <h3 className="font-bold text-lg">Choose a Model</h3>
                        <div className="py-4">

                            {models.map((model) => {
                                return <button
                                    key={model.id}
                                    type="button"
                                    className="w-full bg-gray-100 hover:bg-gray-200 p-2 mb-2 rounded-lg"
                                    onClick={() => handleSelectModel(model.libelle,model.id)}
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
