'use client';

import Stripe from 'stripe';
import { Card, CardContent, CardTitle } from '../ui/card';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type CarouselProps = {
  products: Stripe.Product[];
};

const Carousel = ({ products }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000); // 4 seconds

    return () => clearInterval(timer);
  }, [products.length]);

  return (
    <Card className="relative overflow-hidden w-full max-w-6xl mx-auto min-h-[300px]">
      <div className="relative w-full h-[300px]">
        {products.map((product, index) => {
          const isVisible = index === currentIndex;
          const price = product.default_price as Stripe.Price;

          return (
            <div
              key={product.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isVisible
                  ? `opacity-100 z-${products.length + 20}`
                  : 'opacity-0 z-0'
              } flex items-center justify-center`}
            >
              <div className="text-center">
                {product.images && product.images[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="rounded-2xl mx-auto max-h-[250px] object-contain"
                  />
                )}
                <CardContent>
                  <CardTitle className="text-lg mt-4">{product.name}</CardTitle>
                  {price?.unit_amount && (
                    <p className="text-sm mt-1 text-gray-600">
                      ₦ {price.unit_amount.toLocaleString()}
                    </p>
                  )}
                </CardContent>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Carousel;
