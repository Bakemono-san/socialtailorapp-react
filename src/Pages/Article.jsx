import React, { useState, useEffect, useContext } from 'react';
import Form from '../Components/Forms/CreateArticleForm'; // Réutilise le même formulaire si applicable
import DataHandler from '../DataHandler';
import { DataContext } from '../App';

export default function ArticlePage() {
    const [articles, setArticles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler le modal
    const { value } = useContext(DataContext);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await DataHandler.getDatas(`/getArticles`);
            console.log("Réponse des articles :", response);
            setArticles(response);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles :", error);
        }
    };

    const handleSubmit = async (formData) => {
        await createArticle(formData);
        setIsModalOpen(false); // Ferme le modal après soumission
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
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">Gestion des Articles</h1>

            {/* Bouton pour ouvrir le modal du formulaire */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Ajouter un Article
                </button>
            </div>

            {/* Tableau des articles */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Libellé</th>
                            <th className="py-3 px-6 text-left">Prix (€)</th>
                            <th className="py-3 px-6 text-left">Quantité</th>
                            <th className="py-3 px-6 text-left">Type</th>
                            <th className="py-3 px-6 text-left">Photo</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {articles.map((article) => (
                            <tr key={article.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{article.libelle}</td>
                                <td className="py-3 px-6 text-left">{article.prix}</td>
                                <td className="py-3 px-6 text-left">{article.quantite}</td>
                                <td className="py-3 px-6 text-left">{article.type}</td>
                                <td className="py-3 px-6 text-left">
                                    {article.photos && article.photos.length > 0 && (
                                        <img
                                            src={article.photos[0]}
                                            alt={article.libelle}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal pour le formulaire */}
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all sm:max-w-lg sm:w-full">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Ajouter un Article</h3>
                                <Form onSubmit={handleSubmit} />
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
