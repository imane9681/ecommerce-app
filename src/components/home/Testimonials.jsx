// Testimonials.jsx
import React from 'react';
import styles from './Testimonials.module.css';
import { FaStar, FaQuoteLeft, FaUserCircle } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Customer",
      rating: 5,
      comment: "Amazing shopping experience! The products are high quality and delivery is very fast.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Mohammed Al Khalid",
      role: "Marketing Manager",
      rating: 4,
      comment: "Excellent customer service and professional technical support. Competitive prices.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-12"
    },
    {
      id: 3,
      name: "Fatima Al Ali",
      role: "Fashion Designer",
      rating: 5,
      comment: "The product variety is amazing and the quality exceeds expectations.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-10"
    },
    {
      id: 4,
      name: "Ahmed Hassan",
      role: "Business Owner",
      rating: 5,
      comment: "Outstanding platform! Helped me grow my business significantly.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-08"
    },
    {
      id: 5,
      name: "Layla Mohammed",
      role: "Content Creator",
      rating: 4,
      comment: "Great user experience and amazing customer support team!",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-05"
    },
    {
      id: 6,
      name: "Omar Abdullah",
      role: "Entrepreneur",
      rating: 5,
      comment: "The best service I've ever used. Highly recommended for everyone!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-03"
    },
    {
      id: 7,
      name: "Omar Abdullah",
      role: "Entrepreneur",
      rating: 5,
      comment: "The best service I've ever used. Highly recommended for everyone!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-03"
    },
    {
      id: 8,
      name: "Omar Abdullah",
      role: "Entrepreneur",
      rating: 5,
      comment: "The best service I've ever used. Highly recommended for everyone!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      date: "2024-01-03"
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "98%", label: "Recommend Us" }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        className={`${styles.star} ${index < rating ? styles.filled : ''}`}
      />
    ));
  };

  // دالة لمعالجة أخطاء الصور
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallbackIcon = e.target.nextElementSibling;
    if (fallbackIcon) {
      fallbackIcon.style.display = 'flex';
    }
  };

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What Clients Say</h2>
          <p className={styles.sectionSubtitle}>
            Trusted by thousands of satisfied customers worldwide
          </p>
        </div>

        {/* Statistics */}
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>
                <FaQuoteLeft />
              </div>
              
              <div className={styles.rating}>
                {renderStars(testimonial.rating)}
              </div>

              <p className={styles.comment}>{testimonial.comment}</p>

              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    onError={handleImageError}
                  />
                  <FaUserCircle 
                    className={styles.defaultAvatar} 
                    style={{ display: 'none' }}
                  />
                </div>
                <div className={styles.userDetails}>
                  <h4 className={styles.userName}>{testimonial.name}</h4>
                  <p className={styles.userRole}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal CTA */}
        <div className={styles.ctaSection}>
          <button className={styles.primaryCta}>
            Share Your Experience
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;