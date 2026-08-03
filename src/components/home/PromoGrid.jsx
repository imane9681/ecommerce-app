// components/home/PromoGrid/PromoGrid.jsx
import React from 'react';
import styles from './PromoGrid.module.css';

const PromoGrid = () => {
  const promotions = [
    {
      id: 1,
      type: 'new',
      title: 'Just Arrived',
      description: 'Fresh styles for the season ahead',
      buttonText: 'Explore',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 2,
      type: 'sale',
      title: 'Up to 60% OFF',
      description: 'Limited time offers on selected items',
      buttonText: 'Shop Sale',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 3,
      type: 'premium',
      title: 'Luxury Edition',
      description: 'Exclusive premium collection',
      buttonText: 'Discover',
      gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
    }
  ];

  return (
    <div className={styles.promoGrid}>
      {promotions.map((promo) => (
        <div 
          key={promo.id}
          className={styles.promoItem}
          style={{ background: promo.gradient }}
        >
          <div className={styles.promoContent}>
            <span className={styles.promoBadge}>
              {promo.type === 'new' && 'New'}
              {promo.type === 'sale' && 'Sale'}
              {promo.type === 'premium' && 'Premium'}
            </span>
            <h3 className={styles.promoTitle}>{promo.title}</h3>
            <p className={styles.promoDescription}>{promo.description}</p>
            <button className={styles.promoButton}>
              {promo.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoGrid;