// ModelForm.jsx formulaire pour créer un nouveau compte utilisateur


import React, { useState } from 'react';

const ModelForm = () => {
    const [modelId, setModelId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        
        // Perform form validation here
        const { email, password, confirmPassword } = formData;
        if (!email ||!password ||!confirmPassword) {
            setErrors({...errors, general: 'Tous les champs sont requis' });
            return;
        }
        
        if (password.length < 8) {
            setErrors({...errors, password: 'Le mot de passe doit contenir au moins 8 caractères' });
            return;
        }
        
        if (password!== confirmPassword) {
            setErrors({...errors, confirmPassword: 'Les mots de passe ne correspondent pas' });
            return;
        }
        
        // If form is valid, perform form submission logic here
        // For example, you could use the formData object to send a POST request to the server
        console.log('Form submitted successfully:', formData);
    };
    
    const handleSelectModel = (model) => {
        setModelId(model);
        setIsModalOpen(false); // Close the modal after selecting a model
    };
    
    return (
        <>
            <form className="flex flex-col gap-4 w-full bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="password" className="font-semibold">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="confirmPassword" className="font-semibold">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required onKeyDown={
                                (e) => {
                                    if (e.key === 'Enter') {
                                        handleSubmit(e);
                                    }
                                }
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Creer
                    </button>
                </div>
            </form>
        </>
    );
};

export default ModelForm;
