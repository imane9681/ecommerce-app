// components/home/HeroBanner/HeroBanner.jsx
import React from 'react';
import styles from './HeroBanner.module.css';

const HeroBanner = ({ 
  title = "Summer Collection 2024",
  description = "Discover our exclusive summer lineup with premium quality and exceptional designs",
  badge = "Limited Time",
  primaryButton = "Shop Collection",
  secondaryButton = "View Lookbook",
  imageUrl = "/images/hero-banner.jpg"
}) => {
  return (
    <div className={styles.heroBanner}>
      <div className={styles.bannerContent}>
        <span className={styles.bannerBadge}>{badge}</span>
        <h1 className={styles.bannerTitle}>{title}</h1>
        <p className={styles.bannerDescription}>{description}</p>
        <div className={styles.bannerActions}>
          <button className={`${styles.bannerButton} ${styles.primary}`}>
            {primaryButton}
          </button>
          <button className={`${styles.bannerButton} ${styles.outline}`}>
            {secondaryButton}
          </button>
        </div>
        <div className={styles.bannerFeatures}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>Free Shipping</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>30-Day Returns</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>Premium Quality</span>
          </div>
        </div>
      </div>
      <div className={styles.bannerImage}>
        <img src={imageUrl} alt={title} />
      </div>
    </div>
  );
};

export default HeroBanner;