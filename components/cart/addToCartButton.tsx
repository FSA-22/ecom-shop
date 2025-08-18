'use client';

import { useCartStore } from '@/lib/store';
import React from 'react';
import { Button } from '../ui/button';

interface AddToCartButtonProps {
  price: {
    unit_amount: number | null;
  };
  product: {
    id: string;
    name: string;
    images?: string[];
  };
}

const AddToCartButton = ({ price, product }: AddToCartButtonProps) => {
  const { items, addItem, removeItem, clearCart } = useCartStore();

  const cartItem = items.find((item) => item.id === product.id);

  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddProduct = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount || 0,
      imgUrl: product.images ? product.images[0] : '',
      quantity: 1,
    });
  };

  const handleRemoveProduct = () => {
    if (quantity > 0) {
      removeItem(product.id);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Button onClick={handleRemoveProduct} variant={'outline'}>
        -
      </Button>
      <span className="font-semibold"> {quantity > 0 ? quantity : 0} </span>
      <Button
        variant={'ghost'}
        className="bg-rose-500 text-white hover:bg-white"
        onClick={handleAddProduct}
      >
        +
      </Button>
    </div>
  );
};

export default AddToCartButton;
