'use server';
import stripe from './stripe';

import { redirect } from 'next/navigation';
import { CartItem } from './store';

export const checkoutAction = async (formData: FormData): Promise<void> => {
  const itemsJson = formData.get('items') as string;
  const items = JSON.parse(itemsJson);
  const line_items = items.map((item: CartItem) => {
    return {
      price_data: {
        currency: 'ngn',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  redirect(session.url || '/checkout');
};
