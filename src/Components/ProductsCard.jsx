import React from 'react';

const ProductsCard = ({ products }) => (
  <div className="p-4 bg-white shadow rounded">
    <h3 className="font-bold text-lg mb-2">Produits</h3>
    {products.length === 0 ? (
      <p>Aucun produit</p>
    ) : (
      products.map(product => (
        <div key={product.id} className="border-b py-2">
          <p>{product.name} - Prix : {product.price} FCFA</p>
        </div>
      ))
    )}
  </div>
);

export default ProductsCard;
