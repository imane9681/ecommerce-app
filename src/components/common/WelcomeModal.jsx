import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTimes, 
  FaGift, 
  FaShippingFast, 
  FaShieldAlt, 
  FaHeadset,
  FaArrowRight,
  FaStore,
  FaCheckCircle,
  FaStar,
  FaTrophy
} from 'react-icons/fa';
import styles from './WelcomeModal.module.css';

const WelcomeModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Always show the welcome modal on each full page load (no localStorage gating)
    const timer = setTimeout(() => {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }, 800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    document.body.style.overflow = 'unset';
    // Do not persist 'hasSeenWelcome' so the modal shows on each page load
    if (onClose) onClose();
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      // حفظ الإيميل في localStorage
      localStorage.setItem('userEmail', email);
      setTimeout(() => {
        setIsSubscribed(false);
        handleClose();
      }, 2000);
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={handleClose}>
          <FaTimes />
        </button>

        {/* Modal Body */}
        <div className={styles.modalBody}>
          {/* Left Section - Decoration */}
          <div className={styles.modalLeft}>
            <div className={styles.decoration}>
              <div className={styles.decorationCircle1}></div>
              <div className={styles.decorationCircle2}></div>
              <div className={styles.decorationCircle3}></div>
              <div className={styles.decorationIcon}>
                <FaStore />
              </div>
            </div>
            <div className={styles.leftContent}>
              <h2>Welcome to</h2>
              <h1>SHOPPING</h1>
              <p>Your premium online shopping destination</p>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className={styles.modalRight}>
            <div className={styles.modalHeader}>
              <div className={styles.headerBadge}>
                <FaGift className={styles.badgeIcon} />
                <span>Welcome Offer</span>
              </div>
              <h2 className={styles.modalTitle}>
                Get <span className={styles.highlight}>15% OFF</span> Your First Order
              </h2>
              <p className={styles.modalSubtitle}>
                Subscribe to our newsletter and receive exclusive offers, new arrivals, and special promotions.
              </p>
            </div>

            {/* Features */}
            <div className={styles.features}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <FaShippingFast />
                </div>
                <div>
                  <h4>Free Shipping</h4>
                  <p>On orders over $50</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <FaShieldAlt />
                </div>
                <div>
                  <h4>Secure Payment</h4>
                  <p>100% safe transactions</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <FaHeadset />
                </div>
                <div>
                  <h4>24/7 Support</h4>
                  <p>Always here to help</p>
                </div>
              </div>
            </div>

            {/* Newsletter Form */}
            {isSubscribed ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <FaCheckCircle />
                </div>
                <h3>Welcome Aboard! 🎉</h3>
                <p>Check your email for your 15% discount code!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
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
                    <span>Claim Offer</span>
                    <FaArrowRight className={styles.btnIcon} />
                  </button>
                </div>
                <div className={styles.formFooter}>
                  <label className={styles.checkboxContainer}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.customCheckbox}></span>
                    I agree to receive promotional emails
                  </label>
                </div>
              </form>
            )}

            {/* Skip Link */}
            <button className={styles.skipBtn} onClick={handleSkip}>
              No thanks, I'll shop later
            </button>

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              <div className={styles.trustItem}>
                <FaTrophy className={styles.trustIcon} />
                <span>Trusted Store</span>
              </div>
              <div className={styles.trustItem}>
                <FaStar className={styles.trustIcon} />
                <span>4.8/5 Rating</span>
              </div>
              <div className={styles.trustItem}>
                <FaCheckCircle className={styles.trustIcon} />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;