import React, { useEffect, useState } from "react";
import RankingComponent from "../Components/RankingComponent";
import DataHandler from "../DataHandler";

const Ranking = () => {
  // Liste de données fictives pour le classement
  // const classement = [
  //   {
  //     position: 2,
  //     photo: "https://img.daisyui.com/images/profile/demo/3@94.webp",
  //     nom: "Diop Fashion",
  //     note: 130,
  //   },
  //   {
  //     position: 3,
  //     photo: "https://img.daisyui.com/images/profile/demo/4@94.webp",
  //     nom: "Dija shop",
  //     note: 120,
  //   },
  //   {
  //     position: 4,
  //     photo: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  //     nom: "Maman Nice",
  //     note: 100,
  //   },
  //   {
  //     position: 1,
  //     photo: "https://img.daisyui.com/images/profile/demo/2@94.webp",
  //     nom: "Baba Ndiaye",
  //     note: 150,
  //   },
  // ];

  const [taillors, setTaillors] = useState([]);

  useEffect(() => {
    DataHandler.getDatas("http://localhost:3004/rang")
      .then((res) => setTaillors(res))
      // .then(() => console.log(taillors));
  }, []);
  

  return (
    <div className="classementTailleurs items-center gap-4 w-full p-4 h-full">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xl text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Photo
              </th>
              <th scope="col" class="px-6 py-3">
                Tailleur
              </th>
              <th scope="col" class="px-6 py-3">
                Classemnt
              </th>
              <th scope="col" class="px-6 py-3">
                Note
              </th>
            </tr>
          </thead>
          {taillors
            // .sort((a, b) => b.rank - a.rank)
            .map((tailleur, index) => (
              <RankingComponent tailleur={tailleur} key={index} />
            ))}
        </table>
      </div>
    </div>
  );
};

export default Ranking;
