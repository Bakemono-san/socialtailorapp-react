import React from "react";
import RankingComponent from "../Components/RankingComponent";

const Ranking = () => {
  // Liste de données fictives pour le classement
  const classement = [
    {
      position: 2,
      photo: "https://img.daisyui.com/images/profile/demo/3@94.webp",
      nom: "Diop Fashion",
      note: 130,
    },
    {
      position: 3,
      photo: "https://img.daisyui.com/images/profile/demo/4@94.webp",
      nom: "Dija shop",
      note: 120,
    },
    {
      position: 4,
      photo: "https://img.daisyui.com/images/profile/demo/5@94.webp",
      nom: "Maman Nice",
      note: 100,
    },
    {
      position: 1,
      photo: "https://img.daisyui.com/images/profile/demo/2@94.webp",
      nom: "Baba Ndiaye",
      note: 150,
    },
  ];

  return (
    <div className="classementTailleurs items-center gap-4 w-full p-4 h-[calc(100vh-300px)]">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xl text-gray-900 uppercase bg-gray-50 dark:bg-blue-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3 text-sm">
                Photo
              </th>
              <th scope="col" class="px-6 py-3 text-sm">
                Tailleur
              </th>
              <th scope="col" class="px-6 py-3 text-sm">
                Classemnt
              </th>
              <th scope="col" class="px-6 py-3 text-sm">
                Note
              </th>
            </tr>
          </thead>
          {classement
            .sort((a, b) => b.note - a.note)
            .map((tailleur, index) => (
              <RankingComponent tailleur={tailleur} key={index} />
            ))}
        </table>
      </div>
    </div>
  );
};

export default Ranking;
