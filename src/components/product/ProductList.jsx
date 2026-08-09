import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

const ProductList = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return (
      <div className={styles.noProducts}>
        <p>No products found. Please try a different category.</p>
      </div>
    );
  }

  return (
    <div className={styles.productCenter}>
      {products.map((product, index) => (
        <ProductCard key={product.id || index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;