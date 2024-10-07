import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export default function ListeSouhaits() {
  const [wishList] = useState([
    {
      id: 1,
      nom: 'Costume sur mesure',
      prix: 299.99,
      prixOriginal: 399.99,
      image: 'https://www.boutiquesenegal.com/public/public/storage/article/1666978472.jpg',
      rating: 4.8,
      reviews: 128,
      tailleur: "Martin Couture",
      delai: "2-3 semaines"
    },
    {
      id: 2,
      nom: 'Chemise personnalisée',
      prix: 89.99,
      prixOriginal: 119.99,
      image: 'https://www.boutiquesenegal.com/public/public/storage/article/1666978472.jpg',
      rating: 4.9,
      reviews: 256,
      tailleur: "Emma Style",
      delai: "1-2 semaines"
    },
    {
      id: 3,
      nom: 'Veste élégante',
      prix: 199.99,
      prixOriginal: 249.99,
      image: 'https://www.boutiquesenegal.com/public/public/storage/article/1666978472.jpg',
      rating: 4.7,
      reviews: 89,
      tailleur: "Classic Fashion",
      delai: "2 semaines"
    },
    {
      id: 4,
      nom: 'Robe de soirée',
      prix: 149.99,
      prixOriginal: 199.99,
      image: 'https://www.boutiquesenegal.com/public/public/storage/article/1666978472.jpg',
      rating: 4.6,
      reviews: 74,
      tailleur: "Glamour Couture",
      delai: "3 semaines"
    },
    {
      id: 5,
      nom: 'Pantalon sur mesure',
      prix: 79.99,
      prixOriginal: 109.99,
      image: 'https://www.boutiquesenegal.com/public/public/storage/article/1666978472.jpg',
      rating: 4.5,
      reviews: 95,
      tailleur: "Style Urbain",
      delai: "1-2 semaines"
    }
    ,
    {
      id: 6,
      nom: 'Robe de soirée',
      prix: 149.99,
      prixOriginal: 199.99,
      image: 'https://www.boutiquesenegal.com/public/public/storage/article/1666978472.jpg',
      rating: 4.6,
      reviews: 74,
      tailleur: "Glamour Couture",
      delai: "3 semaines"
    },
    {
      id: 7,
      nom: 'Pantalon sur mesure',
      prix: 79.99,
      prixOriginal: 109.99,
      image: 'https://www.boutiquesenegal.com/public/public/storage/article/1666978472.jpg',
      rating: 4.5,
      reviews: 95,
      tailleur: "Style Urbain",
      delai: "1-2 semaines"
    }
  ]);

  const handleCommander = (item) => {
    console.log(`Commande passée pour ${item.nom} au prix de ${item.prix}€`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 w-full max-w-screen-2xl mx-auto ">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-blue-900">Ma Liste de Souhaits</h1>
          <div className="flex items-center gap-2 bg-blue-100 px-6 py-2 rounded-full">
            <span className="text-blue-800 font-medium">{wishList.length} articles</span>
            <span className="text-red-500 text-lg">❤️</span>
          </div>
        </div>

        {/* Swiper Carousel */}
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
          {wishList.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.nom}
                    className="w-full h-48 object-cover group-hover:opacity-95 transition-all duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                    -{Math.round(((item.prixOriginal - item.prix) / item.prixOriginal) * 100)}%
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-base font-bold text-blue-900 mb-1 hover:text-blue-600 transition-colors duration-200">
                    {item.nom}
                  </h2>
                  <p className="text-sm text-blue-700">Par <span className="font-medium">{item.tailleur}</span></p>

                  <div className="flex items-center mt-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                    <span className="text-xs text-gray-600 ml-2">({item.reviews})</span>
                  </div>

                  <div className="flex items-baseline mb-3">
                    <span className="text-lg font-bold text-blue-600">{item.prix}€</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{item.prixOriginal}€</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">Délai : <span className="font-medium text-blue-700">{item.delai}</span></p>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleCommander(item)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
                    >
                      🛒 Commander
                    </button>
                    <button
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
