import { notFound } from 'next/navigation';
import Image from 'next/image';
import Stripe from 'stripe';
import { Button } from '@/components/ui/button';

interface Props {
  params: { id: string };
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export default async function ProductDetailsPage({ params }: Props) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ['default_price'],
  });

  if (!product) return notFound();

  const price = product.default_price as Stripe.Price;

  return (
    <div className="p-6 max-w-6xl flex items-center justify-between">
      {product.images?.[0] && (
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={300}
          className="rounded-lg mb-4 object-contain"
        />
      )}
      <div>
        <h2 className="text-2xl font-semibold">{product.name}</h2>

        {product.description && (
          <p className="text-gray-700">{product.description}</p>
        )}

        {price?.unit_amount && (
          <p className="text-lg text-gray-700 mb-2">
            ₦{price.unit_amount.toLocaleString()}
          </p>
        )}

        <Button variant="outline" className="cursor-pointer">
          -
        </Button>
        <span className="font-medium text-rose-500 mx-2">{0}</span>
        <Button variant="outline" className="cursor-pointer">
          +
        </Button>
      </div>
    </div>
  );
}
