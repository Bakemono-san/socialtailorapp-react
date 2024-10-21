import React, { useEffect, useState } from "react";
import DataHandler from "../DataHandler";
import FollowingsCompo from "../Components/FollowingsCompo";

const Followings = () => {
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    DataHandler.getDatas("/following")
      .then((res) => {
        // Mettre à jour l'état avec les followers récupérés
        console.log(res);

        setFollowings(res.followings);
      })
      .catch((err) => console.error(err));
  }, []);


  async function unfollowUser(followerId) {
    console.log("Vous vous êtes désabonné de cet utilisateur !");
    // try {
    //   const data = { followerId };
    //   const response = await DataHandler.postData("/unfollowUser", data); // Utilisation de postData au lieu de deleteData pour passer des données
    //   console.log(response.message); // Affiche le message de succès ou d'erreur
    //   // Mettre à jour l'interface utilisateur si nécessaire
    // } catch (error) {
    //   console.error(
    //     "Erreur lors du désabonnement:",
    //     error.response?.data?.message || error.message
    //   );
    // }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-blue-600 uppercase tracking-wide mb-6">
        Vous suivez:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {followings.length > 0 ? (
          // Mapper directement dans le return et passer chaque follower à MyFollowersCompo
          followings.map((following, index) => {
            return (
              <FollowingsCompo
                key={index}
                following={following.Users_Followers_followerIdToUsers}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500">
            Vous ne suivez aucun tailleur actuellement...
          </p>
        )}
      </div>
    </>
  );
};

export default Followings;
