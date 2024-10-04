import React from "react";
import ValideBtn from "../Components/ValideBtn";
import PanierComponent from "../Components/PanierComponent";

const Panier = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full p-4 h-[calc(100vh-200px)]">
      <h1 className="text-center">Récap Panier</h1>

      <div className="flex w-full gap-4 bg-white border rounded p-4 shadow">
        <div className="flex-grow-[6] bg-white-200 p-4 ">
          {/* <h2>Liste Articles</h2> */}
          <PanierComponent />
          <PanierComponent />
          <PanierComponent />
        </div>

        {/* <div className="flex-grow-[3] bg-white border rounded p-4 shadow" > */}
        <div
          className="flex-grow-[3] bg-white border rounded p-4 shadow"
          style={{ height: "200px" }}
        >
          <div className="recapHead flex justify-between">
            <div className="left">
              <p>Produits</p>
              <p>Livraison</p>
            </div>

            <div className="right">
              <p>40.000</p>
              <p>5000</p>
            </div>
          </div>

          <div className="recapSum flex justify-between">
            <div>
              <h3>Total</h3>
            </div>

            <div>
              <h3>45.000 Fr</h3>
            </div>
          </div>

          <div style={{ marginTop: 25 + "px" }}>
            <ValideBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
