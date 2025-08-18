import { notFound } from 'next/navigation';
import Image from 'next/image';
import Stripe from 'stripe';
import stripe from '@/lib/stripe';
import AddToCartButton from '@/components/cart/addToCartButton';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params; // 👈 await here

  const product = await stripe.products.retrieve(id, {
    expand: ['default_price'],
  });

  if (!product) return notFound();

  const price = product.default_price as Stripe.Price;

  return (
    <section className="p-6 max-w-6xl flex max-md:flex-col max-md:h-screen items-center h-[80vh] justify-between">
      {product.images?.[0] && (
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={300}
          className="rounded-lg mb-4 object-contain"
        />
      )}
      <div className="mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>

        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}

        {price?.unit_amount && (
          <p className="text-lg text-gray-700 mb-4">
            ₦{price.unit_amount.toLocaleString()}
          </p>
        )}
        <AddToCartButton
          price={{
            unit_amount: price?.unit_amount ?? 0,
          }}
          product={{
            id: product.id,
            name: product.name,
            images: product.images,
          }}
        />
      </div>
    </section>
  );
}
