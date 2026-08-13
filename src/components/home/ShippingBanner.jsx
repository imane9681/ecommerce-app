// components/home/ShippingBanner/ShippingBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';  // ← أضف هذا
import styles from './ShippingBanner.module.css';

const ShippingBanner = ({ 
  minAmount = 200,
  currency = "$",
  icon = "🚚"
}) => {
  return (
    <Link to="/products?availability=in-stock" className={styles.shippingBanner}>
      <div className={styles.bannerIcon}>
        {icon}
      </div>
      <div className={styles.bannerContent}>
        <h3 className={styles.bannerTitle}>Free Shipping</h3>
        <p className={styles.bannerDescription}>
          On all orders over {currency}{minAmount}
        </p>
      </div>
    </Link>
  );
};

export default ShippingBanner;