import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
  FaUser,
  FaComment,
  FaHeadset,
  FaShippingFast,
  FaShieldAlt,
  FaUndo,
  FaCheckCircle,
  FaArrowRight,
  FaWhatsapp,
  FaTelegram,
  FaTiktok
} from 'react-icons/fa';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // محاكاة إرسال النموذج
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // إعادة تعيين حالة النجاح بعد 5 ثواني
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Phone",
      details: ["+1 (607) 936-8058", "+1 (607) 936-8059"],
      link: "tel:+16079368058"
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: ["example@gmail.com", "support@example.com"],
      link: "mailto:example@gmail.com"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      details: ["419 State 414 Rte", "Beaver Dams, NY 14812, USA"],
      link: "https://maps.google.com"
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 9:00 PM", "Sat - Sun: 10:00 AM - 6:00 PM"],
      link: null
    }
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, name: "Facebook", url: "#", color: "#1877f2" },
    { icon: <FaTwitter />, name: "Twitter", url: "#", color: "#1da1f2" },
    { icon: <FaInstagram />, name: "Instagram", url: "#", color: "#e4405f" },
    { icon: <FaYoutube />, name: "YouTube", url: "#", color: "#ff0000" },
    { icon: <FaWhatsapp />, name: "WhatsApp", url: "#", color: "#25d366" },
    { icon: <FaTelegram />, name: "Telegram", url: "#", color: "#0088cc" },
    { icon: <FaTiktok />, name: "TikTok", url: "#", color: "#000000" }
  ];

  const features = [
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Our team is always ready to help you"
    },
    {
      icon: <FaShippingFast />,
      title: "Fast Response",
      description: "We respond within 24 hours"
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Communication",
      description: "Your data is safe with us"
    },
    {
      icon: <FaUndo />,
      title: "Easy Process",
      description: "Simple and straightforward contact process"
    }
  ];

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FaHeadset className={styles.heroBadgeIcon} />
            <span>Get in Touch</span>
          </div>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSubtitle}>
            Have questions? We'd love to hear from you. Reach out and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactWrapper}>
            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <h2 className={styles.contactInfoTitle}>Get in Touch</h2>
              <p className={styles.contactInfoSubtitle}>
                We're here to help you with any questions or concerns you may have.
              </p>

              <div className={styles.infoGrid}>
                {contactInfo.map((item, index) => (
                  <div key={index} className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      {item.icon}
                    </div>
                    <div className={styles.infoContent}>
                      <h4>{item.title}</h4>
                      {item.details.map((detail, i) => (
                        item.link ? (
                          <a key={i} href={item.link} className={styles.infoLink}>
                            {detail}
                          </a>
                        ) : (
                          <p key={i} className={styles.infoText}>{detail}</p>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className={styles.socialSection}>
                <h4>Follow Us</h4>
                <div className={styles.socialLinks}>
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index} 
                      href={social.url} 
                      className={styles.socialLink}
                      style={{ '--social-color': social.color }}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.contactForm}>
              <div className={styles.formCard}>
                <h2 className={styles.formTitle}>Send a Message</h2>
                <p className={styles.formSubtitle}>
                  Fill in the form below and we'll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <div className={styles.successMessage}>
                    <div className={styles.successIcon}>
                      <FaCheckCircle />
                    </div>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us. We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">
                        <FaUser className={styles.formIcon} />
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email">
                        <FaEnvelope className={styles.formIcon} />
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="subject">
                        <FaComment className={styles.formIcon} />
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="message">
                        <FaPaperPlane className={styles.formIcon} />
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows="5"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className={styles.submitBtn}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className={styles.spinner}></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FaArrowRight className={styles.btnIcon} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>
                <div className={styles.featureContent}>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className={styles.mapSection}>
        <div className={styles.container}>
          <div className={styles.mapWrapper}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapContent}>
                <FaMapMarkerAlt className={styles.mapIcon} />
                <h3>Find Us Here</h3>
                <p>419 State 414 Rte, Beaver Dams, NY 14812, USA</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  Open in Google Maps
                  <FaArrowRight className={styles.mapLinkIcon} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;