import React from "react";
import RankingComponent from "../Components/RankingComponent";

const Ranking = () => {
  // Liste de données fictives pour le classement
  const classement = [
    { position: 1, nom: "Baba Ndiaye", note: 150 },
    { position: 2, nom: "Diop Fashion", note: 130 },
    { position: 3, nom: "Dija shop", note: 120 },
    { position: 4, nom: "Mbaye Style", note: 100 },
    { position: 5, nom: "Fatou Nice", note: 90 },
  ];

  return (
    <div>
      {/* <div>
        <select className="select select-bordered w-full max-w-xs bg-slate-500">
          <option disabled selected>
            Who shot first?
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div> */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              {/* <th></th> */}
              <th className="text-lg">Position</th>
              <th className="text-lg">Nom</th>
              <th className="text-lg">Note</th>
            </tr>
          </thead>
          <tbody>
            {classement.map((person, index) => (
              <RankingComponent
                key={index}
                position={person.position}
                nom={person.nom}
                note={person.note}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
