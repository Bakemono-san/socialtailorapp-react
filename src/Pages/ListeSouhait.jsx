import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { DataContext } from '../App';
import DataHandler from '../DataHandler';

// Composant Modal personnalisé
const Modal = ({ isOpen, onClose, title, message, onConfirm, type = "confirm" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 animate-fadeIn shadow-xl">
        <h3 className={`text-xl font-bold mb-4 ${
          type === "success" ? "text-green-600" : 
          type === "error" ? "text-red-600" : 
          "text-blue-600"
        }`}>
          {title}
        </h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          {type === "confirm" ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Confirmer
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Fermer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ListeSouhaits() {
  const { value } = useContext(DataContext);
  const userId = value?.user?.id;
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "confirm",
    onConfirm: null
  });

  const showModal = (config) => {
    setModalConfig({ ...config, isOpen: true });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  const fetchWishlistItems = async () => {
    try {
      setIsLoading(true);
      const response = await DataHandler.getDatas("http://localhost:3004/user/listeSouhaits");
      // Assurez-vous que response est un tableau, sinon utilisez un tableau vide
      const data = Array.isArray(response) ? response : [];
      setWishlistItems(data);
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste de souhaits:", error);
      showModal({
        title: "Erreur",
        message: "Une erreur est survenue lors de la récupération des articles.",
        type: "error"
      });
      setWishlistItems([]); // En cas d'erreur, définir un tableau vide
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWishlistItems();
    } else {
      setWishlistItems([]); // Réinitialiser la liste si l'utilisateur n'est pas connecté
      setIsLoading(false);
    }
  }, [userId]);

  const handleCommander = (post) => {
    if (!userId) {
      showModal({
        title: "Connexion requise",
        message: "Veuillez vous connecter pour commander.",
        type: "error"
      });
      return;
    }
    console.log(`Commande passée pour ${post.titre} par l'utilisateur ${userId}`);
  };

  const handleSupprimer = async (wishlistItem) => {
    if (!userId) {
      showModal({
        title: "Connexion requise",
        message: "Veuillez vous connecter pour effectuer cette action.",
        type: "error"
      });
      return;
    }

    showModal({
      title: "Confirmer la suppression",
      message: "Êtes-vous sûr de vouloir retirer cet article de votre liste de souhaits ?",
      type: "confirm",
      onConfirm: async () => {
        try {
          await DataHandler.deleteData(`http://localhost:3004/souhaits/${wishlistItem.id}`);
          await fetchWishlistItems();
          showModal({
            title: "Succès",
            message: "L'article a été retiré de votre liste de souhaits.",
            type: "success"
          });
        } catch (error) {
          showModal({
            title: "Erreur",
            message: "Une erreur est survenue lors de la suppression.",
            type: "error"
          });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Connexion requise</h2>
          <p className="text-gray-600">Veuillez vous connecter pour voir votre liste</p>
        </div>
      </div>
    );
  }

  if (!Array.isArray(wishlistItems) || wishlistItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Aucun article trouvé</h2>
          <p className="text-gray-600">Vous n'avez pas encore d'articles dans votre liste</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        type={modalConfig.type}
      />

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 w-full h-full max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-blue-900">Ma Liste de Souhaits</h1>
          <div className="flex items-center gap-2 bg-blue-100 px-6 py-2 rounded-full">
            <span className="text-blue-800 font-medium">{wishlistItems.length} articles</span>
            <span className="text-red-500 text-lg">❤️</span>
          </div>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }}
        >
          {wishlistItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                <div className="relative group">
                  <img
                    src={item.Posts?.image || 'https://www.boutiquesenegal.com/public/public/storage/article/1666978472.jpg'}
                    alt={item.Posts?.titre}
                    className="w-full h-48 object-cover group-hover:opacity-95 transition-all duration-300"
                  />
                  {item.Posts?.reduction && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                      -{item.Posts.reduction}%
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-base font-bold text-blue-900 mb-1 hover:text-blue-600 transition-colors duration-200">
                    {item.Posts?.titre}
                  </h2>
                  <p className="text-sm text-blue-700">
                    {item.Posts?.description}
                  </p>

                  <div className="flex items-center mt-2 mb-3">
                    <span className="text-xs text-gray-600">
                      Publié le {item.Posts?.datePublication ? new Date(item.Posts.datePublication).toLocaleDateString() : 'Date inconnue'}
                    </span>
                  </div>

                  <div className="flex items-baseline mb-3">
                    {item.Posts?.prix && (
                      <>
                        <span className="text-lg font-bold text-blue-600">{item.Posts.prix}€</span>
                        {item.Posts.prixOriginal && (
                          <span className="text-sm text-gray-500 line-through ml-2">{item.Posts.prixOriginal}€</span>
                        )}
                      </>
                    )}
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="text-sm text-blue-600 mr-4">Vues: {item.Posts?.vues || 0}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleCommander(item.Posts)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
                    >
                      🛒 Commander
                    </button>
                    <button
                      onClick={() => handleSupprimer(item)}
                      className="w-full bg-gray-100 hover:bg-red-100 text-red-600 py-2 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
                    >
                      🗑 Retirer
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}