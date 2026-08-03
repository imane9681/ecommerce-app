import React from 'react';
import { Link } from 'react-router-dom'; // ← فقط هذا السطر مضاف
import styles from './Footer.module.css';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaYoutube,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaShippingFast,
  FaShieldAlt, FaHeadset, FaGift, FaCreditCard,  FaCcVisa, FaCcMastercard, FaPaypal, FaApplePay, FaGooglePay, FaCcAmex 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={styles.footerMain}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            
            {/* Company Info */}
            <div className={styles.footerSection}>
              <div className={styles.logo}>
                <h3>Shop</h3>
              </div>
              <p className={styles.companyDescription}>
                Your trusted online destination for quality products and exceptional service. 
                We're committed to providing the best shopping experience.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className={styles.socialLink} aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Quick Links</h4>
              <div className={styles.linksGrid}>
                <div className={styles.linkColumn}>
                  {/* تم تغيير <a> إلى <Link> */}
                  <Link to="/about" className={styles.footerLink}>About Us</Link>
                  <Link to="/contact" className={styles.footerLink}>Contact Us</Link>
                  <Link to="/blog" className={styles.footerLink}>Blog</Link>
                  <Link to="/products" className={styles.footerLink}>All Products</Link>
                </div>
                <div className={styles.linkColumn}>
                  <Link to="/wishlist" className={styles.footerLink}>Wishlist</Link>
                  <Link to="/cart" className={styles.footerLink}>Cart</Link>
                  <Link to="/login" className={styles.footerLink}>My Account</Link>
                  <Link to="/categories" className={styles.footerLink}>Categories</Link>
                </div>
              </div>
            </div>

            {/* Customer Service */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Customer Service</h4>
              <div className={styles.serviceLinks}>
                {/* تم تغيير <a> إلى <Link> */}
                <Link to="/contact" className={styles.footerLink}>
                  <FaHeadset className={styles.linkIcon} />
                  Support Center
                </Link>
                <Link to="/privacy" className={styles.footerLink}>
                  <FaShieldAlt className={styles.linkIcon} />
                  Privacy Policy
                </Link>
                <Link to="/returns" className={styles.footerLink}>
                  <FaGift className={styles.linkIcon} />
                  Returns & Exchanges
                </Link>
                <Link to="/shipping" className={styles.footerLink}>
                  <FaShippingFast className={styles.linkIcon} />
                  Shipping Info
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Contact Info</h4>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <FaMapMarkerAlt className={styles.contactIcon} />
                  <span>419 State 414 Rte Beaver Dams, New York(NY), 14812, USA</span>
                </div>
                <div className={styles.contactItem}>
                  <FaPhone className={styles.contactIcon} />
                  <span>(607) 936-8058</span>
                </div>
                <div className={styles.contactItem}>
                  <FaEnvelope className={styles.contactIcon} />
                  <span>Example@Gmail.Com</span>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - الأصلي بدون تغيير */}
      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <p>&copy; 2025 SHOPPING. All rights reserved.</p>
            <div className={styles.paymentMethods}>
              <span>We accept:</span>
              <div className={styles.paymentIcons}>
                <FaCcVisa className={styles.paymentIcon} />
                <FaCcMastercard className={styles.paymentIcon} />
                <FaPaypal className={styles.paymentIcon} />
                <FaApplePay className={styles.paymentIcon} />
                <FaGooglePay className={styles.paymentIcon} />
                <FaCcAmex className={styles.paymentIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;