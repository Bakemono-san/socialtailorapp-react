import React, { useEffect, useState } from "react";
import RankingComponent from "../Components/RankingComponent";
import DataHandler from "../DataHandler";

const Ranking = () => {
  const [taillors, setTaillors] = useState([]);

  useEffect(() => {
    DataHandler.getDatas("http://localhost:3004/rang")
      .then((res) => setTaillors(res));
  }, []);

  return (
    <div className="classementTailleurs flex flex-col items-center gap-4 w-full p-4 h-full  bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Classement des Tailleurs</h1>
      <div className="relative overflow-x-auto w-full bg-white rounded-lg shadow-sm">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xl text-gray-800 uppercase bg-blue-500 text-white rounded-t-lg">
            <tr>
              <th scope="col" className="px-6 py-3">Photo</th>
              <th scope="col" className="px-6 py-3">Tailleur</th>
              <th scope="col" className="px-6 py-3">Classement</th>
              <th scope="col" className="px-6 py-3">Certificat</th>
            </tr>
          </thead>
          <tbody>
            {taillors.map((tailleur, index) => (
              <RankingComponent tailleur={tailleur} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
