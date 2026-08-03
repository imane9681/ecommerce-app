// Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { 
  FaSearch, 
  FaUser, 
  FaShoppingCart, 
  FaHeart,
  FaChevronDown,
  FaGlobe,
  FaDollarSign,
  FaBars,
  FaTimes,
  FaHome,
  FaShoppingBag,
  FaBlog,
  FaInfoCircle,
  FaHeadset,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaUserCircle,
  FaStore
} from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
  const { getCartCount, getWishlistCount } = useCart();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [wishlistBadgeBounce, setWishlistBadgeBounce] = useState(false);
  const [cartBadgeBounce, setCartBadgeBounce] = useState(false);
  const dropdownRef = useRef(null);
  const languageRef = useRef(null);
  const currencyRef = useRef(null);
  const sidebarRef = useRef(null);
  
  const mainHeaderPages = ['/', '/login', '/register', '/products', '/blog', '/categories', '/contact', '/about'];
  const useMainHeader = mainHeaderPages.includes(location.pathname);
  
  const categories = [
    'All Categories',
    'Electronics',
    'Computers', 
    'Fashion',
    'Home',
    'Furniture',
    'Beauty'
  ];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'AR', name: 'العربية' },
    { code: 'FR', name: 'Français' },
    { code: 'ES', name: 'Español' }
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' }
  ];

  // مراقبة التغيرات في العدد لتطبيق التأثير
  const wishlistCount = getWishlistCount();
  const cartCount = getCartCount();

  useEffect(() => {
    if (wishlistCount > 0) {
      setWishlistBadgeBounce(true);
      const timer = setTimeout(() => setWishlistBadgeBounce(false), 400);
      return () => clearTimeout(timer);
    }
  }, [wishlistCount]);

  useEffect(() => {
    if (cartCount > 0) {
      setCartBadgeBounce(true);
      const timer = setTimeout(() => setCartBadgeBounce(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // إغلاق جميع dropdowns عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setIsCurrencyOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest(`.${styles.menuBtn}`)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // منع التمرير عند فتح السايد بار
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const toggleCategoryDropdown = (e) => {
    e.stopPropagation();
    setIsCategoryOpen(!isCategoryOpen);
    setIsLanguageOpen(false);
    setIsCurrencyOpen(false);
  };

  const toggleLanguageDropdown = (e) => {
    e.stopPropagation();
    setIsLanguageOpen(!isLanguageOpen);
    setIsCategoryOpen(false);
    setIsCurrencyOpen(false);
  };

  const toggleCurrencyDropdown = (e) => {
    e.stopPropagation();
    setIsCurrencyOpen(!isCurrencyOpen);
    setIsCategoryOpen(false);
    setIsLanguageOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);

    // If user selects 'All Categories', navigate to /products without category filter
    if (!category || category === 'All Categories') {
      navigate('/products');
      return;
    }

    // navigate to products page with category param (lowercased)
    const categoryParam = category.toLowerCase();
    const params = new URLSearchParams();
    params.set('category', categoryParam);

    // include existing search term if present
    if (searchTerm && searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }

    navigate(`/products?${params.toString()}`);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.code);
    setIsLanguageOpen(false);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency.code);
    setIsCurrencyOpen(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedSearch = searchTerm.trim();
    const params = new URLSearchParams();

    if (trimmedSearch) {
      params.set('search', trimmedSearch);
    }

    if (selectedCategory && selectedCategory !== 'All Categories') {
      params.set('category', selectedCategory.toLowerCase());
    }

    navigate(`/products${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <>
      <header className={useMainHeader ? styles.header : styles.headers}>
        <div className={styles.container}>
          {/* Menu Button للموبايل */}
          <button className={styles.menuBtn} onClick={toggleSidebar} aria-label="Toggle menu">
            <FaBars />
          </button>

          {/* Logo مع أيقونة */}
          <Link to="/" className={styles.logo}>
            <FaStore className={styles.logoIcon} />
            <span>Shop</span>
          </Link>

          {/* Navigation */}
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/products" className={styles.navLink}>Products</Link>
            <Link to="/blog" className={styles.navLink}>Blog</Link>
            <Link to="/categories" className={styles.navLink}>Categories</Link>
            <Link to="/about" className={styles.navLink}>About</Link>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
          </nav>

          {/* Search Bar */}
          <div className={styles.searchSection}>
            <div className={styles.searchContainer} ref={dropdownRef}>
              <div 
                className={`${styles.categoryDropdown} ${isCategoryOpen ? styles.isOpen : ''}`}
                onClick={toggleCategoryDropdown}
              >
                <span className={styles.selectedCategory}>
                  {selectedCategory}
                </span>
                <FaChevronDown className={styles.dropdownIcon} />
                
                {isCategoryOpen && (
                  <div className={styles.dropdownMenu}>
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className={styles.dropdownItem}
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Search products..."
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                 
                <button type="submit" className={styles.searchBtn}>
                  <FaSearch className={styles.searchIcon} />
                </button>
              </form>
            </div>
          </div>

          {/* Language and Currency */}
          <div className={styles.languageCurrency}>
            <div className={styles.dropdownWrapper} ref={languageRef}>
              <div 
                className={`${styles.dropdownTrigger} ${isLanguageOpen ? styles.isOpen : ''}`}
                onClick={toggleLanguageDropdown}
              >
                <FaGlobe className={styles.dropdownIcons} />
                <span className={styles.dropdownText}>{selectedLanguage}</span>
                <FaChevronDown className={styles.dropdownIcon} />
                
                {isLanguageOpen && (
                  <div className={styles.dropdownMenu}>
                    {languages.map((language, index) => (
                      <div
                        key={index}
                        className={styles.dropdownItem}
                        onClick={() => handleLanguageSelect(language)}
                      >
                        <span className={styles.languageText}>{language.name}</span>
                        <span className={styles.languageCode}>({language.code})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.dropdownWrapper} ref={currencyRef}>
              <div 
                className={`${styles.dropdownTrigger} ${isCurrencyOpen ? styles.isOpen : ''}`}
                onClick={toggleCurrencyDropdown}
              >
                <FaDollarSign className={styles.dropdownIcons} />
                <span className={styles.dropdownText}>{selectedCurrency}</span>
                <FaChevronDown className={styles.dropdownIcon} />
                
                {isCurrencyOpen && (
                  <div className={styles.dropdownMenu}>
                    {currencies.map((currency, index) => (
                      <div
                        key={index}
                        className={styles.dropdownItem}
                        onClick={() => handleCurrencySelect(currency)}
                      >
                        <span className={styles.currencySymbol}>{currency.symbol}</span>
                        <span className={styles.currencyText}>{currency.name}</span>
                        <span className={styles.currencyCode}>({currency.code})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className={styles.actions}>
            <Link to="/wishlist" className={styles.icon}>
              <FaHeart />
              {wishlistCount > 0 && (
                <span className={`${styles.wishlistCount} ${wishlistBadgeBounce ? styles.bounce : ''} ${wishlistCount > 9 ? styles.moreThanNine : ''}`}>
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/login" className={styles.icon}>
              <FaUser />
            </Link>

            <Link to="/cart" className={styles.cart}>
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className={`${styles.cartCount} ${cartBadgeBounce ? styles.bounce : ''} ${cartCount > 9 ? styles.moreThanNine : ''}`}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ===== Sidebar للموبايل ===== */}
      <div className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.open : ''}`} onClick={closeSidebar}></div>
      
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`} ref={sidebarRef}>
        <div className={styles.sidebarHeader}>
          <Link to="/" className={styles.sidebarLogo} onClick={closeSidebar}>
            <FaStore className={styles.sidebarLogoIcon} />
            Shop
          </Link>
          <button className={styles.sidebarClose} onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>

        {/* روابط التنقل */}
        <nav className={styles.sidebarNav}>
          <Link to="/" className={styles.sidebarNavLink} onClick={closeSidebar}>
            <FaHome /> Home
          </Link>
          <Link to="/products" className={styles.sidebarNavLink} onClick={closeSidebar}>
            <FaShoppingBag /> Products
          </Link>
          <Link to="/blog" className={styles.sidebarNavLink} onClick={closeSidebar}>
           <FaBlog /> Blog
          </Link>
          <Link to="/about" className={styles.sidebarNavLink} onClick={closeSidebar}>
           <FaInfoCircle /> About
          </Link>
          <Link to="/contact" className={styles.sidebarNavLink} onClick={closeSidebar}>
            <FaHeadset /> Contact
          </Link>
        </nav>

        <div className={styles.sidebarDivider}></div>

        {/* روابط سريعة */}
        <div className={styles.sidebarQuickLinks}>
          <h4>Quick Links</h4>
          <Link to="/wishlist" className={styles.sidebarQuickLink} onClick={closeSidebar}>
            <FaHeart /> Wishlist
            {wishlistCount > 0 && (
              <span className={styles.sidebarBadge}>{wishlistCount > 99 ? '99+' : wishlistCount}</span>
            )}
          </Link>
          <Link to="/cart" className={styles.sidebarQuickLink} onClick={closeSidebar}>
            <FaShoppingCart /> Cart
            {cartCount > 0 && (
              <span className={styles.sidebarBadge}>{cartCount > 99 ? '99+' : cartCount}</span>
            )}
          </Link>
          <Link to="/login" className={styles.sidebarQuickLink} onClick={closeSidebar}>
            <FaUserCircle /> Account
          </Link>
        </div>

        <div className={styles.sidebarDivider}></div>

        {/* معلومات الاتصال */}
        <div className={styles.sidebarContact}>
          <h4>Contact Us</h4>
          <p><FaPhone /> +1 (607) 936-8058</p>
          <p><FaEnvelope /> example@gmail.com</p>
          <p><FaMapMarkerAlt /> 419 State 414 Rte, NY</p>
        </div>

        {/* روابط التواصل الاجتماعي */}
        <div className={styles.sidebarSocial}>
          <a href="#" className={styles.sidebarSocialLink}><FaFacebookF /></a>
          <a href="#" className={styles.sidebarSocialLink}><FaTwitter /></a>
          <a href="#" className={styles.sidebarSocialLink}><FaInstagram /></a>
          <a href="#" className={styles.sidebarSocialLink}><FaYoutube /></a>
        </div>
      </aside>
    </>
  );
};

export default Header;