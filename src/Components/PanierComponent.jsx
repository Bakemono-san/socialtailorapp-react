import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTShirt } from "@fortawesome/free-solid-svg-icons";

const PanierComponent = ({ articles }) => {
  return (
    <>
      <div className="articleInfos flex flex-wrap gap-4 w-full p-4 items-center">
        <div className="articleImg flex items-center justify-center flex-shrink-0 w-full sm:w-auto">
          <FontAwesomeIcon
            icon={faTShirt}
            className="h-6 w-6 text-blue-500 cursor-pointer"
          />
        </div>

        <div className="articleInfos flex flex-col justify-center flex-grow w-full sm:w-auto">
          <p className="text-sm sm:text-base">New Model</p>
          <p className="text-sm sm:text-base">10.000</p>
        </div>

        <div className="articleQtePrize flex items-center justify-center w-full sm:w-auto flex-shrink-0 gap-2">
          <label htmlFor="quantity" className="text-sm sm:text-base">
            Qté
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="bg-white border border-gray-300 rounded p-1 w-16 text-center"
            min="1"
            defaultValue="1"
          />
          <p className="text-sm sm:text-base">10.000 Fr</p>
        </div>

        <div className="deleteArticle flex items-center justify-center w-full sm:w-auto flex-shrink-0">
          <FontAwesomeIcon
            icon={faTrash}
            className="h-6 w-6 text-red-500 cursor-pointer"
          />
        </div>
      </div>
    </>

    //---------------------------------------
  );
};

export default PanierComponent;
