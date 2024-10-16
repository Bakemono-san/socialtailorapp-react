import React, { useState, useEffect, useContext } from 'react';
import Form from '../Components/Forms/CreateArticleForm'; // Réutilise le même formulaire si applicable
import DataHandler from '../DataHandler';
import { DataContext } from '../App';

export default function ArticlePage() {
    const [articles, setArticles] = useState([]);
    const { value } = useContext(DataContext);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await DataHandler.getDatas(`/getArticles`);
            console.log(response);
            console.log("Réponse des articles :", response);
            setArticles(response);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles :", error);
        }
    };

    const handleSubmit = async (formData) => {
        await createArticle(formData);
    };

    const createArticle = async (formData) => {
        const newArticle = {
            libelle: formData.libelle,
            prix: formData.prix,
            quantite: formData.quantite,
            type: formData.type, // Ajoute le type si nécessaire
            photos: formData.contenu,
        };

        try {
            const response = await DataHandler.postData(`/CreateArticle`, newArticle);
            setArticles((prevArticles) => [...prevArticles, response]);
        } catch (error) {
            console.error("Erreur lors de la création de l'article :", error);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 overflow-y-scroll">
            <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">Gestion des Articles</h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="shadow-lg p-6 bg-white rounded-lg lg:col-span-1">
                    <Form onSubmit={handleSubmit} />
                </div>

                <div className="shadow-lg p-6 bg-white rounded-lg lg:col-span-1">
                    <ul className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
                        {articles.map((article) => (
                            <li key={article.id} className="flex justify-between items-center p-5 hover:bg-gray-100 transition duration-200">
                                <div className="flex items-center space-x-4">
                                    {/* Afficher l'image principale de l'article */}
                                    {article.photos && article.photos.length > 0 && (
                                        <img src={article.photos[0]} alt={article.libelle} className="w-20 h-20 object-cover rounded" />
                                    )}
                                    <div>
                                        <h3 className="font-bold text-blue-600 text-xl">{article.libelle}</h3>
                                        <p className="text-gray-600">Prix : {article.prix} €</p>
                                        <p className="text-gray-600">Quantité : {article.quantite}</p>
                                        <p className="text-gray-600">Type : {article.type}</p> {/* Affichage du type */}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
