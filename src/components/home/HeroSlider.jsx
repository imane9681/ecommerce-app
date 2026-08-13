// HeroSlider.jsx 
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroSlider.module.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const sliderRef = useRef(null);
  const isTransitioning = useRef(false);  // ← أضف هذا لمنع التداخل

  const slides = [
    {
      image: "/images/img1.png",
      mobileImage: "/images/image4.png",
      tabletImage: "/images/image04.png",
      title: "BEATS SOLO³",
      subtitle: "Wireless Freedom",
      subtitle2: "All-Day Sound",
      description: "Premium on-ear headphones with 40-hour battery life, Apple W1 chip, and crystal-clear audio.",
      buttonText: "SHOP NOW",
      link: "/product/1",
      badge: "Best Seller"
    },
    {
      image: "/images/img2.png",
      mobileImage: "/images/image3.png",
      tabletImage: "/images/image03.png",
      title: "LIMITED TIME OFFER",
      subtitle: "Flash Sale",
      subtitle2: "Up to 70% OFF",
      description: "Don't miss our biggest sale of the season - Shop now and save big",
      buttonText: "GRAB THE DEAL",
      link: "/products?promotion=sale",
      badge: "Sale"
    },
    {
      image: "/images/img3.png",
      mobileImage: "/images/image2.png",
      tabletImage: "/images/image02.png",
      title: "NEW ARRIVALS", 
      subtitle: "Just Launched",
      subtitle2: "Hot Products",
      description: "Be the first to explore our newest collection of premium products",
      buttonText: "EXPLORE NOW",
      link: "/products?sort=newest",
      badge: "New"
    },
    {
      image: "/images/img4.png",
      mobileImage: "/images/image1.png",
      tabletImage: "/images/image01.png",
      title: "PREMIUM SHOPPING",
      subtitle: "Luxury Experience",
      subtitle2: "Unbeatable Prices",
      description: "Elevate your style with our curated collection of quality products",
      buttonText: "START SHOPPING",
      link: "/products",
      badge: "Featured"
    }
  ];

  // دالة التنقل الآمنة
  const goToSlide = (index) => {
    if (isTransitioning.current) return;  // منع التداخل
    
    isTransitioning.current = true;
    setCurrentSlide(index);
    
    setTimeout(() => {
      isTransitioning.current = false;
    }, 500);  // نفس مدة انتقال الـ CSS
  };

  // التبديل التلقائي
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning.current) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 8000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // ===== دعم اللمس =====
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isTransitioning.current) return;
    
    const diff = touchStartX - touchEndX;
    
    if (diff > 50) {
      // سحب لليسار -> السلايد التالي
      goToSlide((currentSlide + 1) % slides.length);
    } else if (diff < -50) {
      // سحب لليمين -> السلايد السابق
      goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    setTouchStartX(0);
    setTouchEndX(0);
  };

  // ===== دعم التمرير بالماوس =====
  const [mouseStartX, setMouseStartX] = useState(0);
  const [mouseEndX, setMouseEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setMouseStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setMouseEndX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (isTransitioning.current) return;
    
    const diff = mouseStartX - mouseEndX;
    
    if (diff > 50) {
      goToSlide((currentSlide + 1) % slides.length);
    } else if (diff < -50) {
      goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    setMouseStartX(0);
    setMouseEndX(0);
  };

  // منع النقر أثناء السحب
  const handleDragPrevent = (e) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  return (
    <div 
      className={styles.slider}
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleDragPrevent}
    >
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`${styles.myslide} ${styles.fade} ${index === currentSlide ? styles.active : ''}`}
        >
          <div className={styles.txt}>
            {slide.badge && <div className={styles.badge}>{slide.badge}</div>}
            <div className={styles.offer}>{slide.title}</div>
            <div className={styles.super}>
              {slide.subtitle}<br/>{slide.subtitle2}
            </div>
            <div className={styles.couponce}>{slide.description}</div>
            <div className={styles.shops}>
              <Link to={slide.link} className={styles.shop}>
                {slide.buttonText}
              </Link>
            </div>
          </div>
          
          <picture>
            <source 
              media="(max-width: 30rem)" 
              srcSet={slide.mobileImage} 
            />
            <source 
              media="(max-width: 48rem)" 
              srcSet={slide.tabletImage} 
            />
            <img src={slide.image} alt={`Slide ${index + 1}`} />
          </picture>
        </div>
      ))}
      
      {/* ===== الأسهم - استخدم goToSlide ===== */}
      <a 
        className={styles.prev} 
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
      >
        &#10094;
      </a>
      <a 
        className={styles.next} 
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        aria-label="Next slide"
      >
        &#10095;
      </a>
      
      <div className={styles.dotsbox}>
        {slides.map((_, index) => (
          <span 
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;