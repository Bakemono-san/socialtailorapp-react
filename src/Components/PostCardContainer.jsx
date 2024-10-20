import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useContext } from "react";
import { DataContext } from "../App";
import DataHandler from "../DataHandler";
import Swal from "sweetalert2";
import LocalStorage from "../Utils/LocalStorage";

export default function PostCardContainer() {
  const { value, setValue } = useContext(DataContext);
  const [posts, setPost] = useState([]);
  const [authorNotes, setAuthorNotes] = useState({});
  const [followings, setFollowings] = useState([]);
  const [followingsList, setFollowingsList] = useState(followings); // Suivi local des utilisateurs suivis
  
  const connectedUser = value.user;
    

  const handleAddToWishList = async (postId) => {
    try {
      // Inclure les données nécessaires dans le corps de la requête
      const requestData = {
        postId: postId,
        userId: LocalStorage.get("userId"), // Ajouter l'ID de l'utilisateur si nécessaire
      };

      console.log("Sending request with data:", requestData); // Pour le débogage
      const response = await DataHandler.postData(
        `/user/listeSouhaits/${postId}`,
        requestData
      );
      if (response) {
        // Mettre à jour le context
        const updatedValue = {
          ...value,
          user: {
            ...value.user,
            listeSouhaits: [...(value.user.listeSouhaits || []), postId],
          },
        };
        setValue(updatedValue);
        // Afficher le modal de succès
        Swal.fire({
          icon: "success",
          title: "Succès!",
          text: "Ajouté à la liste de souhaits avec succès!",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      // Amélioration de la gestion des erreurs
      console.error("Erreur lors de l'ajout à la liste de souhaits:", error);
      // Afficher plus de détails sur l'erreur
      const errorMessage =
        error.response?.data?.message || error.message || "Erreur inconnue";
      console.log("Détails de l'erreur:", {
        status: error.response?.status,
        data: error.response?.data,
        message: errorMessage,
      });
      // Afficher le modal d'erreur
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: `Erreur: ${errorMessage}`,
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    DataHandler.getDatas("http://localhost:3004/post")
      .then((data) => {
        setPost(data);
        console.log(posts);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des posts :", error);
      });
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      // Récupération des notes pour chaque auteur des posts
      const fetchAuthorNotes = async () => {
        const notesMap = {};

        // Utiliser Promise.all pour faire des requêtes pour chaque post
        await Promise.all(
          posts.map(async (post) => {
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
  }, []);

  useEffect(() => {
    DataHandler.getDatas("/following")
      .then((res) => {
        const followingIds = res.followings.map(
          (following) => following.Users_Followers_followerIdToUsers.id
        );
        // console.log(followingIds);
        setFollowings(followingIds);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddToFavoris = async (postId) => {
    try {
      console.log("Début de l'appel à l'API pour le post:", postId);
      const response = await DataHandler.postData(
        `/post/favorite/create/${postId}`
      );
      console.log("Réponse de l'API:", response);
      // DataHandler.postData renvoie directement la donnée, qui est maintenant une chaîne
      return { status: 201, data: response };
    } catch (error) {
      console.error("Erreur détaillée lors de l'ajout aux favoris :", error);
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code d'état
        // qui ne fait pas partie de la plage 2xx
        return {
          status: error.response.status,
          data: error.response.data,
        };
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        return {
          status: 500,
          data: "Pas de réponse du serveur",
        };
      } else {
        // Quelque chose s'est passé dans la configuration de la requête qui a déclenché une erreur
        return {
          status: 500,
          data: error.message,
        };
      }
    }
  };

  // Fonction pour signaler un utilisateur
  const handleReportUser = async (postId, userId, reason) => {
    try {
      const response = await DataHandler.postData(
        `http://localhost:3004/signale/${userId}`,
        {
          userId: userId, // ID de l'utilisateur signalé
          reason: reason, // Raison du signalement
        }
      );
      console.log("Signalement réussi :", response.message);
      return { success: true, message: response.message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Erreur lors du signalement";
      console.log(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  async function followUser(followerId) {
    try {
      const data = { followerId };
      const response = await DataHandler.postData("/followUser", data);
      console.log(response.message); // Affiche le message de succès ou d'erreur
      // Mettre à jour l'interface utilisateur si nécessaire
    } catch (error) {
      console.error(
        "Erreur lors de l'abonnement:",
        error.response?.data?.message || error.message
      );
    }
  }

  async function unfollowUser(followerId) {
    try {
      const data = { followerId };
      const response = await DataHandler.postData("/unfollowUser", data); // Utilisation de postData au lieu de deleteData pour passer des données
      console.log(response.message); // Affiche le message de succès ou d'erreur
      // Mettre à jour l'interface utilisateur si nécessaire
    } catch (error) {
      console.error(
        "Erreur lors du désabonnement:",
        error.response?.data?.message || error.message
      );
    }
  }

  async function onFollowUser(userId, isFollowing) {
    let success;

    if (isFollowing) {
      success = await followUser(userId); // Appelle la fonction de suivi
      
    } else {
      success = await unfollowUser(userId); // Appelle la fonction de désabonnement
    }
    if (success) {
      setFollowingsList((prev) =>
        isFollowing ? [...prev, userId] : prev.filter((id) => id !== userId)
      );
    }
  }

  return (
    <div className="flex justify-between flex-col w-full gap-10 md:pb-63 md:px-0 pb-40 h-full overflow-y-scroll">
      {posts.length > 0 ? posts.map((post, index) => {
        const notes = authorNotes[post.id] || "O";
        const isFollowing = followings.includes(post.Users.id);

        return (
          <PostCard
            key={post.id}
            post={post}
            utilisateur={post.Users}
            onAddToWishList={handleAddToWishList}
            notes={notes}
            onAddToFavoris={handleAddToFavoris}
            onReportUser={handleReportUser}
            isFollowing={isFollowing}
            onFollowUser={onFollowUser}
            connectedUser={connectedUser}
            // onFollowUser={followUser}
            // onUnFollowUser={unfollowUser}
          />
        );
      }) :
       <div >
          <p>It's quite there... </p>
       </div>
      }
    </div>
  );
}
