import React, { useEffect, useState } from "react";
import DataHandler from "../DataHandler";
import MyFollowersCompo from "../Components/MyFollowersCompo";

const MyFollowers = () => {
  const [myFollowers, setMyFollowers] = useState([]);

  useEffect(() => {
    // DataHandler.getDatas("/myFollowers")
    DataHandler.getDatas("/myFollowers")
      .then((res) => {
        // Mettre à jour l'état avec les followers récupérés
        console.log(res);

        setMyFollowers(res.followers);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-blue-600 uppercase tracking-wide mb-6">
        Vos Followers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {myFollowers.length > 0 ? (
          // Mapper directement dans le return et passer chaque follower à MyFollowersCompo
          myFollowers.map((follower, index) => {
            return (
              <MyFollowersCompo
                key={index}
                follower={follower.Users_Followers_userIdToUsers}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500">
            Vous n'avez pas encore de followers'
          </p>
        )}
      </div>
    </>
  );
};

export default MyFollowers;
