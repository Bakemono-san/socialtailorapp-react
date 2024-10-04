import React, { useState } from 'react';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuler une opération de recharge (ajouter un délai)
    setTimeout(() => {
      setCredits((prevCredits) => ({
        ...prevCredits,
        balance: prevCredits.balance + parseInt(formData.amount, 10),
      }));
      setMessage('Recharge réussie ! Votre nouveau solde est ' + (credits.balance + parseInt(formData.amount, 10)) + ' crédits.');
      setLoading(false);
      setFormData({ name: '', email: '', amount: '', paymentMethod: '' }); // Réinitialiser le formulaire
    }, 2000);
  };

  return (
    <div className='p-6 mx-4 w-full bg-gradient-to-br from-blue-200 to-purple-300 min-h-screen animate-pulse'>
      {/* Titre principal */}
      <h1 className='text-center text-3xl font-bold text-gray-800 mb-8 drop-shadow-md animate-fade-in'>Informations crédits disponibles</h1>
      
      {/* Cartes de solde et de bonus */}
      <div className='flex space-x-8 justify-center mb-10'>
        <div className="card bg-white w-80 shadow-lg rounded-lg border-l-4 border-blue-500 transition-transform transform hover:scale-105 animate-pulse">
          <div className="card-body text-center">
            <span className="text-5xl text-blue-500">💳</span>
            <p className='text-slate-500 text-lg font-semibold'>Solde Crédit</p>
            <h1 className='font-extrabold text-4xl text-gray-800 mt-2'>{credits.balance} Crédit</h1>
          </div>
        </div>

        <div className="card bg-white w-80 shadow-lg rounded-lg border-l-4 border-green-500 transition-transform transform hover:scale-105 animate-pulse">
          <div className="card-body text-center">
            <span className="text-5xl text-green-500">🎁</span>
            <p className='text-slate-500 text-lg font-semibold'>Bonus</p>
            <h1 className='font-extrabold text-4xl text-gray-800 mt-2'>{credits.bonus} Crédit</h1>
          </div>
        </div>
      </div>        

      {/* Section de recharge */}
      <div className='text-center mb-8'>
        <h1 className='font-extrabold text-2xl text-gray-700 animate-fade-in'>Recharger mon compte</h1>
        <p className='text-gray-600 mt-2 animate-fade-in'>Remplir le formulaire pour recharger votre crédit</p>
      </div>

      {/* Formulaire de recharge */}
      <div className="container mx-auto">
        <div className="card lg:card-side bg-white shadow-xl w-full max-w-lg mx-auto rounded-lg animate-fade-in">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold mb-4 text-gray-700">Recharger votre compte</h2>
            {message && <div className="mb-4 text-green-600">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-gray-600">Nom complet</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Entrez votre nom" 
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-gray-600">Adresse e-mail</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Entrez votre e-mail" 
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-gray-600">Montant à recharger</span>
                </label>
                <input 
                  type="number" 
                  name="amount"
                  placeholder="Entrez le montant" 
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text text-gray-600">Moyen de paiement</span>
                </label>
                <select 
                  name="paymentMethod"
                  className="select select-bordered w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Choisir un moyen de paiement</option>
                  <option>Carte de crédit</option>
                  <option>PayPal</option>
                  <option>Virement bancaire</option>
                </select>
              </div>

              <div className="card-actions justify-end">
                <button 
                  type="submit" 
                  className={`btn btn-primary w-full py-3 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition duration-300 text-white font-semibold rounded-md shadow-md transform hover:scale-105`} 
                  disabled={loading}
                >
                  {loading ? 'Chargement...' : 'Recharger'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

// Ajout des animations CSS
const styles = `
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease forwards;
}

.animate-pulse {
  animation: pulse 2s infinite;
}
`

// Ajouter les styles à la tête du document
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`)
