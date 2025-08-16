'use client';

import Stripe from 'stripe';
import ProductCard from './ProductCard';
import { useState } from 'react';

interface ProductListProps {
  products: Stripe.Product[];
}
const ProductsList = ({ products }: ProductListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descMatch = product.description
      ? product.description.toLowerCase().includes(searchTerm.toLowerCase())
      : false;

    return nameMatch || descMatch;
  });

  return (
    <div className="w-full">
      <div className="w-full text-rose-500 my-4 bg-rose-50 px-4 py-2 rounded-lg">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="text-xl w-full outline-0"
        />
      </div>
      <ul className="space-y-2">
        {filteredProducts.map((product, index) => (
          <li key={index}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
