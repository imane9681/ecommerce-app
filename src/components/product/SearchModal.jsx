import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTimes, 
  FaSearch, 
  FaShoppingBag,
  FaArrowRight,
  FaStar,
  FaTag,
  FaFilter
} from 'react-icons/fa';
import { products } from '../../utils/constants';
import styles from './SearchModal.module.css';

const SearchModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // فلتر المنتجات المشابهة للمنتج الحالي
  const similarProducts = products.filter(p => 
    p.id !== product.id && 
    (p.category === product.category || p.brand === product.brand)
  ).slice(0, 6);

  // معالجة البحث
  useEffect(() => {
    const shouldSearch = searchTerm.length > 1 || selectedFilter !== 'all';

    if (shouldSearch) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const term = searchTerm.trim().toLowerCase();
        const results = products.filter((p) => {
          if (p.id === product.id) return false;

          const matchesTitle = p.title.toLowerCase().includes(term);
          const matchesCategory = p.category?.toLowerCase().includes(term);
          const matchesBrand = p.brand?.toLowerCase().includes(term);

          if (selectedFilter === 'all') {
            if (term) {
              return matchesTitle || matchesCategory || matchesBrand;
            }
            return p.category === product.category || p.brand === product.brand;
          }

          if (selectedFilter === 'category') {
            if (term) {
              return matchesCategory;
            }
            return p.category === product.category;
          }

          if (selectedFilter === 'brand') {
            if (term) {
              return matchesBrand;
            }
            return p.brand === product.brand;
          }

          if (selectedFilter === 'title') {
            if (term) {
              return matchesTitle;
            }
            return p.title.toLowerCase().includes(product.title.toLowerCase());
          }

          return false;
        }).slice(0, 8);

        setSearchResults(results);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }

    setSearchResults([]);
    setIsLoading(false);
  }, [searchTerm, selectedFilter, product]);

  // إغلاق المودال
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
    }
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  const handleViewAll = () => {
    if (product.category) {
      navigate(`/products?category=${product.category}`);
    } else if (searchTerm) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
    onClose();
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar 
        key={index} 
        className={index < Math.floor(rating || 0) ? styles.starFilled : styles.starEmpty}
      />
    ));
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <FaSearch className={styles.titleIcon} />
            <h2>Search Similar Products</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Search Input */}
        <div className={styles.searchSection}>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <input
              type="text"
              placeholder={`Search for "${product.title}"...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              autoFocus
            />
            <button type="submit" className={styles.searchBtn}>
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className={styles.filterSection}>
          <span className={styles.filterLabel}>
            <FaFilter className={styles.filterIcon} />
            Filter:
          </span>
          <div className={styles.filterOptions}>
            <button 
              className={`${styles.filterBtn} ${selectedFilter === 'all' ? styles.active : ''}`}
              onClick={() => handleFilterClick('all')}
            >
              All
            </button>
            <button 
              className={`${styles.filterBtn} ${selectedFilter === 'title' ? styles.active : ''}`}
              onClick={() => handleFilterClick('title')}
            >
              By Name
            </button>
            <button 
              className={`${styles.filterBtn} ${selectedFilter === 'category' ? styles.active : ''}`}
              onClick={() => handleFilterClick('category')}
            >
              By Category
            </button>
            <button 
              className={`${styles.filterBtn} ${selectedFilter === 'brand' ? styles.active : ''}`}
              onClick={() => handleFilterClick('brand')}
            >
              By Brand
            </button>
          </div>
        </div>

        {/* Results */}
        <div className={styles.resultsSection}>
          {/* Similar Products */}
          {!searchTerm && selectedFilter === 'all' && (
            <div className={styles.similarSection}>
              <div className={styles.similarHeader}>
                <h3>
                  <FaShoppingBag className={styles.similarIcon} />
                  Similar Products
                </h3>
                <span className={styles.similarCount}>{similarProducts.length} items</span>
              </div>
              <div className={styles.similarGrid}>
                {similarProducts.map((item) => (
                  <div 
                    key={item.id} 
                    className={styles.similarItem}
                    onClick={() => handleProductClick(item.id)}
                  >
                    <div className={styles.similarImage}>
                      <img src={item.img} alt={item.title} />
                    </div>
                    <div className={styles.similarInfo}>
                      <h4>{item.title}</h4>
                      <div className={styles.similarRating}>
                        {renderStars(item.rating || 4)}
                      </div>
                      <div className={styles.similarPrice}>{item.price}</div>
                      {item.discount && (
                        <span className={styles.similarDiscount}>{item.discount}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {(searchTerm || selectedFilter !== 'all') && (
            <div className={styles.searchResults}>
              <div className={styles.resultsHeader}>
                <h3>
                  <FaSearch className={styles.resultsIcon} />
                  Results for "{searchTerm}"
                </h3>
                <span className={styles.resultsCount}>{searchResults.length} found</span>
              </div>

              {isLoading ? (
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  <span>Searching...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className={styles.resultsList}>
                  {searchResults.map((item) => (
                    <div 
                      key={item.id} 
                      className={styles.resultItem}
                      onClick={() => handleProductClick(item.id)}
                    >
                      <div className={styles.resultImage}>
                        <img src={item.img} alt={item.title} />
                      </div>
                      <div className={styles.resultInfo}>
                        <h4>{item.title}</h4>
                        <div className={styles.resultMeta}>
                          <span className={styles.resultCategory}>
                            <FaTag className={styles.metaIcon} />
                            {item.category}
                          </span>
                          <span className={styles.resultPrice}>{item.price}</span>
                        </div>
                        <div className={styles.resultRating}>
                          {renderStars(item.rating || 4)}
                          <span className={styles.resultReviews}>({item.reviewCount || 0})</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noResults}>
                  <div className={styles.noResultsIcon}>
                  <FaSearch />
                  </div>
                  <h4>No products found</h4>
                  <p>Try adjusting your search terms</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button className={styles.viewAllBtn} onClick={handleViewAll}>
            View All {product.category || 'Products'}
            <FaArrowRight className={styles.viewAllIcon} />
          </button>
          <span className={styles.footerHint}>
            {(searchTerm || selectedFilter !== 'all') ? `${searchResults.length} results found` : 'Search for more products'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;