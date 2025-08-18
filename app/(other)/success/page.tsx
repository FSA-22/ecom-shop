'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

export default function SuccessPage() {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Payment Successful!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase, your order is being processed.{' '}
      </p>
      <Link
        href="/products"
        className="bg-rose-500 text-white px-4 py-2 rounded-lg shadow hover:bg-rose-500"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
