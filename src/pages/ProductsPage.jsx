// ProductsPage.jsx - مع دعم promotion, sort, brand, rating, price, availability
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import { products } from '../utils/constants';
import styles from './ProductsPage.module.css';

// استيراد الأيقونات
import { 
  FaFilter, 
  FaTags, 
  FaStar, 
  FaDollarSign, 
  FaCheckCircle, 
  FaTimesCircle,
  FaShoppingBag,
  FaTshirt,
  FaMobile,
  FaHome,
  FaSprayCan,
  FaFootballBall,
  FaFire,
  FaShoppingCart,
  FaPhone,
  FaShippingFast,
  FaUndo,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaChevronDown,
  FaShieldAlt,
  FaTimes
} from 'react-icons/fa';

// مكون Dropdown المخصص
const CustomSortDropdown = ({ sortOrder, setSortOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'default', label: 'Default Sorting' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === sortOrder)?.label;

  return (
    <div className={styles.customSortDropdown} ref={dropdownRef}>
      <div 
        className={styles.dropdownHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption}</span>
        <FaChevronDown className={`${styles.dropdownArrow} ${isOpen ? styles.rotate : ''}`} />
      </div>
      
      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.dropdownItem} ${sortOrder === option.value ? styles.selected : ''}`}
              onClick={() => {
                setSortOrder(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductsPage = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [availability, setAvailability] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 12;

  // تعريف البيانات قبل استخدامها
  const categories = [
    { value: 'clothing', label: 'Clothing', icon: <FaTshirt /> },
    { value: 'electronics', label: 'Electronics', icon: <FaMobile /> },
    { value: 'home', label: 'Home', icon: <FaHome /> },
    { value: 'beauty', label: 'Beauty', icon: <FaSprayCan /> },
    { value: 'sports', label: 'Sports', icon: <FaFootballBall /> }
  ];

  const brands = [
    { value: 'apple', label: 'Apple', icon: <FaMobile /> },
    { value: 'oppo', label: 'Oppo', icon: <FaMobile /> },
    { value: 'dyson', label: 'Dyson', icon: <FaMobile /> },
    { value: 'prada', label: 'Prada', icon: <FaShoppingBag /> },
    { value: 'velomy', label: 'Velomy', icon: <FaTshirt /> },
    { value: 'shreeji', label: 'Shreeji', icon: <FaMobile /> },
    { value: 'needly', label: 'Needly', icon: <FaSprayCan /> },
    { value: 'toteme', label: 'Toteme', icon: <FaTshirt /> },
    { value: 'looks', label: 'Looks & Meii', icon: <FaSprayCan /> },
    { value: 'onoma', label: 'Onoma', icon: <FaSprayCan /> },
    { value: 'beats', label: 'Beats', icon: <FaMobile /> },
    { value: 'moonlight', label: 'Moonlight', icon: <FaMobile /> }
  ];

  const promotionsList = [
    { value: 'sale', label: 'Sale', icon: <FaFire /> },
    { value: 'new', label: 'New Arrival', icon: <FaStar /> },
    { value: 'featured', label: 'Featured', icon: <FaShoppingBag /> },
    { value: 'bestseller', label: 'Best Seller', icon: <FaCheckCircle /> }
  ];

  // دوال الفلتر
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  // ===== 🔥 قراءة جميع المعاملات من الرابط =====
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // قراءة جميع المعاملات
    const categoryParam = params.get('category');
    const searchParam = params.get('search') || '';
    const sortParam = params.get('sort');
    const promotionParam = params.get('promotion');
    const brandParam = params.get('brand');
    const ratingParam = params.get('rating');
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    const availabilityParam = params.get('availability');

    // تطبيق البحث
    setSearchTerm(searchParam);

    // تطبيق الفئات
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }

    // 🔥 تطبيق الترتيب (sort)
    if (sortParam && ['default', 'newest', 'price-low', 'price-high', 'rating'].includes(sortParam)) {
      setSortOrder(sortParam);
    }

    // 🔥 تطبيق العروض (promotion)
    if (promotionParam) {
      const promoValue = promotionParam === 'sale' ? 'sale' : 
                         promotionParam === 'new' ? 'new' : 
                         promotionParam === 'featured' ? 'featured' : 
                         promotionParam === 'bestseller' ? 'bestseller' : null;
      if (promoValue) {
        setPromotions([promoValue]);
      }
    }

    // تطبيق العلامات التجارية
    if (brandParam) {
      setSelectedBrands([brandParam]);
    }

    // تطبيق التقييمات
    if (ratingParam) {
      const rating = parseInt(ratingParam);
      if (rating >= 1 && rating <= 5) {
        setSelectedRatings([rating]);
      }
    }

    // تطبيق السعر
    if (minPrice) {
      setPriceRange(prev => ({ ...prev, min: parseInt(minPrice) || 0 }));
    }
    if (maxPrice) {
      setPriceRange(prev => ({ ...prev, max: parseInt(maxPrice) || 1000 }));
    }

    // تطبيق التوفر
    if (availabilityParam && ['in-stock', 'out-of-stock'].includes(availabilityParam)) {
      setAvailability(availabilityParam);
    }

    // التمرير إلى قسم المنتجات
    if (categoryParam || searchParam || sortParam || promotionParam) {
      setTimeout(() => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location.search]);

  // تطبيق الفلاتر عند تغيير أي فلتر
  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedBrands, priceRange, selectedRatings, promotions, availability, sortOrder, searchTerm]);

  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    const price = parseInt(priceStr.replace('$', '').replace(',', '')) || 0;
    return price;
  };

  const getRatingCounts = () => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    products.forEach(product => {
      const rating = Math.floor(product.rating || 0);
      if (rating >= 1 && rating <= 5) {
        counts[rating]++;
      }
    });
    return counts;
  };

  const ratingCounts = getRatingCounts();

  const applyFilters = () => {
    let result = [...products];
    
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    if (selectedBrands.length > 0) {
      result = result.filter(product => 
        selectedBrands.includes(product.brand?.toLowerCase())
      );
    }
    
    result = result.filter(product => {
      const price = parsePrice(product.price);
      return price >= priceRange.min && price <= priceRange.max;
    });
    
    if (selectedRatings.length > 0) {
      result = result.filter(product => {
        const rating = Math.floor(product.rating || 0);
        return selectedRatings.includes(rating);
      });
    }
    
    if (promotions.length > 0) {
      result = result.filter(product => 
        promotions.some(promo => (product.tags || []).includes(promo))
      );
    }
    
    if (availability === 'in-stock') {
      result = result.filter(product => product.inStock);
    } else if (availability === 'out-of-stock') {
      result = result.filter(product => !product.inStock);
    }

    const trimmedSearch = searchTerm.trim().toLowerCase();
    if (trimmedSearch) {
      result = result.filter(product => {
        const title = (product.title || '').toLowerCase();
        const brand = (product.brand || '').toLowerCase();
        const description = (product.description || '').toLowerCase();
        const tags = (product.tags || []).join(' ').toLowerCase();

        return title.includes(trimmedSearch) ||
               brand.includes(trimmedSearch) ||
               description.includes(trimmedSearch) ||
               tags.includes(trimmedSearch);
      });
    }
    
    result = sortProducts(result);
    setFilteredProducts(result);
    setCurrentPage(1);
  };

  const sortProducts = (productsToSort) => {
    const sorted = [...productsToSort];
    switch(sortOrder) {
      case 'price-low':
        return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      case 'price-high':
        return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      case 'newest':
        return sorted.sort((a, b) => {
          const aIsNew = a.isNew ? 1 : 0;
          const bIsNew = b.isNew ? 1 : 0;
          return bIsNew - aIsNew;
        });
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'default':
      default:
        return sorted;
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const handlePromotionChange = (promotion) => {
    setPromotions(prev =>
      prev.includes(promotion)
        ? prev.filter(p => p !== promotion)
        : [...prev, promotion]
    );
  };

  const handlePriceChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    setPriceRange(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 1000 });
    setSelectedRatings([]);
    setPromotions([]);
    setAvailability('all');
    setSortOrder('default');
  };

  const removeFilter = (type, value = null) => {
    switch(type) {
      case 'category':
        setSelectedCategories(prev => prev.filter(cat => cat !== value));
        break;
      case 'brand':
        setSelectedBrands(prev => prev.filter(b => b !== value));
        break;
      case 'price':
        setPriceRange({ min: 0, max: 1000 });
        break;
      case 'rating':
        setSelectedRatings(prev => prev.filter(r => r !== value));
        break;
      case 'promotion':
        setPromotions(prev => prev.filter(p => p !== value));
        break;
      case 'availability':
        setAvailability('all');
        break;
      default:
        break;
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${styles.star} ${index < rating ? styles.filled : ''}`}
      />
    ));
  };

  const displayProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Active Filters
  const activeFilters = [
    ...selectedCategories.map(cat => ({ 
      type: 'category', 
      value: cat, 
      label: categories.find(c => c.value === cat)?.label || cat 
    })),
    ...selectedBrands.map(brand => ({ 
      type: 'brand', 
      value: brand, 
      label: brands.find(b => b.value === brand)?.label || brand 
    })),
    ...(priceRange.min > 0 || priceRange.max < 1000 ? [{ type: 'price', value: null, label: `$${priceRange.min} - $${priceRange.max}` }] : []),
    ...selectedRatings.map(rating => ({ 
      type: 'rating', 
      value: rating, 
      label: `${rating} Stars` 
    })),
    ...promotions.map(promo => ({ 
      type: 'promotion', 
      value: promo, 
      label: promotionsList.find(p => p.value === promo)?.label || promo 
    })),
    ...(availability !== 'all' ? [{ type: 'availability', value: null, label: availability === 'in-stock' ? 'In Stock' : 'Out of Stock' }] : [])
  ];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const pageNumbers = [];
  
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);
  
  if (totalPages > 5) {
    if (currentPage <= 3) {
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
    }
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {/* بانر العروض */}
      <section className={styles.promoBanner}>
        <div className={styles.container}>
          <div className={styles.bannerContent}>
            <h2>Winter Sale - Up to 60% OFF</h2>
            <p>Limited time offers on selected items • Free shipping on orders over $50</p>
            <button className={styles.shopNowBtn}>
              <FaShoppingCart style={{ marginRight: '8px' }} />
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* منطقة الفلاتر والمنتجات */}
      <section className={styles.section} id="products">
        <div className={styles.mainContainer}>
          {/* ===== فلتر الحاسوب (شريط جانبي) ===== */}
          <aside className={styles.filterSidebar}>
            <div className={styles.filterHeader}>
              <h3><FaFilter style={{ color: '#fdb673' }} />Filter Options</h3>
            </div>

            {/* By Categories */}
            <div className={styles.filterGroup}>
              <div className={styles.filterGroupTitle}>
                <FaTags />By Categories 
              </div>
              <div className={styles.filterOptions}>
                {categories.map(category => (
                  <label key={category.value} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      className={styles.filterCheckbox}
                      checked={selectedCategories.includes(category.value)}
                      onChange={() => handleCategoryChange(category.value)}
                    />
                    <span className={styles.filterLabel}>
                      {category.icon} {category.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* By Brands */}
            <div className={styles.filterGroup}>
              <div className={styles.filterGroupTitle}>
                <FaShoppingBag /> By Brands
              </div>
              <div className={styles.filterOptions}>
                {brands.map(brand => (
                  <label key={brand.value} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      className={styles.filterCheckbox}
                      checked={selectedBrands.includes(brand.value)}
                      onChange={() => handleBrandChange(brand.value)}
                    />
                    <span className={styles.filterLabel}>
                      {brand.icon} {brand.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className={styles.filterGroup}>
              <div className={styles.filterGroupTitle}>
                <FaDollarSign /> Price
              </div>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  className={styles.priceInput}
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  min="0"
                />
                <span className={styles.priceSeparator}>-</span>
                <input
                  type="number"
                  className={styles.priceInput}
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  min="0"
                />
              </div>
            </div>

            {/* Review */}
            <div className={styles.filterGroup}>
              <div className={styles.filterGroupTitle}>
                <FaStar style={{ color: '#ffc107' }} /> Review
              </div>
              <div className={styles.filterOptions}>
                {[5, 4, 3, 2, 1].map(rating => (
                  <label key={rating} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      className={styles.filterCheckbox}
                      checked={selectedRatings.includes(rating)}
                      onChange={() => handleRatingChange(rating)}
                    />
                    <span className={styles.filterLabel}>
                      <div className={styles.starRatingItem}>
                        <div className={styles.stars}>
                          {renderStars(rating)}
                        </div>
                        <span className={styles.ratingCount}>({ratingCounts[rating]})</span>
                      </div>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* By Promotions */}
            <div className={styles.filterGroup}>
              <div className={styles.filterGroupTitle}>
                <FaFire style={{ color: '#ff6b35' }} /> By Promotions
              </div>
              <div className={styles.filterOptions}>
                {promotionsList.map(promotion => (
                  <label key={promotion.value} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      className={styles.filterCheckbox}
                      checked={promotions.includes(promotion.value)}
                      onChange={() => handlePromotionChange(promotion.value)}
                    />
                    <span className={styles.filterLabel}>
                      {promotion.icon} {promotion.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className={styles.filterGroup}>
              <div className={styles.filterGroupTitle}>
                <FaCheckCircle /> Availability
              </div>
              <div className={styles.filterOptions}>
                <label className={styles.filterOption}>
                  <input
                    type="radio"
                    name="availability"
                    className={styles.filterCheckbox}
                    checked={availability === 'all'}
                    onChange={() => setAvailability('all')}
                  />
                  <span className={styles.filterLabel}>
                    <FaShoppingBag /> All Products
                  </span>
                </label>
                <label className={styles.filterOption}>
                  <input
                    type="radio"
                    name="availability"
                    className={styles.filterCheckbox}
                    checked={availability === 'in-stock'}
                    onChange={() => setAvailability('in-stock')}
                  />
                  <span className={styles.filterLabel}>
                    <FaCheckCircle style={{ color: '#28a745' }} /> In Stock
                  </span>
                </label>
                <label className={styles.filterOption}>
                  <input
                    type="radio"
                    name="availability"
                    className={styles.filterCheckbox}
                    checked={availability === 'out-of-stock'}
                    onChange={() => setAvailability('out-of-stock')}
                  />
                  <span className={styles.filterLabel}>
                    <FaTimesCircle style={{ color: '#dc3545' }} /> Out of Stock
                  </span>
                </label>
              </div>
            </div>

            {/* Clear All Button */}
            {(selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange.min > 0 || priceRange.max < 1000 || selectedRatings.length > 0 || promotions.length > 0 || availability !== 'all') && (
              <button className={styles.clearAllBtn} onClick={clearAllFilters}>
                <FaTimesCircle />
                Clear All Filters
              </button>
            )}
          </aside>

          {/* ===== محتوى المنتجات ===== */}
          <div className={styles.productsContent}>
            {/* شريط النتائج */}
            <div className={styles.resultsBar}>
              <span className={styles.resultsCount}>
                Showing {displayProducts.length} of {filteredProducts.length} products
              </span>
              
              {/* ===== CustomSortDropdown - يظهر في الحاسوب ===== */}
              <div className={styles.sortWrapper}>
                <CustomSortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
              </div>
            </div>

            {/* ===== صف الفلتر والترتيب - يظهر فقط في الهاتف ===== */}
            <div className={styles.filterSortRow}>
              <button className={styles.filterToggleBtn} onClick={toggleFilter}>
                <FaFilter /> Filter
              </button>
              <CustomSortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className={styles.activeFilters}>
                <span className={styles.activeFiltersLabel}>Active Filters : </span>
                <div className={styles.activeFiltersList}>
                  {activeFilters.map((filter, index) => (
                    <span key={index} className={styles.activeFilter}>
                      {filter.label}
                      <button 
                        onClick={() => removeFilter(filter.type, filter.value)}
                        className={styles.removeFilterBtn}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* شبكة المنتجات */}
            {displayProducts.length > 0 ? (
              <>
                <ProductList products={displayProducts} />
                
                {filteredProducts.length > itemsPerPage && (
                  <div className={styles.productsPagination}>
                    <div className={styles.paginationWrapper}>
                      <button
                        type="button"
                        className={`${styles.paginationArrow} ${currentPage === 1 ? styles.disabled : ''}`}
                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                      >
                        <FaChevronLeft />
                      </button>
                      
                      {startPage > 1 && (
                        <>
                          <span
                            className={`${styles.paginationNumber} ${currentPage === 1 ? styles.active : ''}`}
                            onClick={() => setCurrentPage(1)}
                          >
                            1
                          </span>
                          {startPage > 2 && <span className={styles.paginationDots}>...</span>}
                        </>
                      )}
                      
                      {pageNumbers.map(number => (
                        <span
                          key={number}
                          className={`${styles.paginationNumber} ${currentPage === number ? styles.active : ''}`}
                          onClick={() => setCurrentPage(number)}
                        >
                          {number}
                        </span>
                      ))}
                      
                      {endPage < totalPages && (
                        <>
                          {endPage < totalPages - 1 && <span className={styles.paginationDots}>...</span>}
                          <span
                            className={`${styles.paginationNumber} ${currentPage === totalPages ? styles.active : ''}`}
                            onClick={() => setCurrentPage(totalPages)}
                          >
                            {totalPages}
                          </span>
                        </>
                      )}
                      
                      <button
                        type="button"
                        className={`${styles.paginationArrow} ${currentPage === totalPages ? styles.disabled : ''}`}
                        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.noProducts}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button className={styles.clearAllBtn} onClick={clearAllFilters}>
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== فلتر الموبايل (Overlay + Drawer) ===== */}
      <div className={`${styles.filterOverlay} ${isFilterOpen ? styles.open : ''}`} onClick={closeFilter}></div>

      <div className={`${styles.filterDrawer} ${isFilterOpen ? styles.open : ''}`}>
        <div className={styles.filterDrawerHeader}>
          <h3><FaFilter /> Filter Options</h3>
          <button className={styles.filterDrawerClose} onClick={closeFilter}>
            <FaTimes />
          </button>
        </div>

        {/* By Categories */}
        <div className={styles.filterGroup}>
          <div className={styles.filterGroupTitle}>
            <FaTags />By Categories 
          </div>
          <div className={styles.filterOptions}>
            {categories.map(category => (
              <label key={category.value} className={styles.filterOption}>
                <input
                  type="checkbox"
                  className={styles.filterCheckbox}
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => handleCategoryChange(category.value)}
                />
                <span className={styles.filterLabel}>
                  {category.icon} {category.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* By Brands */}
        <div className={styles.filterGroup}>
          <div className={styles.filterGroupTitle}>
            <FaShoppingBag /> By Brands
          </div>
          <div className={styles.filterOptions}>
            {brands.map(brand => (
              <label key={brand.value} className={styles.filterOption}>
                <input
                  type="checkbox"
                  className={styles.filterCheckbox}
                  checked={selectedBrands.includes(brand.value)}
                  onChange={() => handleBrandChange(brand.value)}
                />
                <span className={styles.filterLabel}>
                  {brand.icon} {brand.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className={styles.filterGroup}>
          <div className={styles.filterGroupTitle}>
            <FaDollarSign /> Price
          </div>
          <div className={styles.priceInputs}>
            <input
              type="number"
              className={styles.priceInput}
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              min="0"
            />
            <span className={styles.priceSeparator}>-</span>
            <input
              type="number"
              className={styles.priceInput}
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              min="0"
            />
          </div>
        </div>

        {/* Review */}
        <div className={styles.filterGroup}>
          <div className={styles.filterGroupTitle}>
            <FaStar style={{ color: '#ffc107' }} /> Review
          </div>
          <div className={styles.filterOptions}>
            {[5, 4, 3, 2, 1].map(rating => (
              <label key={rating} className={styles.filterOption}>
                <input
                  type="checkbox"
                  className={styles.filterCheckbox}
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                />
                <span className={styles.filterLabel}>
                  <div className={styles.starRatingItem}>
                    <div className={styles.stars}>
                      {renderStars(rating)}
                    </div>
                    <span className={styles.ratingCount}>({ratingCounts[rating]})</span>
                  </div>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* By Promotions */}
        <div className={styles.filterGroup}>
          <div className={styles.filterGroupTitle}>
            <FaFire style={{ color: '#ff6b35' }} /> By Promotions
          </div>
          <div className={styles.filterOptions}>
            {promotionsList.map(promotion => (
              <label key={promotion.value} className={styles.filterOption}>
                <input
                  type="checkbox"
                  className={styles.filterCheckbox}
                  checked={promotions.includes(promotion.value)}
                  onChange={() => handlePromotionChange(promotion.value)}
                />
                <span className={styles.filterLabel}>
                  {promotion.icon} {promotion.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className={styles.filterGroup}>
          <div className={styles.filterGroupTitle}>
            <FaCheckCircle /> Availability
          </div>
          <div className={styles.filterOptions}>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="availability-mobile"
                className={styles.filterCheckbox}
                checked={availability === 'all'}
                onChange={() => setAvailability('all')}
              />
              <span className={styles.filterLabel}>
                <FaShoppingBag /> All Products
              </span>
            </label>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="availability-mobile"
                className={styles.filterCheckbox}
                checked={availability === 'in-stock'}
                onChange={() => setAvailability('in-stock')}
              />
              <span className={styles.filterLabel}>
                <FaCheckCircle style={{ color: '#28a745' }} /> In Stock
              </span>
            </label>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="availability-mobile"
                className={styles.filterCheckbox}
                checked={availability === 'out-of-stock'}
                onChange={() => setAvailability('out-of-stock')}
              />
              <span className={styles.filterLabel}>
                <FaTimesCircle style={{ color: '#dc3545' }} /> Out of Stock
              </span>
            </label>
          </div>
        </div>

        {/* Clear All Button */}
        <div className={styles.filterDrawerActions}>
          <button className={styles.applyBtn} onClick={() => { applyFilters(); closeFilter(); }}>
            Apply Filters
          </button>
          <button className={styles.resetBtn} onClick={() => { clearAllFilters(); closeFilter(); }}>
            Reset
          </button>
        </div>
      </div>

      {/* بانر المنتجات المقترحة */}
      <section className={styles.suggestedBanner}>
        <div className={styles.container}>
          <div className={styles.bannerContent}>
            <h3>You Might Also Like</h3>
            <p>Discover related products based on your browsing history</p>
            <div className={styles.suggestedProducts}>
              <button className={styles.exploreBtn}>
                <FaEye />
                Explore More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* المساعدة والدعم */}
      <section className={styles.helpSection}>
        <div className={styles.container}>
          <div className={styles.helpContent}>
            <div className={styles.helpGrid}>
              <div className={styles.helpItem}>
                <div className={styles.helpIcon}>
                  <FaPhone />
                </div>
                <div className={styles.helpText}>
                  <h5>24/7 Support</h5>
                  <p>Always here to help</p>
                </div>
              </div>
              
              <div className={styles.helpItem}>
                <div className={styles.helpIcon}>
                  <FaShippingFast />
                </div>
                <div className={styles.helpText}>
                  <h5>Fast Shipping</h5>
                  <p>Free on orders over $50</p>
                </div>
              </div>
              
              <div className={styles.helpItem}>
                <div className={styles.helpIcon}>
                  <FaUndo />
                </div>
                <div className={styles.helpText}>
                  <h5>Easy Returns</h5>
                  <p>30-day guarantee</p>
                </div>
              </div>
              
              <div className={styles.helpItem}>
                <div className={styles.helpIcon}>
                  <FaShieldAlt />
                </div>
                <div className={styles.helpText}>
                  <h5>Secure Payment</h5>
                  <p>100% safe transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;