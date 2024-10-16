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
        <form onSubmit={handleSubmit} ref={form} className="bg-white shadow-md rounded-lg p-8 max-w-xl mx-auto">
            <div className="form-group mb-5 relative">
                <label htmlFor="libelle" className="block text-gray-700 font-semibold text-lg">Libellé de l'article</label>
                <input
                    type="text"
                    id="libelle"
                    value={libelle}
                    onChange={(e) => setLibelle(e.target.value)}
                    className={`mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.libelle ? 'border-red-500' : 'border-gray-300'}`}
                />
                {getValidationIcon('libelle', libelle)}
                {formErrors.libelle && <span className="text-red-500 text-sm">{formErrors.libelle}</span>}
            </div>

            <div className="form-group mb-5 relative">
                <label htmlFor="prix" className="block text-gray-700 font-semibold text-lg">Prix Unitaire (€)</label>
                <input
                    type="text"
                    id="prix"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    className={`mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.prix ? 'border-red-500' : 'border-gray-300'}`}
                />
                {getValidationIcon('prix', prix)}
                {formErrors.prix && <span className="text-red-500 text-sm">{formErrors.prix}</span>}
            </div>

            <div className="form-group mb-5 relative">
                <label htmlFor="quantite" className="block text-gray-700 font-semibold text-lg">Quantité en Stock</label>
                <input
                    type="text"
                    id="quantite"
                    value={quantite}
                    onChange={(e) => setQuantite(e.target.value)}
                    className={`mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.quantite ? 'border-red-500' : 'border-gray-300'}`}
                />
                {getValidationIcon('quantite', quantite)}
                {formErrors.quantite && <span className="text-red-500 text-sm">{formErrors.quantite}</span>}
            </div>

            <div className="form-group mb-5 relative">
                <label htmlFor="type" className="block text-gray-700 font-semibold text-lg">Type d'article</label>
                <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className={`mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.type ? 'border-red-500' : 'border-gray-300'}`}
                >
                    <option value="">Sélectionner un type</option>
                    <option value="tissu">Tissu</option>
                    <option value="accessoire">Accessoire</option>
                </select>
                {getValidationIcon('type', type)}
                {formErrors.type && <span className="text-red-500 text-sm">{formErrors.type}</span>}
            </div>

            <div className="form-group mb-6 relative">
                <label htmlFor="contenu" className="block text-gray-700 font-semibold text-lg">Image de l'article</label>
                <input
                    type="file"
                    id="contenu"
                    onChange={handleContenuChange}
                    className={`mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.contenu ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.contenu && <span className="text-red-500 text-sm">{formErrors.contenu}</span>}
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Ajouter
            </button>
        </form>
    );
}
