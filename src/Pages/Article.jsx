import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Form from '../Components/Forms/CreateArticleForm';
import DataHandler from '../DataHandler';
import ReactPaginate from 'react-paginate';

export default function ArticlePage() {
    const [articles, setArticles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [filters, setFilters] = useState({
        type: '',
        libelle: '',
        prix: ''
    });
    const articlesPerPage = 6;


    useEffect(() => {
        fetchArticles();
    }, []);

    // Fonction pour récupérer les articles avec filtres
    const fetchArticles = async () => {
        try {
            // Construire l'URL avec les filtres si fournis
            const queryParams = new URLSearchParams(filters).toString();
            const response = await DataHandler.getDatas(`/getArticles?${queryParams}`);

            console.log("Réponse des articles :", response);
            setArticles(response);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles :", error);
        }
    };

    // Gestion des changements dans les champs de filtre
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    // Gestion de la soumission du formulaire de filtre
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchArticles();  // Appeler la fonction pour appliquer les filtres
    };

    const handleSubmit = async (formData) => {
        await createArticle(formData);
        setIsModalOpen(false);

    };

    const createArticle = async (formData) => {
        const newArticle = {
            libelle: formData.libelle,
            prix: formData.prix,
            quantite: formData.quantite,
            type: formData.type,
            photos: formData.contenu,
        };

        try {
            const response = await DataHandler.postData(`/CreateArticle`, newArticle);
            setArticles((prevArticles) => [...prevArticles, response]);
        } catch (error) {
            console.error("Erreur lors de la création de l'article :", error);
        }
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const offset = currentPage * articlesPerPage;
    const currentArticles = articles.slice(offset, offset + articlesPerPage);
    const pageCount = Math.ceil(articles.length / articlesPerPage);

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-9 overflow-auto">
            <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">Gestion des Articles</h1>

            <div className="mb-4">
                {/* Formulaire de filtre */}
                <form onSubmit={handleFilterSubmit} className="flex space-x-4 mb-4">
                    <input
                        type="text"
                        name="type"
                        placeholder="Type d'article"
                        value={filters.type}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        name="libelle"
                        placeholder="Libellé de l'article"
                        value={filters.libelle}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded-lg"
                    />
                    <input
                        type="number"
                        name="prix"
                        placeholder="Prix max (€)"
                        value={filters.prix}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded-lg"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Filtrer
                    </button>
                </form>

                {/* Bouton pour ajouter un article */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Ajouter un Article
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto ">
                <table className="min-w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-blue-500 text-white -600 uppercase text-sm leading-normal">

                            <th className="py-3 px-6 text-left">Libellé</th>
                            <th className="py-3 px-6 text-left">Prix (€)</th>
                            <th className="py-3 px-6 text-left">Quantité</th>
                            <th className="py-3 px-6 text-left">Type</th>
                            <th className="py-3 px-6 text-left">Photo</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {currentArticles.map((article) => (
                            <tr key={article.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{article.libelle}</td>
                                <td className="py-3 px-6 text-left">{article.prix}</td>
                                <td className="py-3 px-6 text-left">{article.quantite}</td>
                                <td className="py-3 px-6 text-left">{article.type}</td>
                                <td className="py-3 px-6 ">
                                <img
                                    src={article.image}
                                   
                                    className="w-16 h-16 roundedpo rounded-full"
                                    onError={(e) => {
                                    console.error('Image failed to load:', article.image);
                                    e.target.style.display = 'none';
                                    }} 
                                    />
                                </td>
                                

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center">
                <ReactPaginate
                    previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                    nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination flex items-center space-x-2'}
                    activeClassName={'active'}
                    pageLinkClassName={'px-4 py-2 rounded-md hover:shadow-md bg-blue-600 text-white'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link text-gray-600 hover:text-blue-600'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link text-gray-600 hover:text-blue-600'}
                    breakLinkClassName={'page-link text-gray-600'}
                    activeLinkClassName={'active text-blue-600 font-bold'}
                />
            </div>
        


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
