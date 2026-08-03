import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTshirt, 
  FaMobile, 
  FaHome, 
  FaSprayCan, 
  FaFootballBall,
  FaLaptop,
  FaCouch,
  FaUtensils,
  FaBaby,
  FaGem,
  FaBook,
  FaGamepad,
  FaCar,
  FaShoppingBag,
  FaTag,
  FaArrowRight,
  FaSearch,
  FaTimes,
  FaStar,
  FaFire,
  FaBolt,
  FaGift,
  FaClock,
  FaChevronRight,
  FaStore,
  FaPercent,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa';
import styles from './CategoriesPage.module.css';
import { products } from '../utils/constants';

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // تعريف الفئات مع أيقونات وألوان وصور
  const categories = [
    { 
      id: 'clothing', 
      name: 'Clothing', 
      icon: <FaTshirt />, 
      color: '#ec4899', 
      bgColor: '#fdf2f8',
      description: 'Discover the latest fashion trends for men and women',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop',
      subcategories: ['Men', 'Women', 'Kids', 'Accessories'],
      offer: '30% OFF'
    },
    { 
      id: 'electronics', 
      name: 'Electronics', 
      icon: <FaMobile />, 
      color: '#4f46e5', 
      bgColor: '#eef2ff',
      description: 'Latest gadgets and electronic devices',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop',
      subcategories: ['Phones', 'Laptops', 'Tablets', 'Accessories'],
      offer: '20% OFF'
    },
    { 
      id: 'home', 
      name: 'Home & Living', 
      icon: <FaHome />, 
      color: '#10b981', 
      bgColor: '#ecfdf5',
      description: 'Beautiful items to make your home special',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop',
      subcategories: ['Decor', 'Furniture', 'Kitchen', 'Garden'],
      offer: '25% OFF'
    },
    { 
      id: 'beauty', 
      name: 'Beauty', 
      icon: <FaSprayCan />, 
      color: '#f97316', 
      bgColor: '#fff7ed',
      description: 'Premium beauty and skincare products',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      subcategories: ['Skincare', 'Makeup', 'Hair', 'Fragrance'],
      offer: '40% OFF'
    },
    { 
      id: 'sports', 
      name: 'Sports', 
      icon: <FaFootballBall />, 
      color: '#ef4444', 
      bgColor: '#fef2f2',
      description: 'Equipment and gear for all sports',
      image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop',
      subcategories: ['Football', 'Basketball', 'Running', 'Fitness'],
      offer: '15% OFF'
    },
    { 
      id: 'furniture', 
      name: 'Furniture', 
      icon: <FaCouch />, 
      color: '#f59e0b', 
      bgColor: '#fffbeb',
      description: 'Stylish and comfortable furniture',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
      subcategories: ['Sofas', 'Tables', 'Chairs', 'Beds'],
      offer: '35% OFF'
    },
    { 
      id: 'kitchen', 
      name: 'Kitchen', 
      icon: <FaUtensils />, 
      color: '#dc2626', 
      bgColor: '#fef2f2',
      description: 'Everything you need for your kitchen',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&h=300&fit=crop',
      subcategories: ['Cookware', 'Appliances', 'Utensils', 'Storage'],
      offer: '20% OFF'
    },
    { 
      id: 'baby', 
      name: 'Baby', 
      icon: <FaBaby />, 
      color: '#d946ef', 
      bgColor: '#fdf4ff',
      description: 'Safe and comfortable products for babies',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=300&fit=crop',
      subcategories: ['Toys', 'Clothing', 'Feeding', 'Nursery'],
      offer: '30% OFF'
    },
    { 
      id: 'jewelry', 
      name: 'Jewelry', 
      icon: <FaGem />, 
      color: '#eab308', 
      bgColor: '#fefce8',
      description: 'Elegant jewelry for every occasion',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
      subcategories: ['Rings', 'Necklaces', 'Bracelets', 'Earrings'],
      offer: '50% OFF'
    },
    { 
      id: 'books', 
      name: 'Books', 
      icon: <FaBook />, 
      color: '#8b5cf6', 
      bgColor: '#f5f3ff',
      description: 'Find your next favorite book',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop',
      subcategories: ['Fiction', 'Non-Fiction', 'Children', 'Education'],
      offer: '15% OFF'
    }
  ];

  // حساب إحصائيات كل فئة
  const getCategoryStats = (categoryId) => {
    const categoryProducts = products.filter(p => p.category === categoryId);
    const totalProducts = categoryProducts.length;
    const inStock = categoryProducts.filter(p => p.inStock).length;
    const avgRating = categoryProducts.length > 0 
      ? categoryProducts.reduce((sum, p) => sum + (p.rating || 0), 0) / categoryProducts.length 
      : 0;
    
    return {
      totalProducts,
      inStock,
      avgRating: avgRating.toFixed(1),
      featured: categoryProducts.some(p => p.tags?.includes('featured')),
      bestseller: categoryProducts.some(p => p.tags?.includes('bestseller')),
      newArrivals: categoryProducts.some(p => p.isNew)
    };
  };

  // فلتر الفئات حسب البحث
  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cat.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);
  const selectedStats = selectedCategoryData ? getCategoryStats(selectedCategoryData.id) : null;

  // دالة عرض التقييم بالنجوم
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar 
        key={index} 
        className={index < Math.floor(rating) ? styles.starFilled : styles.starEmpty}
      />
    ));
  };

  return (
    <div className={styles.categoriesPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FaStore className={styles.heroBadgeIcon} />
            <span>Explore Our Store</span>
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
      </div>

      {/* Search and Filter */}
      <div className={styles.filterSection}>
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
                <button 
                  className={styles.clearSearch}
                  onClick={() => setSearchTerm('')}
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <div className={styles.filterStats}>
              <span className={styles.statsCount}>
                <FaTag className={styles.statsIcon} />
                {filteredCategories.length} Categories
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className={styles.categoriesGridSection}>
        <div className={styles.container}>
          {selectedCategory && selectedCategoryData && (
            <div className={styles.selectedCategoryHeader}>
              <button 
                className={styles.backBtn}
                onClick={() => setSelectedCategory(null)}
              >
                <FaArrowRight className={styles.backIcon} />
                Back to all categories
              </button>
              <div className={styles.selectedCategoryInfo}>
                <div 
                  className={styles.selectedCategoryIcon}
                  style={{ backgroundColor: selectedCategoryData.bgColor, color: selectedCategoryData.color }}
                >
                  {selectedCategoryData.icon}
                </div>
                <div>
                  <h2 className={styles.selectedCategoryName}>{selectedCategoryData.name}</h2>
                  <div className={styles.selectedCategoryDetails}>
                    <p className={styles.selectedCategoryStats}>
                      {selectedStats?.totalProducts} products • {selectedStats?.inStock} in stock
                    </p>
                    <div className={styles.selectedCategoryRating}>
                      {renderStars(parseFloat(selectedStats?.avgRating || 0))}
                      <span>({selectedStats?.avgRating})</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.selectedCategoryDescription}>
                {selectedCategoryData.description}
              </div>
              <div className={styles.selectedSubcategories}>
                {selectedCategoryData.subcategories.map((sub, index) => (
                  <span key={index} className={styles.subcategoryTag}>
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className={styles.categoriesGrid}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => {
                const stats = getCategoryStats(category.id);
                const isHovered = hoveredCategory === category.id;
                
                return (
                  <Link 
                    to={`/products?category=${category.id}`}
                    key={category.id} 
                    className={`${styles.categoryCard} ${selectedCategory === category.id ? styles.active : ''}`}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    style={{ 
                      borderColor: selectedCategory === category.id ? category.color : 'transparent',
                      backgroundImage: isHovered ? `url(${category.image})` : 'none'
                    }}
                  >
                    <div className={styles.categoryOverlay}></div>
                    
                    <div className={styles.categoryContent}>
                      <div 
                        className={styles.categoryIcon}
                        style={{ backgroundColor: category.bgColor, color: category.color }}
                      >
                        {category.icon}
                      </div>
                      
                      <div className={styles.categoryInfo}>
                        <h3 className={styles.categoryName}>{category.name}</h3>
                        <p className={styles.categoryDescription}>{category.description}</p>
                        
                        <div className={styles.categoryStats}>
                          <span className={styles.statBadge}>
                            <FaShoppingBag className={styles.statBadgeIcon} />
                            {stats.totalProducts} Products
                          </span>
                          <span className={styles.statBadge}>
                            <FaStar className={styles.statBadgeIcon} />
                            {stats.avgRating}
                          </span>
                        </div>
                        
                        <div className={styles.categoryTags}>
                          {stats.featured && (
                            <span className={`${styles.tag} ${styles.tagFeatured}`}>
                              <FaFire /> Featured
                            </span>
                          )}
                          {stats.bestseller && (
                            <span className={`${styles.tag} ${styles.tagBestseller}`}>
                              <FaBolt /> Bestseller
                            </span>
                          )}
                          {stats.newArrivals && (
                            <span className={`${styles.tag} ${styles.tagNew}`}>
                              <FaGift /> New
                            </span>
                          )}
                        </div>

                        <div className={styles.categoryOffer}>
                          <FaPercent className={styles.offerIcon} />
                          <span>{category.offer}</span>
                        </div>

                        <div className={styles.categorySubcategories}>
                          {category.subcategories.slice(0, 3).map((sub, index) => (
                            <span key={index} className={styles.subcategoryChip}>
                              {sub}
                            </span>
                          ))}
                          {category.subcategories.length > 3 && (
                            <span className={styles.subcategoryMore}>+{category.subcategories.length - 3}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className={styles.exploreBtn}>
                        Explore
                        <FaChevronRight className={styles.exploreIcon} />
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <FaSearch />
                </div>
                <h3>No categories found</h3>
                <p>Try adjusting your search terms</p>
                <button className={styles.resetBtn} onClick={() => setSearchTerm('')}>
                  <FaTimes /> Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Categories Banner */}
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
                    style={{ backgroundColor: cat.bgColor, color: cat.color }}
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

      {/* CTA Section */}
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