import React from 'react';
import styles from './Features.module.css';
// استيراد أيقونات React Icons
import { FaShippingFast, FaHeadset, FaShieldAlt, FaExchangeAlt, FaGift, FaAward } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaShippingFast />,
      title: "FREE SHIPPING",
      description: "Free delivery on orders over $50"
    },
    {
      icon: <FaHeadset />,
      title: "24/7 SUPPORT",
      description: "Round-the-clock customer service"
    },
    {
      icon: <FaShieldAlt />,
      title: "SECURE PAYMENT",
      description: "100% secure payment processing"
    },
    {
      icon: <FaExchangeAlt />,
      title: "EASY RETURNS",
      description: "30-day hassle-free returns"
    },
    {
      icon: <FaGift />,
      title: "GIFT CARDS",
      description: "Perfect gifts for every occasion"
    },
    {
      icon: <FaAward />,
      title: "LOYALTY REWARDS",
      description: "Earn points with every purchase"
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feat}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;