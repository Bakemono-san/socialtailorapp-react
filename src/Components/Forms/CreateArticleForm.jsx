import React, { useState, useEffect, useRef } from 'react';
import { validateArticle } from '../../Validation/validationArticle'; // Valide l'article spécifiquement
import DataHandler from "../../DataHandler";

export default function ArticleForm({ onSubmit }) {
    const [libelle, setLibelle] = useState('');
    const [prix, setPrix] = useState('');
    const [quantite, setQuantite] = useState('');
    const [type, setType] = useState('');
    const [contenu, setContenu] = useState(null); // Changez le type ici
    const [formErrors, setFormErrors] = useState({});
    const form = useRef();
    
    const uploadImageToCloudinary = async (file) => {
        const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET; // Utilisez la variable d'environnement
        const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_URL; // Utilisez la variable d'environnement

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur inconnue');
            }

            return data.secure_url; // Retournez l'URL de l'image
        } catch (error) {
            console.error("Erreur lors de l'upload de l'image :", error);
            return null; // En cas d'erreur, retourner null
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Formulaire soumis avec :", { libelle, prix, quantite, type, contenu });
    
        // Validation des champs du formulaire
        const errors = validateArticle(libelle, prix, quantite, contenu);
        
        // Vérifiez si le contenu est valide
        if (!contenu) {
            errors.contenu = "Veuillez télécharger une image.";
        }
    
        setFormErrors(errors);
        console.log("Erreurs de validation :", errors);
    
        // Vérifie si le formulaire est valide (pas d'erreurs)
        if (Object.keys(errors).length === 0) {
            try {
                // Convertir prix et quantite avant d'envoyer
                const parsedPrix = parseFloat(prix);
                const parsedQuantite = parseInt(quantite, 10);
    
                // Télécharge l'image sur Cloudinary
                const uploadedImage = await uploadImageToCloudinary(contenu); // Changez ceci pour une seule image
                console.log("Image téléchargée avec succès :", uploadedImage);
    
                // Prépare les données du formulaire à envoyer
                const formData = { libelle, prix: parsedPrix, quantite: parsedQuantite, type, image: uploadedImage };
                console.log("Données du formulaire prêtes à l'envoi :", formData);
    
                // Envoie la requête pour créer l'article
                const response = await DataHandler.postData("http://localhost:3004/CreateArticle", formData);
                console.log("Réponse du serveur pour la création:", response);
    
                resetForm();
            } catch (error) {
                console.error("Erreur lors de la création de l'article :", error);
            }
        } else {
            console.log("Le formulaire contient des erreurs, soumission annulée.");
        }
    };

    const resetForm = () => {
        console.log("Réinitialisation du formulaire.");
        setLibelle('');
        setPrix('');
        setQuantite('');
        setType('');
        setContenu(null); // Réinitialiser à null
        setFormErrors({});
    };

    const handleContenuChange = (e) => {
        const file = e.target.files[0]; // Récupérer le premier fichier
        if (file) {
            setContenu(file); // Mettez à jour l'état avec le fichier
        } else {
            setContenu(null); // Réinitialiser si aucun fichier n'est sélectionné
        }
    };

    const getValidationIcon = (field, value) => {
        if (formErrors[field]) {
            return <i className="fas fa-exclamation-circle text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2"></i>;
        } else if (!formErrors[field] && value) {
            return <i className="fas fa-check-circle text-blue-500 absolute right-1 top-[60px] transform -translate-y-1/2"></i>;
        }
        return null;
    };

    useEffect(() => {
        return () => {
            if (contenu) {
                URL.revokeObjectURL(contenu);
            }
        };
    }, [contenu]);

    return (
        <form onSubmit={handleSubmit} ref={form} className="bg-gray-100 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Créer un nouvel article</h2>

            <div className="form-group mb-4">
                <label className="block text-gray-700">Libellé</label>
                <input
                    type="text"
                    value={libelle}
                    onChange={(e) => setLibelle(e.target.value)}
                    className={`w-full p-2 border ${formErrors.libelle ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {formErrors.libelle && <p className="text-red-500 text-sm">{formErrors.libelle}</p>}
            </div>

            <div className="form-group mb-4">
                <label className="block text-gray-700">Prix (€)</label>
                <input
                    type="text"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    className={`w-full p-2 border ${formErrors.prix ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {formErrors.prix && <p className="text-red-500 text-sm">{formErrors.prix}</p>}
            </div>

            <div className="form-group mb-4">
                <label className="block text-gray-700">Quantité</label>
                <input
                    type="text"
                    value={quantite}
                    onChange={(e) => setQuantite(e.target.value)}
                    className={`w-full p-2 border ${formErrors.quantite ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {formErrors.quantite && <p className="text-red-500 text-sm">{formErrors.quantite}</p>}
            </div>

            <div className="form-group mb-4">
                <label className="block text-gray-700">Type</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className={`w-full p-2 border ${formErrors.type ? 'border-red-500' : 'border-gray-300'} rounded`}
                >
                    <option value="">Sélectionnez le type</option>
                    <option value="tissu">Tissu</option>
                    <option value="accessoire">Accessoire</option>
                </select>
                {formErrors.type && <p className="text-red-500 text-sm">{formErrors.type}</p>}
            </div>

            <div className="form-group mb-4">
                <label className="block text-gray-700">Image</label>
                <input
                    type="file"
                    onChange={(e) => setContenu(e.target.files[0])}
                    className={`w-full p-2 border ${formErrors.contenu ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {formErrors.contenu && <p className="text-red-500 text-sm">{formErrors.contenu}</p>}
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Ajouter l'article
            </button>
        </form>
    );
}
