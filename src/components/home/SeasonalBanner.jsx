// components/home/SeasonalBanner/SeasonalBanner.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // ← أضف هذا
import { 
  FaArrowRight, FaClock, FaFire, FaStar, FaBolt, FaTag, 
  FaTruck, FaShieldAlt, FaGift, FaShippingFast, FaExchangeAlt 
} from 'react-icons/fa';
import styles from './SeasonalBanner.module.css';

const SeasonalBanner = ({ 
  season = "Winter",
  title = "Winter Essentials",
  description = "Get ready for the season with our exclusive collection. Limited time offers!",
  days = 5,
  imageUrl = "",
  discount = 60,
  badgeText = "Limited Time",
  ctaText = "Shop The Collection",
  noteText = "Free shipping + 30-day returns"
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);
    targetDate.setHours(23, 59, 59, 999);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [days]);

  // صور موسمية مناسبة للتجارة الإلكترونية
  const seasonalImages = {
    Winter: "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    Spring: "https://images.unsplash.com/photo-1520004434532-668416a08753?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    Summer: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    Fall: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  };

  const defaultImage = seasonalImages[season] || seasonalImages.Winter;
  const finalImageUrl = imageUrl || defaultImage;

  return (
    <div className={styles.seasonalBanner}>
      <div className={styles.backgroundEffects}>
        <div className={styles.gradientOrb}></div>
        <div className={styles.floatingElements}>
          <FaStar className={styles.floatingStar} />
          <FaStar className={styles.floatingStar} />
          <FaStar className={styles.floatingStar} />
        </div>
      </div>

      <div className={styles.bannerContent}>
        <div className={styles.textSection}>
          <div className={styles.header}>
            <div className={styles.badgeContainer}>
              <div className={styles.seasonBadge}>
                <FaFire className={styles.fireIcon} />
                <span>{badgeText}</span>
              </div>
              <div className={styles.seasonTag}>
                <FaTag className={styles.tagIcon} />
                <span>{season} Collection</span>
              </div>
            </div>
            
            <h2 className={styles.bannerTitle}>
              {title}
            </h2>
          </div>
          
          <p className={styles.bannerDescription}>
            {description}
          </p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <FaShippingFast />
              </div>
              <span>Free Shipping</span>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <FaShieldAlt />
              </div>
              <span>Secure Payment</span>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <FaExchangeAlt />
              </div>
              <span>Easy Returns</span>
            </div>
          </div>

          <div className={styles.timerSection}>
            <div className={styles.timerHeader}>
              <FaClock className={styles.clockIcon} />
              <span>Offer Ends In</span>
            </div>
            
            <div className={styles.promotionTimer}>
              <div className={styles.timerItem}>
                <span className={styles.timerNumber}>
                  {timeLeft.days.toString().padStart(2, '0')}
                </span>
                <span className={styles.timerLabel}>Days</span>
              </div>
              <div className={styles.timerColon}>:</div>
              <div className={styles.timerItem}>
                <span className={styles.timerNumber}>
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className={styles.timerLabel}>Hours</span>
              </div>
              <div className={styles.timerColon}>:</div>
              <div className={styles.timerItem}>
                <span className={styles.timerNumber}>
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className={styles.timerLabel}>Mins</span>
              </div>
              <div className={styles.timerColon}>:</div>
              <div className={styles.timerItem}>
                <span className={styles.timerNumber}>
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
                <span className={styles.timerLabel}>Secs</span>
              </div>
            </div>
          </div>

          <div className={styles.ctaContainer}>
            <Link to="/products?promotion=sale&sort=newest" className={styles.ctaButton}>
              <span>{ctaText}</span>
              <FaArrowRight className={styles.arrowIcon} />
            </Link>
            <div className={styles.ctaNote}>
              <FaBolt className={styles.noteIcon} />
              <span>{noteText}</span>
            </div>
          </div>
        </div>

        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <img 
                src={finalImageUrl}
                alt={`${season} Collection - ${title}`}
                className={styles.productImage}
                loading="lazy"
                onError={(e) => {
                  e.target.src = defaultImage;
                  e.target.alt = "Seasonal Collection";
                }}
              />
            </div>
            <div className={styles.discountBadge}>
              <span>SAVE UP TO</span>
              <strong>{discount}%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalBanner;