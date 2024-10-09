import React from "react";
import NoteComponent from "../Components/NoteComponent";

const Notation = () => {
  const tailleurs = [
    {
      image:
        "https://res.cloudinary.com/dytchfsin/image/upload/v1728488365/persons/xs45tfdhcpkd2jxgoyor.jpg",
      description: "Dikha Shop",
      rank: 3,
    },

    {
      image:
        "https://res.cloudinary.com/dytchfsin/image/upload/v1728488361/persons/ocavdlfhkukmdb8w9jra.jpg",
      description: "Baye Mbaye Couture",
      rank: 2,
    },
    {
      image:
        "https://res.cloudinary.com/dytchfsin/image/upload/v1728488367/persons/pybmk26zm7kjk2kjgsml.jpg",
      description: "Mame Fatou Fashion",
      rank: 5,
    },
    
    

];

  return (
    <div>
      {tailleurs
        .sort((a, b) => b.rank - a.rank)
        .map((tailleur, index) => (
          <NoteComponent key={index} tailleur={tailleur} />
        ))}
    </div>
  );
};

export default Notation;
