// components/home/NewCollection/NewCollection.jsx
import React from 'react';
import { Link } from 'react-router-dom';  // ← أضف هذا
import styles from './NewCollection.module.css';

const NewCollection = () => {
  return (
    <div className={styles.newcol}>
      <div className={styles.newc}>
        <div>
          <img src="/images/capt-removebg-preview.png" className={styles.captr} alt="New Collection" />
        </div>
      </div>
      <div className={styles.rig}>
        <div className={styles.rep}>Trend Design</div>
        <div className={styles.repa}>New Collection 2024</div>
        <div className={styles.rep}>New Arrival Sale 50% OFF Limited Time Offer</div>
        <div className={styles.butt}>
          <Link to="/products?sort=newest&promotion=sale">
            <button className={styles.explore} type="submit">Discover Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewCollection;