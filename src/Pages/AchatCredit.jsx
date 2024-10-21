import React, { useState } from 'react';


export default function RechargeForm() {
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: '',
  });

  const [credits, setCredits] = useState({ balance: "..." });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3004/recharge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // ID de l'utilisateur (récupéré dynamiquement)
          amount: parseInt(formData.amount, 10),
          paymentMethod: formData.paymentMethod,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCredits((prevCredits) => ({
          ...prevCredits,
          balance: data.newBalance,
        }));
        setMessage(`Recharge réussie ! Votre nouveau solde est de ${data.newBalance} crédits.`);
      } else {
        setMessage(data.error || 'Une erreur est survenue.');
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur.');
    } finally {
      setLoading(false);
      setFormData({ amount: '', paymentMethod: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex-1 p-8 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
          <h2 className="text-xl font-semibold">Solde Actuel</h2>
          <p className="mt-2 text-5xl font-extrabold">{credits.balance} Crédits</p>
          <p className="mt-4 text-lg">Rechargez votre compte pour consulter votre solde actuel .</p>
        </div>

        <div className="md:flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-800">Rechargez vos Crédits</h1>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Montant</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Entrez le montant"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Moyen de paiement</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                <option value="">Sélectionnez un moyen de paiement</option>
                <option value="card">Carte bancaire</option>
                <option value="paypal">PayPal</option>
                <option value="transfer">Virement bancaire</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition-colors ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? 'Traitement en cours...' : 'Recharger Maintenant'}
            </button>
          </form>
          
          {message && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
