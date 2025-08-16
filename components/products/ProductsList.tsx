import Stripe from 'stripe';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Stripe.Product[];
}
const ProductsList = ({ products }: ProductListProps) => {
  return (
    <div className="w-full">
      <div className="w-full text-rose-500 my-4 bg-rose-50 px-4 py-2 rounded-lg">
        <input
          type="text"
          placeholder="Search products..."
          className="text-xl w-full outline-0"
        />
      </div>
      <ul className="space-y-2">
        {products.map((product, index) => (
          <li key={index}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
