import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Stripe from 'stripe';

interface StripeStore {
  products: Stripe.Product[];
  setProducts: (products: Stripe.Product[]) => void;
  getProductById: (id: string) => Stripe.Product | undefined;
}

export const useStripeProductsStore = create<StripeStore>()(
  persist(
    (set, get) => ({
      products: [],
      setProducts: (products) => set({ products }),
      getProductById: (id) => get().products.find((p) => p.id === id),
    }),
    {
      name: 'stripe-products-storage',
      partialize: (state) => ({ products: state.products }), // only persist `products`
    },
  ),
);
