'use client';

import { useCartStore } from '@/lib/store';
import { ShoppingCart } from 'lucide-react';
import React from 'react';

const CartCount = () => {
  const { items } = useCartStore();

  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative text-rose-500 font-semibold flex items-center gap-1 justify-center">
      <ShoppingCart className="w-5 h-5" />
      <span className="absolute -top-2 left-2 font-normal text-[10px] text-black">
        {itemsCount > 0 && itemsCount}
      </span>
    </div>
  );
};

export default CartCount;
