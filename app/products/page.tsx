import ProductsList from '@/components/products/ProductsList';
import stripe from '@/lib/stripe';
import React from 'react';

const Products = async () => {
  const products = await stripe.products.list({
    expand: ['data.default_price'],
  });
  return (
    <div>
      <h1 className="font-bold text-2xl text-gray-900">All Products</h1>
      <ProductsList products={products.data} />
    </div>
  );
};

export default Products;
