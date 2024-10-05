import React from "react";

const RankingComponent = ({ tailleur }) => {
  return (
    <>
      <tbody>
        <tr class="bg-white border-b dark:bg-white-800 dark:border-gray-700">
          
          
          <th className="mask mask-squircle h-10 w-10">
            <img
              src={tailleur.photo}
              alt="Avatar Tailwind CSS Component"
            />
          </th>

          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray"
          >
            {tailleur.position}
          </th>
          <td class="px-6 py-4">{tailleur.nom}</td>
          <td class="px-6 py-4">{tailleur.note}</td>
        </tr>
      </tbody>
    </>
  );
};

export default RankingComponent;
