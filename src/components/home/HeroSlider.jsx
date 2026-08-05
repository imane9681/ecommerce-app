// HeroSlider.jsx - نفس تصميمك الأصلي تماماً
import React, { useState, useEffect } from 'react';
import styles from './HeroSlider.module.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className={styles.slider}>
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
          
          {/* صور متجاوبة - هاتف / ديسكتوب */}
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