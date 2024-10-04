import React from "react";

const ValideBtn = ({ onClick}) => {
  return (
    <div>
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300"
        onClick={onClick}
      >
        Valider
      </button>
    </div>
  );
};

export default ValideBtn;
