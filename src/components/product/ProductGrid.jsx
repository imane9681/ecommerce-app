import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ title = "Featured Products", products }) => {
  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h1>{title}</h1>
        <p>All the latest picked from designer of our store</p>
      </div>

      <div className={styles.productCenter}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;