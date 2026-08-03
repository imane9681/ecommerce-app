import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaStore, 
  FaUsers, 
  FaTrophy, 
  FaHeart,
  FaShippingFast,
  FaShieldAlt,
  FaUndo,
  FaHeadset,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaRocket,
  FaGem,
  FaLeaf,
  FaAward,
  FaClock,
  FaGlobe,
  FaMobile,
  FaLaptop,
  FaSmile,
  FaGraduationCap,
  FaQuoteLeft,
  FaQuoteRight,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  const stats = [
    {
      icon: <FaUsers />,
      number: "50K+",
      label: "Happy Customers"
    },
    {
      icon: <FaTrophy />,
      number: "1,200+",
      label: "Products Sold"
    },
    {
      icon: <FaStore />,
      number: "98%",
      label: "Satisfaction Rate"
    },
    {
      icon: <FaRocket />,
      number: "24/7",
      label: "Customer Support"
    }
  ];

  const values = [
    {
      icon: <FaGem />,
      title: "Quality First",
      description: "We never compromise on quality. Every product is carefully selected and tested."
    },
    {
      icon: <FaHeart />,
      title: "Customer Love",
      description: "Our customers are at the heart of everything we do. Your satisfaction is our priority."
    },
    {
      icon: <FaLeaf />,
      title: "Sustainability",
      description: "We're committed to sustainable practices and reducing our environmental impact."
    },
    {
      icon: <FaGraduationCap />,
      title: "Innovation",
      description: "We constantly innovate to bring you the latest and best products available."
    }
  ];

  const team = [
    {
      name: "Lena Johnson",
      role: "CEO & Founder",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      bio: "With over 15 years of experience in e-commerce, Sarah built this company from the ground up."
    },
    {
      name: "Mike Chen",
      role: "Head of Product",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Mike is passionate about product development and ensuring we offer the best selection."
    },
    {
      name: "Emily Davis",
      role: "Customer Experience",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Emily leads our customer support team with a focus on exceptional service and care."
    },
    {
      name: "David Wilson",
      role: "Marketing Director",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "David brings creative marketing strategies that help our brand reach new heights."
    }
  ];

  const testimonials = [
    {
      name: "Ahmed Al-Fahd",
      role: "Regular Customer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      quote: "This is by far the best online shopping experience I've ever had. The quality is unmatched!"
    },
    {
      name: "Fatima Al-Mansoori",
      role: "Business Owner",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      quote: "I've been shopping here for years. The service is always excellent and delivery is fast."
    }
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FaStore className={styles.heroBadgeIcon} />
            <span>About Us</span>
          </div>
          <h1 className={styles.heroTitle}>Our Story</h1>
          <p className={styles.heroSubtitle}>
            We're on a mission to provide the best shopping experience with premium products and exceptional service.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon}>
                  {stat.icon}
                </div>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className={styles.aboutContent}>
        <div className={styles.container}>
          <div className={styles.aboutWrapper}>
            <div className={styles.aboutText}>
              <div className={styles.aboutTag}>Who We Are</div>
              <h2>Building the Future of Online Shopping</h2>
              <p>
                Founded in 2024, we started with a simple idea: make online shopping easier, 
                faster, and more enjoyable for everyone. What began as a small passion project 
                has grown into a trusted destination for quality products.
              </p>
              <p>
                We believe in the power of choice and the importance of quality. That's why we 
                carefully curate our collection to bring you only the best products at competitive prices.
              </p>
              <div className={styles.aboutFeatures}>
                <div className={styles.aboutFeature}>
                  <FaCheckCircle className={styles.aboutFeatureIcon} />
                  <span>Premium Quality Products</span>
                </div>
                <div className={styles.aboutFeature}>
                  <FaCheckCircle className={styles.aboutFeatureIcon} />
                  <span>Fast & Reliable Shipping</span>
                </div>
                <div className={styles.aboutFeature}>
                  <FaCheckCircle className={styles.aboutFeatureIcon} />
                  <span>Secure Payment Processing</span>
                </div>
                <div className={styles.aboutFeature}>
                  <FaCheckCircle className={styles.aboutFeatureIcon} />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
            <div className={styles.aboutImage}>
              <div className={styles.aboutImagePlaceholder}>
                <div className={styles.aboutImageContent}>
                  <FaStore className={styles.aboutImageIcon} />
                  <h3>Since 2024</h3>
                  <p>Trusted by thousands</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.valuesHeader}>
            <div className={styles.valuesTag}>Our Values</div>
            <h2>What Drives Us</h2>
            <p>These are the principles that guide everything we do at our company.</p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  {value.icon}
                </div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.teamHeader}>
            <div className={styles.teamTag}>Our Team</div>
            <h2>Meet the People Behind the Scenes</h2>
            <p>Passionate individuals dedicated to delivering the best experience for you.</p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamAvatar}>
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className={styles.teamAvatarFallback}>
                    {member.name.charAt(0)}
                  </div>
                </div>
                <div className={styles.teamInfo}>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <div className={styles.teamRole}>{member.role}</div>
                  <p className={styles.teamBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.testimonialsHeader}>
            <div className={styles.testimonialsTag}>Testimonials</div>
            <h2>What Our Customers Say</h2>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialQuoteIcon}>
                  <FaQuoteLeft />
                </div>
                <p className={styles.testimonialText}>{testimonial.quote}</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className={styles.testimonialAvatarFallback}>
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div className={styles.testimonialInfo}>
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaText}>
              <h2>Ready to Experience the Difference?</h2>
              <p>Join thousands of satisfied customers and start shopping today.</p>
            </div>
            <div className={styles.ctaButtons}>
              <Link to="/products" className={styles.ctaBtnPrimary}>
                Browse Products
                <FaArrowRight className={styles.ctaIcon} />
              </Link>
              <Link to="/contact" className={styles.ctaBtnSecondary}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;