'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCartStore } from '@/lib/store';
import { ArrowBigLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { checkoutAction } from '@/lib/checkoutAction';

const Checkout = () => {
  const { items, addItem, removeItem, clearCart } = useCartStore();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (total === 0) {
    return (
      <div className="font-semibold mt-10 mx-auto text-rose-500 w-full flex flex-col justify-center items-center">
        <h3 className="font-bold text-2xl text-gray-400">Cart is empty</h3>
        <Link
          href={'/products'}
          className="uppercase mt-10 flex items-center gap-2"
        >
          <ArrowBigLeft className="h-5 w-5" /> Go to Products page
        </Link>
      </div>
    );
  }

  return (
    <section className="p-6 max-w-2xl mx-auto flex flex-col items-center justify-center">
      <h1 className="flex justify-center mb-4 font-bold text-gray-500 text-2xl w-full">
        Checkout
      </h1>

      <Card className="w-full bg-rose-50">
        <CardHeader className="font-medium flex justify-center">
          Order summary
        </CardHeader>
        <CardContent className="font-medium flex justify-center">
          <ul className="w-full flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.id}>
                <div className="flex  space-y-3">
                  <span> {item.name}</span>
                  <span>
                    ₦ {((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <Button
                    onClick={() => removeItem(item.id)}
                    variant={'outline'}
                  >
                    -
                  </Button>
                  <span className="font-semibold">
                    {item.quantity > 0 ? item.quantity : 0}
                  </span>
                  <Button
                    variant={'ghost'}
                    className="bg-rose-500 text-white hover:bg-white"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
            <div className="border-t border-gray-300 my-4">
              <strong>Total: ₦{(total / 100).toFixed(2)}</strong>
            </div>
          </ul>
        </CardContent>
      </Card>

      <form action={checkoutAction} className="w-full mt-4">
        <input type="hidden" name="items" value={JSON.stringify(items)} />

        <Button
          type="submit"
          className="w-full bg-rose-500 hover:bg-white hover:text-rose-500"
        >
          Proceed to Payment
        </Button>

        <Button
          type="submit"
          variant={'outline'}
          className="w-full mt-4 hover:bg-white hover:text-rose-500"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </form>
    </section>
  );
};

export default Checkout;
