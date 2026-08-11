import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTshirt, 
  FaMobile, 
  FaHome, 
  FaSprayCan, 
  FaFootballBall,
  FaCouch,
  FaUtensils,
  FaBaby,
  FaGem,
  FaBook,
  FaSearch,
  FaTimes,
  FaStar,
  FaArrowRight,
  FaTags,
  FaChevronRight,
  FaStore,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaFire,
  FaBolt,
  FaGift,
  FaPercent,
  FaShoppingBag
} from 'react-icons/fa';
import styles from './CategoriesPage.module.css';
import { products } from '../utils/constants';

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  // تعريف الفئات
  const categories = [
    { id: 'clothing', name: 'Clothing', icon: <FaTshirt />, color: '#fdb673', bgColor: 'rgba(253, 182, 115, 0.1)', productCount: 42, popular: true },
    { id: 'electronics', name: 'Electronics', icon: <FaMobile />, color: '#fdb673', bgColor: 'rgba(253, 182, 115, 0.1)', productCount: 38, popular: true },
    { id: 'home', name: 'Home & Living', icon: <FaHome />, color: '#fdb673', bgColor: 'rgba(253, 182, 115, 0.1)', productCount: 25 },
    { id: 'beauty', name: 'Beauty', icon: <FaSprayCan />, color: '#fdb673', bgColor: 'rgba(253, 182, 115, 0.1)', productCount: 30, popular: true },
    { id: 'sports', name: 'Sports', icon: <FaFootballBall />, color: '#fdb673', bgColor: 'rgba(253, 182, 115, 0.1)', productCount: 18 },
    { id: 'furniture', name: 'Furniture', icon: <FaCouch />, color: '#fdb673', bgColor: 'rgba(253, 182, 115, 0.1)', productCount: 22 },
    { id: 'kitchen', name: 'Kitchen', icon: <FaUtensils />, color: '#fdb673', bgColor: 'rgba(253, 182, 115, 0.1)', productCount: 15 },
    { id: 'baby', name: 'Baby', icon: <FaBaby />, color: '#fdb673', bgColor: 'rgba(253, 182, 115, 0.1)', productCount: 20 },
    { id: 'jewelry', name: 'Jewelry', icon: <FaGem />, color: '#fdb673', bgColor: 'rgba(253, 182, 115, 0.1)', productCount: 12 },
    { id: 'books', name: 'Books', icon: <FaBook />, color: '#fdb673', bgColor: 'rgba(253, 182, 115, 0.1)', productCount: 35 }
  ];

  // حساب إحصائيات الفئة
  const getCategoryStats = (categoryId) => {
    const catProducts = products.filter(p => p.category === categoryId);
    return {
      count: catProducts.length,
      rating: catProducts.length > 0 
        ? (catProducts.reduce((sum, p) => sum + (p.rating || 0), 0) / catProducts.length).toFixed(1)
        : '0'
    };
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.page}>
      {/* Hero Section - تصميم قديم */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FaStore className={styles.heroBadgeIcon} />
            <span>Explore Categories</span>
          </div>
          <h1 className={styles.heroTitle}>Shop by Category</h1>
          <p className={styles.heroSubtitle}>
            Find exactly what you're looking for by browsing through our curated categories
          </p>
          <div className={styles.heroFeatures}>
            <div className={styles.heroFeature}>
              <FaShippingFast />
              <span>Free Shipping</span>
            </div>
            <div className={styles.heroFeature}>
              <FaShieldAlt />
              <span>Secure Payment</span>
            </div>
            <div className={styles.heroFeature}>
              <FaHeadset />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search - تصميم قديم */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filterWrapper}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button className={styles.clearSearch} onClick={() => setSearchTerm('')}>
                  <FaTimes />
                </button>
              )}
            </div>
            <div className={styles.filterStats}>
              <span className={styles.statsCount}>
                <FaTags className={styles.statsIcon} />
                {filteredCategories.length} Categories
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid - بطاقات جديدة */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.gridHeader}>
            <div>
              <h2>All Categories</h2>
              <p>Choose a category to start exploring</p>
            </div>
          </div>

          {filteredCategories.length > 0 ? (
            <div className={styles.grid}>
              {filteredCategories.map((category) => {
                const stats = getCategoryStats(category.id);
                const isActive = activeCategory === category.id;

                return (
                  <Link
                    to={`/products?category=${category.id}`}
                    key={category.id}
                    className={`${styles.card} ${isActive ? styles.active : ''}`}
                    onMouseEnter={() => setActiveCategory(category.id)}
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    <div className={styles.cardBg}></div>
                    
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <div className={styles.cardIcon} style={{ backgroundColor: category.bgColor, color: category.color }}>
                          {category.icon}
                        </div>
                        {category.popular && (
                          <span className={styles.popularBadge}>
                            <FaFire /> Popular
                          </span>
                        )}
                      </div>

                      <h3 className={styles.cardName}>{category.name}</h3>
                      
                      <div className={styles.cardStats}>
                        <span className={styles.cardStat}>
                          <FaShoppingBag /> {stats.count} Products
                        </span>
                        <span className={styles.cardStat}>
                          <FaStar /> {stats.rating}
                        </span>
                      </div>

                      <div className={styles.cardFooter}>
                        <span className={styles.cardOffer}>
                          <FaPercent /> Up to 50% OFF
                        </span>
                        <span className={styles.cardArrow}>
                          <FaChevronRight />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <FaSearch />
              </div>
              <h3>No Categories Found</h3>
              <p>Try adjusting your search terms</p>
              <button className={styles.resetBtn} onClick={() => setSearchTerm('')}>
                <FaTimes /> Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Categories Banner - تصميم قديم */}
      <div className={styles.featuredBanner}>
        <div className={styles.container}>
          <div className={styles.bannerContent}>
            <div className={styles.bannerText}>
              <h2>Popular Categories</h2>
              <p>Shop the most popular categories with thousands of products</p>
            </div>
            <div className={styles.bannerCategories}>
              {categories.slice(0, 6).map((cat) => (
                <Link 
                  to={`/products?category=${cat.id}`}
                  key={cat.id} 
                  className={styles.bannerCategory}
                >
                  <div 
                    className={styles.bannerCategoryIcon}
                  >
                    {cat.icon}
                  </div>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - تصميم قديم */}
      <div className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaText}>
              <h2>Can't find what you're looking for?</h2>
              <p>Browse all products or contact our support team for help</p>
            </div>
            <div className={styles.ctaButtons}>
              <Link to="/products" className={styles.ctaBtnPrimary}>
                View All Products
                <FaArrowRight className={styles.ctaIcon} />
              </Link>
              <Link to="/contact" className={styles.ctaBtnSecondary}>
                <FaHeadset className={styles.ctaBtnIcon} />
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;