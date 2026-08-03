// components/home/MembershipBanner/MembershipBanner.jsx
import React, { useEffect } from 'react';
import { 
  FaCrown, 
  FaShippingFast, 
  FaStar, 
  FaGift, 
  FaArrowRight,
  FaCheckCircle,
  FaHeadset,
  FaTag,
  FaShieldAlt,
  FaRocket,
  FaGem,
  FaAward,
  FaClock
} from 'react-icons/fa';
import styles from './MembershipBanner.module.css';

const MembershipBanner = () => {
  const benefits = [
    { icon: <FaRocket />, text: 'Early Access' },
    { icon: <FaShippingFast />, text: 'Free Shipping' },
    { icon: <FaGem />, text: 'Exclusive Deals' },
    { icon: <FaHeadset />, text: 'VIP Support' }
  ];

  const handleJoinNow = () => {
    // Add your join membership logic here
    console.log('Join Membership clicked');
    // Example: navigate to membership page
    // window.location.href = '/membership';
  };

  // Create particles effect
  useEffect(() => {
    const particlesContainer = document.querySelector(`.${styles.particles}`);
    if (!particlesContainer) return;

    // Clear existing particles
    particlesContainer.innerHTML = '';

    // Create 10 particles
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = 4 + Math.random() * 6;
      const delay = Math.random() * 5;
      const duration = 15 + Math.random() * 10;
      
      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      particlesContainer.appendChild(particle);
    }
  }, []);

  return (
    <div className={styles.membershipBanner}>
      <div className={styles.backgroundEffect}></div>
      <div className={styles.particles}></div>
      
      <div className={styles.bannerContent}>
        {/* Left Section - Premium Value Proposition */}
        <div className={styles.leftSection}>
          <div className={styles.premiumBadge}>
            <FaCrown className={styles.crownIcon} />
            <span>EXCLUSIVE MEMBERSHIP</span>
          </div>
          
          <h1 className={styles.mainTitle}>
            Elevate Your
            <span className={styles.highlight}>Shopping Experience</span>
          </h1>
          
          <p className={styles.subtitle}>
            Unlock exclusive benefits and premium services for modern shoppers.
          </p>
        </div>

        {/* Center Section - Animated Benefits Grid */}
        <div className={styles.centerSection}>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={styles.benefitCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.benefitIconWrapper}>
                  {benefit.icon}
                </div>
                <span className={styles.benefitText}>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Premium CTA Card */}
        <div className={styles.rightSection}>
          <div className={styles.ctaCard}>
            <div className={styles.pricing}>
              <div className={styles.price}>
                99<span>/year</span>
              </div>
              <div className={styles.savingsBadge}>
                <FaTag /> <span>Save 40%</span>
              </div>
            </div>
            
            <button className={styles.ctaButton} onClick={handleJoinNow}>
              <span>Join Premium Now</span>
              <div className={styles.buttonIcon}>
                <FaArrowRight />
              </div>
            </button>

            <div className={styles.guarantee}>
              <FaAward />
              <span>30-Day Premium Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipBanner;