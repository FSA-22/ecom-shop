'use client';

import Stripe from 'stripe';
import { Card, CardContent, CardTitle } from '../ui/card';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselProps = {
  products: Stripe.Product[];
};

const Carousel = ({ products }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      (prev - 1) % products.length < 0
        ? products.length - 1
        : (prev - 1) % products.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [products.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const delta = touchStartX.current - touchEndX.current;

    if (delta > 50) nextSlide();
    if (delta < -50) prevSlide();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <Card className="relative w-full max-w-7xl mx-auto overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {products.map((product) => {
          const price = product.default_price as Stripe.Price;
          return (
            <div
              key={product.id}
              className="w-full flex-shrink-0 flex flex-col items-center justify-center px-4 py-6"
            >
              <Link href={`/products/${product.id}`} className="group">
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="rounded-xl object-contain h-[200px] w-auto mx-auto group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-[200px] w-[300px] flex items-center justify-center text-gray-400 border rounded-xl">
                    No Image
                  </div>
                )}
              </Link>

              <CardContent className="text-center mt-4">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                {price?.unit_amount && (
                  <p className="text-sm text-gray-600 mt-1">
                    ₦ {price.unit_amount.toLocaleString()}
                  </p>
                )}
              </CardContent>
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-1 rounded-full shadow hover:bg-white z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-1 rounded-full shadow hover:bg-white z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-rose-300' : 'bg-rose-50'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </Card>
  );
};

export default Carousel;
