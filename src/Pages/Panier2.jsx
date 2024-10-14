import React from "react";
import ValideBtn from "../Components/ValideBtn";
import PanierComponent from "../Components/PanierComponent";

const Panier = () => {
  // Dynamisation des produits dans le panier
  const produits = [
    { id: 1, photo: "https://link.to/image1", nom: "Produit 1", prix: 10000 },
    { id: 2, photo: "https://link.to/image2", nom: "Produit 2", prix: 15000 },
    { id: 3, photo: "https://link.to/image3", nom: "Produit 3", prix: 20000 },
    { id: 3, photo: "https://link.to/image3", nom: "Produit 3", prix: 20000 },
    { id: 3, photo: "https://link.to/image3", nom: "Produit 3", prix: 20000 },
    { id: 3, photo: "https://link.to/image3", nom: "Produit 3", prix: 20000 },
    { id: 3, photo: "https://link.to/image3", nom: "Produit 3", prix: 20000 },
    { id: 3, photo: "https://link.to/image3", nom: "Produit 3", prix: 20000 },
    { id: 3, photo: "https://link.to/image3", nom: "Produit 3", prix: 20000 },
    { id: 3, photo: "https://link.to/image3", nom: "Produit 3", prix: 20000 },
    { id: 3, photo: "https://link.to/image3", nom: "Produit 3", prix: 20000 },
    { id: 3, photo: "https://link.to/image3", nom: "Produit 3", prix: 20000 }
  ];

  return (
    <div className="h-full overflow-hidden p-6 bg-gray-50 flex flex-col gap-4 xl:flex-row">
      <div className="h-full overflow-y-auto w-full flex flex-col gap-4">
        {produits.map((produit) => (
          <PanierComponent
            key={produit.id}
            photo={produit.photo}
            nom={produit.nom}
            prix={produit.prix}
          />
        ))}
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
          <ValideBtn onClick={() => alert("Commande validée !")} />
        </div>
      </div>
    </div>
  );
};

export default Panier;
