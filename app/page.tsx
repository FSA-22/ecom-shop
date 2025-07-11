import { stripe } from '../lib/stripe';

const Home = async () => {
  const products = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 5,
  });
  console.log(products);
  return <div>Home</div>;
};

export default Home;
