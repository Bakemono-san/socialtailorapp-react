import React, { useState, useRef } from 'react';

export default function AchatCredit() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    paymentMethod: '',
  });

  const [credits, setCredits] = useState({ balance: 0, bonus: 5 });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setCredits((prevCredits) => ({
        ...prevCredits,
        balance: prevCredits.balance + parseInt(formData.amount, 10),
      }));
      setMessage('Recharge réussie ! Votre nouveau solde est ' + (credits.balance + parseInt(formData.amount, 10)) + ' crédits.');
      setLoading(false);
      setFormData({ name: '', email: '', amount: '', paymentMethod: '' });
    }, 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Section des cartes de crédit */}
        <div className="space-y-6">
          <h1 className='text-center text-3xl font-bold text-gray-800 mb-8'>
            Informations crédits disponibles
          </h1>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto'>
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500 transform hover:scale-105 transition-all">
              <div className="text-center">
                <span className="text-4xl">💳</span>
                <p className='text-slate-500 font-semibold mt-2'>Solde Crédit</p>
                <h2 className='font-bold text-3xl text-gray-800 mt-1'>{credits.balance} Crédit</h2>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500 transform hover:scale-105 transition-all">
              <div className="text-center">
                <span className="text-4xl">🎁</span>
                <p className='text-slate-500 font-semibold mt-2'>Bonus</p>
                <h2 className='font-bold text-3xl text-gray-800 mt-1'>{credits.bonus} Crédit</h2>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={scrollToForm}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transform hover:scale-105 transition-all"
            >
              Recharger maintenant
            </button>
          </div>
        </div>

        {/* Formulaire de recharge */}
        <div ref={formRef} className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recharger votre compte</h2>
            {message && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Entrez votre nom"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Entrez votre email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Montant</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Entrez le montant"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Moyen de paiement</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
                }`}
              >
                {loading ? 'Chargement...' : 'Recharger maintenant'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}