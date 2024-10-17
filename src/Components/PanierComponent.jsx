import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const PanierComponent = (props) => {
  return (
    <div className="flex justify-between items-center w-full h-28 p-4 md:p-2 bg-gray-50 rounded-lg border border-gray-200 shadow-sm ">
      <div className="flex items-center gap-4">
        <img src={props.photo} alt="article" className="h-20 w-20 rounded-lg" />
        <div className="flex flex-col">
          <p className="text-gray-800 font-semibold">New Model</p>
          <div className="flex items-center gap-2">
            <label htmlFor="quantity" className="text-gray-600">
              Qté
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="border border-gray-300 rounded-lg px-2 py-1 w-16 text-center"
              min="1"
              defaultValue="1"
            />
          </div>
        </div>
      </div>
      

      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-800 font-semibold">10.000 Fr</p>
        <FontAwesomeIcon
          icon={faTrash}
          className="text-red-500 cursor-pointer hover:text-red-700"
        />
      </div>
    </div>
  );
};

export default PanierComponent;
