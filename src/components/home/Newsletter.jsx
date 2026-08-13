// components/home/Newsletter/Newsletter.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // ← أضف هذا
import styles from './Newsletter.module.css';
import { FaPaperPlane, FaEnvelope, FaGift, FaShieldAlt } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const features = [
    {
      icon: <FaGift />,
      title: "Exclusive Deals",
      description: "Get special discounts and offers before anyone else",
      link: "/products?promotion=sale"
    },
    {
      icon: <FaEnvelope />,
      title: "Weekly Updates",
      description: "Stay informed about new products and trends",
      link: "/blog"
    },
    {
      icon: <FaShieldAlt />,
      title: "No Spam",
      description: "We respect your privacy and won't flood your inbox",
      link: "/privacy"
    }
  ];

  return (
    <section className={styles.newsletter} id="newsletter">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <div className={styles.badge}>Stay Updated</div>
            <h2 className={styles.title}>Join Our Newsletter</h2>
            <p className={styles.description}>
              Subscribe to our newsletter and be the first to know about exclusive deals, 
              new arrivals, and special promotions. Get 15% off your first order!
            </p>
            
            <div className={styles.features}>
              {features.map((feature, index) => (
                <Link to={feature.link} key={index} className={styles.feature}>
                  <div className={styles.featureIcon}>
                    {feature.icon}
                  </div>
                  <div className={styles.featureText}>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.formCard}>
              {isSubscribed ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>🎉</div>
                  <h3>Welcome to our community!</h3>
                  <p>Thank you for subscribing. Check your email for a special welcome gift.</p>
                </div>
              ) : (
                <>
                  <h3 className={styles.formTitle}>Get 15% Off</h3>
                  <p className={styles.formSubtitle}>Plus free shipping on your first order</p>
                  
                  <form onSubmit={handleSubmit} className={styles.newsletterForm}>
                    <div className={styles.inputGroup}>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.emailInput}
                      />
                      <button type="submit" className={styles.submitBtn}>
                        <FaPaperPlane className={styles.btnIcon} />
                        Subscribe
                      </button>
                    </div>
                  </form>
                  
                  <p className={styles.privacyNote}>
                    By subscribing, you agree to our Privacy Policy and consent to receive 
                    updates from our store.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;