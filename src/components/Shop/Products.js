import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_DATE = [
  {
    id: 'p1',
    price: 6,
    title: 'first book',
    description: 'the first book'
  },
  {
    id: 'p2',
    price: 5,
    title: 'second book',
    description: 'the second book'
  }
];

const Products = props => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATE.map(item => {
          return (
            <ProductItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
