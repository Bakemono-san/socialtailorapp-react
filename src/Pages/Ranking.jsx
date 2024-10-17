import React, { useEffect, useState } from "react";
import RankingComponent from "../Components/RankingComponent";
import DataHandler from "../DataHandler";

const Ranking = () => {

  const [taillors, setTaillors] = useState([]);

  useEffect(() => {
    DataHandler.getDatas("http://localhost:3004/rang")
      .then((res) => setTaillors(res))
    // .then(() => console.log(taillors));
  }, []);


  return (
    <div className="classementTailleurs items-center gap-4 w-full p-4 h-full">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Photo
              </th>
              <th scope="col" className="px-6 py-3">
                Tailleur
              </th>
              <th scope="col" className="px-6 py-3">
                Classemnt
              </th>
              <th scope="col" className="px-6 py-3">
                Note
              </th>
            </tr>
          </thead>
          <tbody>

            {taillors
              // .sort((a, b) => b.rank - a.rank)
              .map((tailleur, index) => (
                <RankingComponent tailleur={tailleur} key={index} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
