import Carousel from '@/components/carousel/Carousel';
import { Button } from '@/components/ui/button';
import { stripe } from '@/lib/stripe';
import Image from 'next/image';
import Link from 'next/link';

const ProductPage = async () => {
  const products = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 5,
  });

  const featuredProduct = products.data[0];

  return (
    <main className="w-full px-4 md:px-12 py-10 space-y-16">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Welcome to <span className="text-primary">ECO_Shop</span>
          </h1>
          <p className="text-lg text-gray-600">
            Discover the best products at unbeatable prices.
          </p>
          <Button asChild size="lg" className="text-white font-medium">
            <Link href="/products">Shop All Products</Link>
          </Button>
        </div>

        {/* Featured Product Image */}
        <div className="w-full h-[300px] md:h-[450px] relative rounded-2xl shadow-lg overflow-hidden">
          <Image
            src={featuredProduct?.images?.[0] || '/placeholder.jpg'}
            alt={featuredProduct?.name || 'Product'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </section>

      {/* Carousel Section */}
      <section className="w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Featured Products
        </h2>
        <Carousel products={products.data} />
      </section>
    </main>
  );
};

export default ProductPage;
