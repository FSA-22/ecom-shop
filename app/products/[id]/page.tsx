'use client';

import { notFound, useParams } from 'next/navigation';
import { useStripeProductsStore } from '@/lib/store';
import Image from 'next/image';
import Stripe from 'stripe';

interface Props {
  params: { id: string };
}

export default function ProductDetailsPage({ params }: Props) {
  const { id } = useParams();

  const product = useStripeProductsStore((state) =>
    state.getProductById(id as string),
  );

  if (!product) return notFound();

  const price = product.default_price as Stripe.Price;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      {product.images?.[0] && (
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={300}
          className="rounded-lg mb-4 object-contain"
        />
      )}

      {price?.unit_amount && (
        <p className="text-lg text-gray-700">
          ₦ {price.unit_amount.toLocaleString()}
        </p>
      )}
    </div>
  );
}
