import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faShoppingBag, faCalendar, faMapMarkerAlt, faBox, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DataHandler from '../DataHandler';

export default function ListCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const data = await DataHandler.getDatas('/commandes');
        setCommandes(data);
        setError(null);
      } catch (error) {
        setError("Une erreur est survenue lors du chargement des commandes.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommandes();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80">
        <FontAwesomeIcon icon={faSpinner} spin className="text-orange-500 text-4xl" />
      </div>
    );
  }

  const getStatusColor = (status) => {
    const statusColors = {
      payerPartiellement: 'bg-yellow-100 text-yellow-800',
      enCours: 'bg-blue-100 text-blue-800',
      livré: 'bg-green-100 text-green-800',
      annulé: 'bg-red-100 text-red-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return statusColors[status] || statusColors.default;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mes Commandes</h1>
          <p className="text-gray-600 text-sm mt-1">{commandes.length} commandes trouvées</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {commandes.map((commande) => (
            <div key={commande.id} 
                 className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-gray-900">
                        Commande #{commande.id}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(commande.status)}`}>
                        {commande.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Commandé le {new Date(commande.dateDeCommand).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-orange-500">
                      {commande.Models?.prix || 0}€
                    </p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-gray-100 pt-4">
                  {commande.Posts && (
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faShoppingBag} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{commande.Posts.titre}</p>
                      </div>
                    </div>
                  )}
                  
                  {commande.Models && (
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faBox} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">{commande.Models.libelle}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCalendar} className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Livraison prévue le {new Date(commande.dateLivraison).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">{commande.adresseLivraison}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 flex items-center justify-center gap-2 text-orange-500 hover:text-orange-600 transition-colors">
                  <span className="text-sm font-medium">Voir les détails</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {commandes.length === 0 && (
          <div className="text-center py-12">
            <FontAwesomeIcon icon={faShoppingBag} className="text-gray-300 text-5xl mb-4" />
            <p className="text-gray-500">Vous n'avez pas encore de commandes</p>
          </div>
        )}
      </div>
    </div>
  );
}