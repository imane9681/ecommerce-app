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

  // دالة لحساب عدد المنتجات المتوفرة لكل فئة
  const getCategoryInStockCount = (categoryId) => {
    return products.filter(product => product.category === categoryId && product.inStock).length;
  };

  const categories = [
    {
      id: 'clothing',
      icon: <FaTshirt />,
      name: "Clothing",
      color: "#ec4899"
    },
    {
      id: 'electronics',
      icon: <FaMobile />,
      name: "Electronics",
      color: "#4f46e5"
    },
    {
      id: 'home',
      icon: <FaHome />,
      name: "Home",
      color: "#10b981"
    },
    {
      id: 'beauty',
      icon: <FaSmile />,
      name: "Beauty",
      color: "#f97316"
    },
    {
      id: 'sports',
      icon: <FaFutbol />,
      name: "Sports",
      color: "#ef4444"
    },
    {
      id: 'furniture',
      icon: <FaCouch />,
      name: "Furniture",
      color: "#f59e0b"
    },
    {
      id: 'kitchen',
      icon: <FaUtensils />,
      name: "Kitchen",
      color: "#dc2626"
    },
    {
      id: 'baby',
      icon: <FaBaby />,
      name: "Baby",
      color: "#d946ef"
    },
    {
      id: 'jewelry',
      icon: <FaGem />,
      name: "Jewelry",
      color: "#eab308"
    },
    {
      id: 'books',
      icon: <FaBook />,
      name: "Books",
      color: "#8b5cf6"
    },
    {
      id: 'games',
      icon: <FaGamepad />,
      name: "Games",
      color: "#84cc16"
    },
    {
      id: 'automotive',
      icon: <FaCar />,
      name: "Automotive",
      color: "#64748b"
    }
  ];

  // حساب عدد النقاط بناءً على عدد الفئات وعرض الحاوية
  const calculateTotalDots = () => {
    const container = scrollContainerRef.current;
    if (!container) return 3;
    
    const containerWidth = container.clientWidth;
    const categoryCardWidth = 200;
    const visibleCategories = Math.floor(containerWidth / categoryCardWidth);
    const totalDots = Math.ceil(categories.length / visibleCategories);
    
    return Math.max(totalDots, 1);
  };

  const [totalDots, setTotalDots] = useState(3);

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
    const scrollAmount = 300;
    
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
        container.scrollLeft < container.scrollWidth - container.clientWidth
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
                const inStockCount = getCategoryInStockCount(category.id);
                
                return (
                  <div key={index} className={styles.categoryCard}>
                    <div 
                      className={styles.categoryIcon}
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <div 
                        className={styles.iconWrapper}
                        style={{ color: category.color }}
                      >
                        {category.icon}
                      </div>
                    </div>
                    
                    <div className={styles.categoryContent}>
                      <h3 className={styles.categoryName}>{category.name}</h3>
                      <p className={styles.categoryItems}>
                        {productCount} products • {inStockCount} in stock
                      </p>
                    </div>
                    
                    <Link 
                      to={`/products?category=${category.id}`}
                      className={styles.shopButton}
                      onClick={() => {
                        setTimeout(() => {
                          const productsSection = document.getElementById('products');
                          if (productsSection) {
                            productsSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 300);
                      }}
                    >
                      Shop
                    </Link>
                  </div>
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