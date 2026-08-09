import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../utils/constants';
import styles from './Categories.module.css';
import { 
  FaMobile, FaTshirt, FaHome, FaSmile, FaFutbol, 
  FaBook, FaGamepad, FaCar, FaChevronLeft, FaChevronRight,
  FaLaptop, FaCouch, FaUtensils, FaBaby, FaGem
} from 'react-icons/fa';

const Categories = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeDot, setActiveDot] = useState(0);
  const scrollContainerRef = useRef(null);

  // دالة لحساب عدد المنتجات لكل فئة
  const getCategoryProductCount = (categoryId) => {
    return products.filter(product => product.category === categoryId).length;
  };

  // ===== ألوان دافئة متناسقة مع المشروع =====
  const getCategoryColors = (index) => {
    const colors = [
      { icon: '#fdb673', bg: 'rgba(253, 182, 115, 0.12)' },   // برتقالي فاتح
      { icon: '#ff9a3d', bg: 'rgba(255, 154, 61, 0.12)' },     // برتقالي غامق
      { icon: '#f8a85e', bg: 'rgba(248, 168, 94, 0.12)' },     // برتقالي متوسط
      { icon: '#ffb347', bg: 'rgba(255, 179, 71, 0.12)' },     // برتقالي شمسي
      { icon: '#e8893a', bg: 'rgba(232, 137, 58, 0.12)' },     // برتقالي محروق
      { icon: '#f5a623', bg: 'rgba(245, 166, 35, 0.12)' },     // ذهبي
      { icon: '#ff8c42', bg: 'rgba(255, 140, 66, 0.12)' },     // برتقالي برتقالي
      { icon: '#e8a84c', bg: 'rgba(232, 168, 76, 0.12)' },     // ذهبي فاتح
      { icon: '#f7b731', bg: 'rgba(247, 183, 49, 0.12)' },     // ذهبي متوسط
      { icon: '#d4893b', bg: 'rgba(212, 137, 59, 0.12)' },     // برتقالي غامق
      { icon: '#fcb045', bg: 'rgba(252, 176, 69, 0.12)' },     // برتقالي دافئ
      { icon: '#e8973a', bg: 'rgba(232, 151, 58, 0.12)' },     // كهرماني
    ];
    return colors[index % colors.length];
  };

  const categories = [
    {
      id: 'clothing',
      icon: <FaTshirt />,
      name: "Clothing"
    },
    {
      id: 'electronics',
      icon: <FaMobile />,
      name: "Electronics"
    },
    {
      id: 'home',
      icon: <FaHome />,
      name: "Home"
    },
    {
      id: 'beauty',
      icon: <FaSmile />,
      name: "Beauty"
    },
    {
      id: 'sports',
      icon: <FaFutbol />,
      name: "Sports"
    },
    {
      id: 'furniture',
      icon: <FaCouch />,
      name: "Furniture"
    },
    {
      id: 'kitchen',
      icon: <FaUtensils />,
      name: "Kitchen"
    },
    {
      id: 'baby',
      icon: <FaBaby />,
      name: "Baby"
    },
    {
      id: 'jewelry',
      icon: <FaGem />,
      name: "Jewelry"
    },
    {
      id: 'books',
      icon: <FaBook />,
      name: "Books"
    },
    {
      id: 'games',
      icon: <FaGamepad />,
      name: "Games"
    },
    {
      id: 'automotive',
      icon: <FaCar />,
      name: "Automotive"
    }
  ];

  // حساب عدد النقاط
  const calculateTotalDots = () => {
    const container = scrollContainerRef.current;
    if (!container) return 4;
    
    const containerWidth = container.clientWidth;
    const isMobile = window.innerWidth <= 480;
    const categoryCardWidth = isMobile ? 80 : 200;
    const visibleCategories = Math.floor(containerWidth / categoryCardWidth);
    const totalDots = Math.ceil(categories.length / visibleCategories);
    
    return Math.max(totalDots, 1);
  };

  const [totalDots, setTotalDots] = useState(4);

  useEffect(() => {
    const updateTotalDots = () => {
      setTotalDots(calculateTotalDots());
    };

    updateTotalDots();
    window.addEventListener('resize', updateTotalDots);
    
    return () => {
      window.removeEventListener('resize', updateTotalDots);
    };
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const isMobile = window.innerWidth <= 480;
    const scrollAmount = isMobile ? 200 : 300;
    
    if (container) {
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      setTimeout(() => {
        updateArrowVisibility();
        updateActiveDot();
      }, 300);
    }
  };

  const updateArrowVisibility = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const updateActiveDot = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    
    const scrollPercentage = scrollLeft / (scrollWidth - containerWidth);
    const dotIndex = Math.floor(scrollPercentage * (totalDots - 1));
    
    setActiveDot(Math.min(dotIndex, totalDots - 1));
  };

  const handleDotClick = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;
    
    const scrollPosition = (index / (totalDots - 1)) * (scrollWidth - containerWidth);
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });

    setActiveDot(index);
  };

  return (
    <section className={styles.categoriesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <p className={styles.sectionSubtitle}>Browse through our extensive product categories</p>
        </div>

        <div className={styles.categoriesWrapper}>
          {showLeftArrow && (
            <button 
              className={`${styles.scrollButton} ${styles.scrollLeft}`}
              onClick={() => scroll('left')}
            >
              <FaChevronLeft />
            </button>
          )}

          <div 
            className={styles.categoriesContainer}
            ref={scrollContainerRef}
            onScroll={() => {
              updateArrowVisibility();
              updateActiveDot();
            }}
          >
            <div className={styles.categoriesScroll}>
              {categories.map((category, index) => {
                const productCount = getCategoryProductCount(category.id);
                const colors = getCategoryColors(index);
                
                return (
                  <Link 
                    to={`/products?category=${category.id}`}
                    key={index} 
                    className={styles.categoryCard}
                  >
                    <div 
                      className={styles.categoryCircle}
                      style={{ 
                        background: colors.bg,
                        border: `0.01rem solid ${colors.icon}40`
                      }}
                    >
                      <div 
                        className={styles.categoryIcon}
                        style={{ color: colors.icon }}
                      >
                        {category.icon}
                      </div>
                    </div>
                    
                    <div className={styles.categoryName}>
                      {category.name}
                    </div>
                    
                    <div className={styles.categoryCount}>
                      {productCount} items
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {showRightArrow && (
            <button 
              className={`${styles.scrollButton} ${styles.scrollRight}`}
              onClick={() => scroll('right')}
            >
              <FaChevronRight />
            </button>
          )}
        </div>

        <div className={styles.dotsIndicator}>
          {Array.from({ length: totalDots }, (_, index) => (
            <div 
              key={index}
              className={`${styles.dot} ${index === activeDot ? styles.active : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;