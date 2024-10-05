// login.jsx formulaire de connexion

import React, { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        // Perform form validation here too
        if (!email || !password) {
            setErrors({ general: 'Tous les champs sont requis' });
            return;
        }
        // If form is valid, perform form submission logic here
        // For example, you could use the formData object to send a POST request to the server
        console.log('Form submitted successfully:', { email, password });
    }; 

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Mot de passe:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.general && <p className="error">{errors.general}</p>}
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default LoginForm;