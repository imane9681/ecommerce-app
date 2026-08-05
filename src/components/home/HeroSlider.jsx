// HeroSlider.jsx - مع دعم اللمس
import React, { useState, useEffect, useRef } from 'react';
import styles from './HeroSlider.module.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const sliderRef = useRef(null);

  const slides = [
    {
      image: "/images/img1.png",
      mobileImage: "/images/image4.png",
      title: "SUMMER COLLECTION 2024",
      subtitle: "Fresh Styles",
      subtitle2: "Amazing Deals",
      description: "Discover the latest trends with exclusive offers and premium quality",
      buttonText: "SHOP COLLECTION"
    },
    {
      image: "/images/img2.png",
      mobileImage: "/images/image3.png",
      title: "LIMITED TIME OFFER",
      subtitle: "Flash Sale",
      subtitle2: "Up to 70% OFF",
      description: "Don't miss our biggest sale of the season - Shop now and save big",
      buttonText: "GRAB THE DEAL"
    },
    {
      image: "/images/img3.png",
      mobileImage: "/images/image2.png",
      title: "NEW ARRIVALS", 
      subtitle: "Just Launched",
      subtitle2: "Hot Products",
      description: "Be the first to explore our newest collection of premium products",
      buttonText: "EXPLORE NOW"
    },
    {
      image: "/images/img4.png",
      mobileImage: "/images/image1.png",
      title: "PREMIUM SHOPPING",
      subtitle: "Luxury Experience",
      subtitle2: "Unbeatable Prices",
      description: "Elevate your style with our curated collection of quality products",
      buttonText: "START SHOPPING"
    }
  ];

  // التبديل التلقائي
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
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
    if (touchStartX - touchEndX > 50) {
      // سحب لليسار -> السلايد التالي
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }

    if (touchStartX - touchEndX < -50) {
      // سحب لليمين -> السلايد السابق
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }

    // إعادة تعيين القيم
    setTouchStartX(0);
    setTouchEndX(0);
  };

  // ===== دعم التمرير بالماوس (للحاسوب) =====
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

    if (mouseStartX - mouseEndX > 50) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }

    if (mouseStartX - mouseEndX < -50) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
      // أحداث اللمس
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // أحداث الماوس
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
            {index === 0 && <div className={styles.badge}>Limited Time</div>}
            <div className={styles.offer}>{slide.title}</div>
            <div className={styles.super}>
              {slide.subtitle}<br/>{slide.subtitle2}
            </div>
            <div className={styles.couponce}>{slide.description}</div>
            <div className={styles.shops}>
              <button className={styles.shop}>{slide.buttonText}</button>
            </div>
          </div>
          
          <picture>
            <source 
              media="(max-width: 48rem)" 
              srcSet={slide.mobileImage} 
            />
            <img src={slide.image} alt={`Slide ${index + 1}`} />
          </picture>
        </div>
      ))}
      
      <a className={styles.prev} onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}>
        &#10094;
      </a>
      <a className={styles.next} onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}>
        &#10095;
      </a>
      
      <div className={styles.dotsbox}>
        {slides.map((_, index) => (
          <span 
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;