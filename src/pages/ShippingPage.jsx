import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShippingFast, 
  FaCheckCircle, 
  FaArrowRight,
  FaClock,
  FaBox,
  FaTruck,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaDollarSign,
  FaBoxOpen
} from 'react-icons/fa';
import styles from './ShippingPage.module.css';

const ShippingPage = () => {
  const shippingMethods = [
    {
      icon: <FaTruck />,
      name: "Standard Shipping",
      time: "3-5 Business Days",
      price: "$5.99",
      free: "Free on orders over $50"
    },
    {
      icon: <FaShippingFast />,
      name: "Express Shipping",
      time: "1-2 Business Days",
      price: "$12.99",
      free: null
    },
    {
      icon: <FaGlobe />,
      name: "International Shipping",
      time: "7-14 Business Days",
      price: "$19.99",
      free: null
    }
  ];

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FaShippingFast className={styles.heroBadgeIcon} />
            <span>Shipping Information</span>
          </div>
          <h1 className={styles.heroTitle}>Fast & Reliable Shipping</h1>
          <p className={styles.heroSubtitle}>
            We deliver your orders quickly and safely with multiple shipping options to choose from.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Shipping Methods */}
          <section className={styles.section}>
            <h2>Shipping Methods</h2>
            <div className={styles.methodsGrid}>
              {shippingMethods.map((method, index) => (
                <div key={index} className={styles.methodCard}>
                  <div className={styles.methodIcon}>{method.icon}</div>
                  <div className={styles.methodInfo}>
                    <h3>{method.name}</h3>
                    <div className={styles.methodDetails}>
                      <span className={styles.methodTime}>
                        <FaClock className={styles.methodDetailIcon} />
                        {method.time}
                      </span>
                      <span className={styles.methodPrice}>
                        <FaDollarSign className={styles.methodDetailIcon} />
                        {method.price}
                      </span>
                    </div>
                    {method.free && (
                      <div className={styles.methodFree}>{method.free}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping Policy */}
          <section className={styles.section}>
            <h2>Shipping Policy</h2>
            <div className={styles.policyGrid}>
              <div className={styles.policyCard}>
                <FaBoxOpen className={styles.policyIcon} />
                <div>
                  <h3>Processing Time</h3>
                  <p>Orders are processed within 24-48 hours</p>
                </div>
              </div>
              <div className={styles.policyCard}>
                <FaMapMarkerAlt className={styles.policyIcon} />
                <div>
                  <h3>Shipping Destinations</h3>
                  <p>We ship to the United States and internationally</p>
                </div>
              </div>
              <div className={styles.policyCard}>
                <FaCalendarAlt className={styles.policyIcon} />
                <div>
                  <h3>Delivery Times</h3>
                  <p>Delivery times vary based on the shipping method selected</p>
                </div>
              </div>
              <div className={styles.policyCard}>
                <FaBox className={styles.policyIcon} />
                <div>
                  <h3>Tracking</h3>
                  <p>All orders include tracking information sent via email</p>
                </div>
              </div>
            </div>
          </section>

          {/* International Shipping */}
          <section className={styles.section}>
            <h2>International Shipping</h2>
            <p>
              We ship to most countries worldwide. International shipping rates and delivery times vary 
              based on the destination and shipping method selected.
            </p>
            <div className={styles.internationalInfo}>
              <div className={styles.internationalItem}>
                <FaCheckCircle className={styles.internationalIcon} />
                <span>Customs fees may apply</span>
              </div>
              <div className={styles.internationalItem}>
                <FaCheckCircle className={styles.internationalIcon} />
                <span>Delivery times may vary</span>
              </div>
              <div className={styles.internationalItem}>
                <FaCheckCircle className={styles.internationalIcon} />
                <span>Tracking available for all orders</span>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className={styles.section}>
            <h2>Questions About Shipping?</h2>
            <p>If you have any questions about shipping, please contact us:</p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactItemIcon} />
                <span>shipping@shopping.com</span>
              </div>
              <div className={styles.contactItem}>
                <FaPhone className={styles.contactItemIcon} />
                <span>(607) 936-8058</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;