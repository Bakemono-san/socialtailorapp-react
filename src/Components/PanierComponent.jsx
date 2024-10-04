import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faAppleAlt, faCoffee, faCarrot, faLeaf, faPepperHot, faPaperPlane, faArrowDownWideShort, faTShirt } from "@fortawesome/free-solid-svg-icons";

const PanierComponent = ({ articles }) => {
  return (
    <>
    <div className="articleInfos flex gap-4 w-full p-4 items-center">
      <div className="articleImg flex items-center justify-center flex-shrink-0">
      <FontAwesomeIcon
          icon={faTShirt}
          className="h-6 w-6 text-blue-500 cursor-pointer"
        />
      </div>

      <div className="articleInfos flex flex-col justify-center flex-grow">
        <p>New Model</p>
        <p>10.000</p>
      </div>

      <div className="articleQtePrize flex flex-between items-center justify-center flex-shrink-0">
        <label htmlFor="quantity">Qté</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className="bg-white border border-gray-300 rounded p-1 w-16 text-center"
          min="1"
          defaultValue="1"
        />
        <p>10.000 Fr</p>
      </div>

      <div className="deleteArticle flex items-center justify-center flex-shrink-0">
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
