import React from "react";
import ValideBtn from "../Components/ValideBtn";
import PanierComponent from "../Components/PanierComponent";

const Panier = () => {
  return (
    <div className="h-full overflow-hidden p-6 bg-gray-50 flex flex-col gap-4 xl:flex-row">
      {/* <div className="flex flex-col xl:flex-row w-full gap-6 bg-white border border-gray-200 rounded-lg p-6 shadow-md h-full justify-between"> */}
        <div className="h-full overflow-y-auto w-full flex flex-col gap-4">
          <PanierComponent photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXKmrkeYk98gi3mtQyAiHGgI-EETx7oWLOQ&s" />
          <PanierComponent photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXKmrkeYk98gi3mtQyAiHGgI-EETx7oWLOQ&s" />
          <PanierComponent photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXKmrkeYk98gi3mtQyAiHGgI-EETx7oWLOQ&s" />
        </div>

        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-md w-full lg:min-w-48">
          <div className="recapHead flex justify-between mb-4">
            <div>
              <p className="text-gray-600 font-medium">Produits</p>
              <p className="text-gray-600 font-medium">Livraison</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold">40.000 Fr</p>
              <p className="text-gray-800 font-semibold">5.000 Fr</p>
            </div>
          </div>

          <div className="recapSum flex justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Total</h3>
            <h3 className="text-lg font-bold text-gray-900">45.000 Fr</h3>
          </div>

          <div className="mt-4">
            <ValideBtn />
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Panier;
