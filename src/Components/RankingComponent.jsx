// RankingComponent.js
import React from "react";

const RankingComponent = ({ tailleur }) => {
  return (
    // <p>TEST</p>
    <tr className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 transition ease-in-out duration-200">
      <td className="h-14 w-14 p-2 border-r border-gray-200 flex justify-center">
        <img
          src={tailleur.photoProfile}
          alt={`${tailleur.nom} Avatar`}
          className="rounded-full h-full w-full object-cover"
        />
      </td>

      <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">
        {tailleur.nom} {tailleur.prenom}
      </td>

      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
        {tailleur.rank}
      </td>

      <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">
        {tailleur.certificat !== "NULL" ? "NON" : "OUI"}
      </td>
    </tr>
  );
};

export default RankingComponent;
