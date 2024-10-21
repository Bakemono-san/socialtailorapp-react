import React from "react";

const RankingComponent = ({ tailleur }) => {
  return (
    <tr className="bg-white border-b hover:bg-blue-50 transition duration-200 ease-in-out">
      <td className="h-14 w-14 p-2 border-r border-gray-200 flex justify-center items-center">
        <img
          src={tailleur.photoProfile}
          alt={`${tailleur.nom} Avatar`}
          className="rounded-full h-full w-full object-cover shadow-md"
        />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-800">{tailleur.nom} {tailleur.prenom}</td>
      <td className="px-6 py-4 text-gray-600 font-medium">{tailleur.rank}</td>
      <td className="px-6 py-4 font-bold text-gray-900">{tailleur.certificat !== "NULL" ? "NON" : "OUI"}</td>
    </tr>
  );
};

export default RankingComponent;
