import Link from 'next/link';
import Stripe from 'stripe';
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';

interface ProductListProps {
  product: Stripe.Product;
}
const ProductCard = ({ product }: ProductListProps) => {
  const price = product.default_price as Stripe.Price;
  return (
    <Link href={'/products/1'}>
      <Card>
        <div>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={200}
            className="rounded-2xl mx-auto max-h-[250px] object-contain"
          />
        </div>
        <CardHeader className="font-medium text-lg text-gray-800 ml-4">
          {product.name}
        </CardHeader>
        <CardContent>
          {product.description && (
            <p className="text-xs text-gray-600 mb-3 ml-4">
              {product.description}
            </p>
          )}
          {price?.unit_amount && (
            <p className="text-lg text-gray-600 ml-4">
              ₦ {price.unit_amount.toLocaleString()}
            </p>
          )}
          <Button className="mt-2 text-left hover:bg-rose-500 hover:text-white bg-white text-rose-500">
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
