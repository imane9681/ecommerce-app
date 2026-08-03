import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt, 
  FaCheckCircle, 
  FaArrowRight,
  FaLock,
  FaUserSecret,
  FaDatabase,
  FaCookie,
  FaEnvelope,
  FaPhone,
  FaGlobe
} from 'react-icons/fa';
import styles from './PrivacyPage.module.css';

const PrivacyPage = () => {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FaShieldAlt className={styles.heroBadgeIcon} />
            <span>Privacy Policy</span>
          </div>
          <h1 className={styles.heroTitle}>Your Privacy Matters</h1>
          <p className={styles.heroSubtitle}>
            We are committed to protecting your personal information and being transparent about how we use it.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.lastUpdated}>
            <strong>Last Updated:</strong> January 15, 2024
          </div>

          {/* Introduction */}
          <section className={styles.section}>
            <h2>Introduction</h2>
            <p>
              At SHOPPING, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you visit our website or make a purchase.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className={styles.section}>
            <h2>
              <FaDatabase className={styles.sectionIcon} />
              Information We Collect
            </h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3>Personal Information</h3>
                <ul>
                  <li>Name and contact details</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Shipping and billing addresses</li>
                  <li>Payment information</li>
                </ul>
              </div>
              <div className={styles.infoCard}>
                <h3>Usage Information</h3>
                <ul>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>IP address</li>
                  <li>Pages visited</li>
                  <li>Time and date of visits</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className={styles.section}>
            <h2>
              <FaUserSecret className={styles.sectionIcon} />
              How We Use Your Information
            </h2>
            <div className={styles.useGrid}>
              <div className={styles.useCard}>
                <FaCheckCircle className={styles.useIcon} />
                <div>
                  <h3>Process Orders</h3>
                  <p>To fulfill your purchases and send order confirmations</p>
                </div>
              </div>
              <div className={styles.useCard}>
                <FaCheckCircle className={styles.useIcon} />
                <div>
                  <h3>Improve Our Services</h3>
                  <p>To enhance your shopping experience and develop new features</p>
                </div>
              </div>
              <div className={styles.useCard}>
                <FaCheckCircle className={styles.useIcon} />
                <div>
                  <h3>Send Updates</h3>
                  <p>To keep you informed about products, offers, and promotions</p>
                </div>
              </div>
              <div className={styles.useCard}>
                <FaCheckCircle className={styles.useIcon} />
                <div>
                  <h3>Protect Security</h3>
                  <p>To prevent fraud and ensure the security of our platform</p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className={styles.section}>
            <h2>
              <FaCookie className={styles.sectionIcon} />
              Cookies
            </h2>
            <p>
              We use cookies to improve your browsing experience, analyze site traffic, and personalize content. 
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          {/* Security */}
          <section className={styles.section}>
            <h2>
              <FaLock className={styles.sectionIcon} />
              Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your personal information. 
              All payment transactions are encrypted using SSL technology.
            </p>
          </section>

          {/* Contact */}
          <section className={styles.section}>
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactItemIcon} />
                <span>privacy@shopping.com</span>
              </div>
              <div className={styles.contactItem}>
                <FaPhone className={styles.contactItemIcon} />
                <span>(607) 936-8058</span>
              </div>
              <div className={styles.contactItem}>
                <FaGlobe className={styles.contactItemIcon} />
                <span>419 State 414 Rte, Beaver Dams, NY 14812</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;