import React from 'react';

const OrdersCard = ({ orders }) => (
  <div className="p-4 bg-white shadow rounded">
    <h3 className="font-bold text-lg mb-2">Mes Commandes</h3>
    {orders.length === 0 ? (
      <p>Aucune commande</p>
    ) : (
      orders.map(order => (
        <div key={order.id} className="border-b py-2">
          <p>Commande #{order.id} - Statut : {order.status}</p>
        </div>
      ))
    )}
  </div>
);

export default OrdersCard;
