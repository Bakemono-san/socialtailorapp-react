import React, { Suspense, useEffect, useState } from "react";
import ValideBtn from "../Components/ValideBtn";
import PanierComponent from "../Components/PanierComponent";
import LocalStorage from "../Utils/LocalStorage";
import DataHandler from "../DataHandler";


const Panier = () => {
  const [datas, setDatas] = useState(LocalStorage.get("commandes"))
  const [error, setError] = useState(null);
  const [Total, setTotal] = useState(0);
  const [deleted, setdeleted] = useState(null)

  const LazyComponent = React.lazy(() => import("../Components/Modals/ModalResponse"));

  const deleteCommande = (id) => {
    setDatas(LocalStorage.delete("commandes", id))
    setdeleted(id);
  }

  const handleCommande = () => {
    datas.forEach(post => {
      DataHandler.postData(`http://localhost:3004/commandes/post/${post.id}`, { adresseLivraison: "ouakam", dateLivraison: "12/02/2025" })
        .then(res => {
          alert(res)
        })
        .catch((err) => setError(err.response.data.message)
        )
    });
  }

  useEffect(() => {
    if (datas.length > 0) {

      const total = datas.reduce((acc, currentValue) => { return acc + currentValue.Models.prix }, 0);
      setTotal(total);
    } else {
      setTotal(0)
    }
  }, [datas])

  return (
    <div className="h-full overflow-hidden p-6 bg-gray-50 flex flex-col gap-4 xl:flex-row">
      {error &&
        <Suspense >
          <LazyComponent message={error} />
        </Suspense>
      }

      {deleted &&
        <Suspense >
          <LazyComponent message={`le model ${deleted} a ete supprimer avec succes`} />
        </Suspense>
      }

      {/* <div className="flex flex-col xl:flex-row w-full gap-6 bg-white border border-gray-200 rounded-lg p-6 shadow-md h-full justify-between"> */}
      <div className="h-full overflow-y-auto w-full flex flex-col gap-4">
        {
          datas.length > 0 && datas.map(commande => {
            return <PanierComponent key={commande.id} delete={() => deleteCommande(commande.id)} photo={commande.Models.contenu} nom={commande.Models.libelle} quantite={commande.quantite} prix={commande.Models.prix} />
          })
        }
        {/* <PanierComponent photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXKmrkeYk98gi3mtQyAiHGgI-EETx7oWLOQ&s" />
          <PanierComponent photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXKmrkeYk98gi3mtQyAiHGgI-EETx7oWLOQ&s" />
          <PanierComponent photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXKmrkeYk98gi3mtQyAiHGgI-EETx7oWLOQ&s" /> */}
      </div>

      <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-md w-full lg:min-w-48">
        <div className="recapHead flex justify-between mb-4">
          <div>
            <p className="text-gray-600 font-medium">Nombres de Produits</p>
            <p className="text-gray-600 font-medium">Livraison</p>
          </div>
          <div>
            <p className="text-gray-800 font-semibold">{datas.length > 0 ? datas.length : 0}</p>
            <p className="text-gray-800 font-semibold">5.000 Fr</p>
          </div>
        </div>

        <div className="recapSum flex justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Total</h3>
          <h3 className="text-lg font-bold text-gray-900">{Total} Fr</h3>
        </div>

        <div className="mt-4">
          <ValideBtn onClick={handleCommande} />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Panier;
