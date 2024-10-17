import React, { useContext, useEffect, useState } from "react";
import DataHandler from "../DataHandler";
import FavorisPostsCompo from "../Components/FavorisPostsCompo";
import { DataContext } from "../App";

const FavorisPosts = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { value, setValue } = useContext(DataContext);
  // const [posts, setPost] = useState([]);
  const [authorNotes, setAuthorNotes] = useState({});

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await DataHandler.getDatas("/user/favorites");
        setFavorites(response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError(
          "Une erreur est survenue lors de la récupération des favoris."
        );
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // RECUPÉRATION DONNÉES AUTEURS POSTS:
  useEffect(() => {
    if (favorites.length > 0) {
      // Récupération des notes pour chaque auteur des posts
      const fetchAuthorNotes = async () => {
        const notesMap = {};

        // Utiliser Promise.all pour faire des requêtes pour chaque post
        await Promise.all(
          favorites.map(async (post) => {
            try {
              const notesData = await DataHandler.getDatas(
                `http://localhost:3004/posts/${post.id}/notes`
              );
              notesMap[post.id] = notesData.totalNotes; // Stocker les notes par utilisateurId
            } catch (error) {
              console.error(
                `Erreur lors de la récupération des notes pour l'utilisateur ${post.id} :`,
                error
              );
            }
          })
        );
        setAuthorNotes(notesMap);
      };

      fetchAuthorNotes();
    }
  }, [favorites]);

  if (loading) return <div>Chargement des favoris...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-between flex-col w-full gap-10 md:pb-63 md:px-0 pb-40  overflow-y-scroll">
      <h2 className="text-2xl font-bold mb-6">Mes Favoris</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">
          Vous n'avez pas encore de favoris.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((post, index) => {
            const notes = authorNotes[post.id] || "O";
            return(
              <FavorisPostsCompo 
              key={post.id}
              post={post}
              utilisateur={post.Users} />
            );
          })}
        </div>
      )}
    </div>

    // <div className="container mx-auto px-4 py-8">
    //   <h2 className="text-2xl font-bold mb-6">Mes Favoris</h2>
    //   {favorites.length === 0 ? (
    //     <p className="text-center text-gray-500">Vous n'avez pas encore de favoris.</p>
    //   ) : (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {favorites.map((favorite) => (
    //         <FavorisPostsCompo key={favorite.id} favorite={favorite} />
    //       ))}
    //     </div>
    //   )}
    // </div>
  );
};

export default FavorisPosts;
