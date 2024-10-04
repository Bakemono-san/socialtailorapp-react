import React from "react";

const RankingComponent = ({ position, nom, note }) => {
  return (
    <>
      <tr className="border-b">
        <td className="py-4 px-6">{position}</td>
        <td className="py-4 px-6">{nom}</td>
        <td className="py-4 px-6">{note}</td>
      </tr>
    </>
  );
};

export default RankingComponent;
