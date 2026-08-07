import React, { useState, useEffect, useRef } from 'react';
import styles from './PromoGrid.module.css';

const PromoGrid = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const promotions = [
    {
      id: 1,
      type: 'new',
      title: 'Just Arrived',
      description: 'Fresh styles for the season ahead',
      buttonText: 'Explore',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 2,
      type: 'sale',
      title: 'Up to 60% OFF',
      description: 'Limited time offers on selected items',
      buttonText: 'Shop Sale',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 3,
      type: 'premium',
      title: 'Luxury Edition',
      description: 'Exclusive premium collection',
      buttonText: 'Discover',
      gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
    }
  ];

  // الكشف عن حجم الشاشة
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // التبديل التلقائي في الهاتف
  useEffect(() => {
    if (!isMobile) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isMobile, promotions.length]);

  // ===== دعم اللمس =====
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // سحب لليسار -> السلايد التالي
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // سحب لليمين -> السلايد السابق
      setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.promoGrid}>
      {/* ===== تصميم الحاسوب (شبكة) ===== */}
      <div className={styles.desktopGrid}>
        {promotions.map((promo) => (
          <div 
            key={promo.id}
            className={styles.promoItem}
            style={{ background: promo.gradient }}
          >
            <div className={styles.promoContent}>
              <span className={styles.promoBadge}>
                {promo.type === 'new' && 'New'}
                {promo.type === 'sale' && 'Sale'}
                {promo.type === 'premium' && 'Premium'}
              </span>
              <h3 className={styles.promoTitle}>{promo.title}</h3>
              <p className={styles.promoDescription}>{promo.description}</p>
              <button className={styles.promoButton}>
                {promo.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== تصميم الهاتف (سلايدر) ===== */}
      <div className={styles.mobileSlider}>
        <div 
          className={styles.sliderContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={styles.sliderTrack}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {promotions.map((promo) => (
              <div 
                key={promo.id}
                className={styles.slideItem}
                style={{ background: promo.gradient }}
              >
                <div className={styles.slideContent}>
                  <span className={styles.slideBadge}>
                    {promo.type === 'new' && 'New'}
                    {promo.type === 'sale' && 'Sale'}
                    {promo.type === 'premium' && 'Premium'}
                  </span>
                  <h3 className={styles.slideTitle}>{promo.title}</h3>
                  <p className={styles.slideDescription}>{promo.description}</p>
                  <button className={styles.slideButton}>
                    {promo.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== نقاط التمرير ===== */}
        <div className={styles.sliderDots}>
          {promotions.map((_, index) => (
            <span 
              key={index}
              className={`${styles.sliderDot} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoGrid;