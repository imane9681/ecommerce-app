// components/home/Features/Features.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // ← أضف هذا
import styles from './Features.module.css';
import { 
  FaShippingFast, FaHeadset, FaShieldAlt, FaExchangeAlt, FaGift, FaAward 
} from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaShippingFast />,
      title: "FREE SHIPPING",
      description: "Free delivery on orders over $50",
      link: "/products?availability=in-stock"  // ← أضف
    },
    {
      icon: <FaHeadset />,
      title: "24/7 SUPPORT",
      description: "Round-the-clock customer service",
      link: "/contact"  // ← أضف
    },
    {
      icon: <FaShieldAlt />,
      title: "SECURE PAYMENT",
      description: "100% secure payment processing",
      link: "/privacy"  // ← أضف
    },
    {
      icon: <FaExchangeAlt />,
      title: "EASY RETURNS",
      description: "30-day hassle-free returns",
      link: "/returns"  // ← أضف
    },
    {
      icon: <FaGift />,
      title: "GIFT CARDS",
      description: "Perfect gifts for every occasion",
      link: "/products?promotion=sale"  // ← أضف
    },
    {
      icon: <FaAward />,
      title: "LOYALTY REWARDS",
      description: "Earn points with every purchase",
      link: "/register"  // ← أضف
    }
  ];

  const scrollContainerRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const updateActiveDot = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const itemWidth = container.scrollWidth / features.length;
    const activeIndex = Math.round(scrollLeft / itemWidth);
    setActiveDot(Math.min(activeIndex, features.length - 1));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateActiveDot);
      window.addEventListener('resize', updateActiveDot);
      setTimeout(updateActiveDot, 100);
      return () => {
        container.removeEventListener('scroll', updateActiveDot);
        window.removeEventListener('resize', updateActiveDot);
      };
    }
  }, []);

  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        {/* ===== تصميم الحاسوب (شبكة) ===== */}
        <div className={styles.featuresDesktop}>
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className={styles.feat}>
              <div className={styles.iconWrapper}>
                <div className={styles.icon}>
                  {feature.icon}
                </div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>
                  {feature.title}
                </h3>
                <p className={styles.description}>
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ===== تصميم الهاتف (شريط أفقي) ===== */}
        <div className={styles.featuresMobile}>
          <div className={styles.mobileScrollWrapper}>
            <div 
              className={styles.mobileScrollContainer}
              ref={scrollContainerRef}
            >
              <div className={styles.mobileFeaturesList}>
                {features.map((feature, index) => (
                  <Link to={feature.link} key={index} className={styles.mobileFeat}>
                    <div className={styles.mobileIcon}>
                      {feature.icon}
                    </div>
                    <span className={styles.mobileTitle}>
                      {feature.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* ===== مؤشر التمرير (نقاط) ===== */}
          <div className={styles.scrollIndicators}>
            {features.map((_, index) => (
              <span 
                key={index} 
                className={`${styles.scrollDot} ${index === activeDot ? styles.active : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;