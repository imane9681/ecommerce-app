import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUndo, 
  FaCheckCircle, 
  FaArrowRight,
  FaClock,
  FaBox,
  FaTruck,
  FaCreditCard,
  FaQuestionCircle,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import styles from './ReturnsPage.module.css';

const ReturnsPage = () => {
  const steps = [
    {
      icon: <FaBox />,
      title: "Request Return",
      description: "Contact our support team to initiate your return request"
    },
    {
      icon: <FaUndo />,
      title: "Pack & Ship",
      description: "Pack the item securely and ship it back to us"
    },
    {
      icon: <FaCheckCircle />,
      title: "Inspection",
      description: "We'll inspect the returned item within 2-3 business days"
    },
    {
      icon: <FaCreditCard />,
      title: "Refund",
      description: "We'll process your refund to the original payment method"
    }
  ];

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FaUndo className={styles.heroBadgeIcon} />
            <span>Returns & Exchanges</span>
          </div>
          <h1 className={styles.heroTitle}>Hassle-Free Returns</h1>
          <p className={styles.heroSubtitle}>
            We want you to love your purchase. If something isn't right, we're here to help.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Policy Summary */}
          <div className={styles.policySummary}>
            <div className={styles.policyCard}>
              <FaClock className={styles.policyIcon} />
              <div>
                <h3>30-Day Return Policy</h3>
                <p>You have 30 days from delivery to request a return</p>
              </div>
            </div>
            <div className={styles.policyCard}>
              <FaCheckCircle className={styles.policyIcon} />
              <div>
                <h3>Full Refund</h3>
                <p>We offer full refunds on eligible items</p>
              </div>
            </div>
            <div className={styles.policyCard}>
              <FaTruck className={styles.policyIcon} />
              <div>
                <h3>Free Returns</h3>
                <p>Free shipping on returns for orders over $100</p>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <section className={styles.section}>
            <h2>How to Return an Item</h2>
            <p>Follow these simple steps to return your item:</p>
            <div className={styles.stepsGrid}>
              {steps.map((step, index) => (
                <div key={index} className={styles.stepCard}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Conditions */}
          <section className={styles.section}>
            <h2>Return Conditions</h2>
            <div className={styles.conditionsGrid}>
              <div className={styles.conditionCard}>
                <FaCheckCircle className={styles.conditionIcon} />
                <div>
                  <h3>Item Condition</h3>
                  <p>Items must be unused, unworn, and in original packaging with all tags attached</p>
                </div>
              </div>
              <div className={styles.conditionCard}>
                <FaCheckCircle className={styles.conditionIcon} />
                <div>
                  <h3>Proof of Purchase</h3>
                  <p>Please include your order confirmation or packing slip with the return</p>
                </div>
              </div>
              <div className={styles.conditionCard}>
                <FaCheckCircle className={styles.conditionIcon} />
                <div>
                  <h3>Return Shipping</h3>
                  <p>Customers are responsible for return shipping costs unless the item is defective</p>
                </div>
              </div>
              <div className={styles.conditionCard}>
                <FaCheckCircle className={styles.conditionIcon} />
                <div>
                  <h3>Processing Time</h3>
                  <p>Returns are processed within 3-5 business days of receipt</p>
                </div>
              </div>
            </div>
          </section>

          {/* Exceptions */}
          <section className={styles.section}>
            <h2>Non-Returnable Items</h2>
            <div className={styles.exceptionsList}>
              <div className={styles.exceptionItem}>
                <FaQuestionCircle className={styles.exceptionIcon} />
                <span>Personal care items</span>
              </div>
              <div className={styles.exceptionItem}>
                <FaQuestionCircle className={styles.exceptionIcon} />
                <span>Custom or personalized products</span>
              </div>
              <div className={styles.exceptionItem}>
                <FaQuestionCircle className={styles.exceptionIcon} />
                <span>Items marked as final sale</span>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className={styles.section}>
            <h2>Contact Us</h2>
            <p>For any questions about returns or exchanges, please contact us:</p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactItemIcon} />
                <span>returns@shopping.com</span>
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

export default ReturnsPage;