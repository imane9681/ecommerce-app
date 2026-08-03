import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { 
  FaStar, FaRegStar, FaHeart, FaShoppingCart, FaTruck, FaShieldAlt, 
  FaUndo, FaTag, FaCheck, FaPalette, FaRulerVertical, FaCube,
  FaHashtag, FaSortAmountUp, FaCubes, FaPlus, FaMinus, FaFire,
  FaBolt, FaTachometerAlt, FaShippingFast, FaExchangeAlt, FaWarehouse,
  FaBoxOpen, FaLeaf, FaUserCheck, FaGem, FaChevronRight, FaHome,
  FaStore, FaLayerGroup, FaEye, FaShareAlt, FaSyncAlt, FaCreditCard,
  FaExclamationTriangle, FaExclamationCircle, FaTimes, FaBell,
  FaClock, FaBox, FaRulerCombined, FaQuestionCircle, FaPaperPlane,
  FaBalanceScale, FaCalculator, FaMapMarkerAlt, FaCcVisa, FaCcMastercard,
  FaCcPaypal, FaCcApplePay, FaFacebook, FaTwitter, FaPinterest,
  FaWhatsapp, FaPlayCircle, FaMobileAlt, FaChartLine, FaUsers,
  FaAward, FaQuestion, FaCheckCircle, FaInfoCircle, FaLightbulb,FaChevronUp,
  FaChevronDown, FaEquals, FaGift, FaCamera, FaCalendarAlt, FaUpload,
  FaChevronLeft
} from 'react-icons/fa';
import ProductCard from '../components/product/ProductCard';
import styles from './ProductDetails.module.css';
import { products } from '../utils/constants';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // استخراج دوال السلة والمفضلة
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist 
  } = useCart();
  const { showToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState({ id: 1, name: "Black", code: "#000000" });
  const [selectedSize, setSelectedSize] = useState({ id: 3, name: "M", available: true });
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [imageHover, setImageHover] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 59, seconds: 59 });
  const [stock] = useState(8);
  const [frequentlyBought, setFrequentlyBought] = useState([]);
  const [selectedBundleItems, setSelectedBundleItems] = useState([]);
  const [bundleTotal, setBundleTotal] = useState(0);
  const [bundleDiscount, setBundleDiscount] = useState(0);
  const [customerPhotos, setCustomerPhotos] = useState([]);
  const [selectedCustomerPhoto, setSelectedCustomerPhoto] = useState(0);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [stickyStyle, setStickyStyle] = useState({});
  const [wrapperHeight, setWrapperHeight] = useState('auto');
  const productGalleryWrapperRef = useRef(null);
  const productGalleryRef = useRef(null);
  const initialPhotosToShow = 4;

  // ===== 1. التحقق من حالة Wishlist =====
  useEffect(() => {
    if (product) {
      setIsWishlisted(isInWishlist(product.id));
    }
  }, [product, isInWishlist]);

  // ===== 2. حساب الصور المعروضة =====
  const displayedPhotos = showAllPhotos 
    ? customerPhotos 
    : customerPhotos.slice(0, initialPhotosToShow);

  // ===== 3. مؤقت العد التنازلي =====
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // ===== 4. تأثير اهتزاز عند الوصول للحد الأقصى =====
  useEffect(() => {
    const maxAllowed = Math.min(stock, 10);
    if (quantity >= maxAllowed) {
      const btn = document.querySelector(`.${styles.quantityBtnPlus}`);
      if (btn) {
        btn.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          btn.style.animation = '';
        }, 500);
      }
    }
  }, [quantity, stock]);

  // ===== 5. إعادة التمرير إلى أعلى الصفحة =====
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [id]);
  
  // ===== 5. تحديث وضع التثبيت لصورة المنتج =====
  useEffect(() => {
    const updateSticky = () => {
      if (!productGalleryWrapperRef.current || !productGalleryRef.current) return;

      const wrapper = productGalleryWrapperRef.current;
      const gallery = productGalleryRef.current;
      const container = wrapper.closest(`.${styles.productContainer}`);
      const topOffset = 100;
      const wrapperRect = wrapper.getBoundingClientRect();
      const galleryRect = gallery.getBoundingClientRect();
      const containerRect = container ? container.getBoundingClientRect() : wrapperRect;

      setWrapperHeight(gallery.offsetHeight);

      if (window.innerWidth < 768) {
        setStickyStyle({});
        return;
      }

      if (containerRect.top <= topOffset && containerRect.bottom >= topOffset + galleryRect.height) {
        setStickyStyle({
          position: 'fixed',
          top: `${topOffset}px`,
          left: `${wrapperRect.left}px`,
          width: `${wrapperRect.width}px`,
          zIndex: 20
        });
      } else if (containerRect.bottom <= topOffset + galleryRect.height) {
        setStickyStyle({
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          zIndex: 20
        });
      } else {
        setStickyStyle({});
      }
    };

    updateSticky();
    window.addEventListener('scroll', updateSticky, { passive: true });
    window.addEventListener('resize', updateSticky);

    return () => {
      window.removeEventListener('scroll', updateSticky);
      window.removeEventListener('resize', updateSticky);
    };
  }, [product]);
  
  // ===== 6. الحصول على بيانات المنتج =====
  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
    } else {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setProduct(products[0]);
      }
    }
  }, [id, location.state]);
  
  // ===== 7. تحديث المنتجات ذات الصلة (Related Products) =====
  useEffect(() => {
    if (product) {
      const related = products.filter(p => 
        p.category === product.category && p.id !== product.id
      ).slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product]);

 // ===== 8. جلب المنتجات المشتراة معاً (Frequently Bought Together) =====
useEffect(() => {
  if (product) {
    // 1. جلب منتجات من نفس الفئة (ما عدا المنتج الحالي)
    const sameCategory = products.filter(p => 
      p.category === product.category && 
      p.id !== product.id
    );
    
    // 2. إذا كان هناك منتجات من نفس الفئة، استخدمها
    if (sameCategory.length > 0) {
      // ترتيب عشوائي واختيار 3 منتجات
      const shuffled = [...sameCategory].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(3, shuffled.length));
      
      setFrequentlyBought(selected);
      
      // حساب أسعار الباقة
      const productPrice = parseFloat(product.price.replace('$', '')) || 0;
      const bundlePrices = selected.map(p => 
        parseFloat(p.price.replace('$', '')) || 0
      );
      const total = productPrice + bundlePrices.reduce((a, b) => a + b, 0);
      const discount = selected.length >= 2 ? total * 0.15 : 0;
      
      setBundleTotal(total - discount);
      setBundleDiscount(discount);
      setSelectedBundleItems(selected.map((_, index) => index));
    } else {
      // 3. إذا لم تكن هناك منتجات من نفس الفئة، جلب منتجات عشوائية من فئات أخرى
      const otherProducts = products.filter(p => 
        p.id !== product.id && 
        p.category !== product.category
      );
      const shuffledOthers = [...otherProducts].sort(() => 0.5 - Math.random());
      const selected = shuffledOthers.slice(0, Math.min(3, shuffledOthers.length));
      
      setFrequentlyBought(selected);
      
      // حساب أسعار الباقة
      const productPrice = parseFloat(product.price.replace('$', '')) || 0;
      const bundlePrices = selected.map(p => 
        parseFloat(p.price.replace('$', '')) || 0
      );
      const total = productPrice + bundlePrices.reduce((a, b) => a + b, 0);
      const discount = selected.length >= 2 ? total * 0.15 : 0;
      
      setBundleTotal(total - discount);
      setBundleDiscount(discount);
      setSelectedBundleItems(selected.map((_, index) => index));
    }
  }
}, [product]);

  // ===== دوال المعالجة =====
  const handleQuantityChange = (type) => {
    const maxAllowed = Math.min(stock, 10);
    
    if (type === 'increment' && quantity < maxAllowed) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      
      if (newQuantity >= maxAllowed - 2) {
        showToast(`Only ${maxAllowed - newQuantity} more available!`, { 
          type: 'warning'
        });
      }
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSuggestedQuantity = (num) => {
    const maxAllowed = Math.min(stock, 10);
    setQuantity(Math.min(num, maxAllowed));
  };

  const handleBundleToggle = (index) => {
    setSelectedBundleItems(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleAddBundleToCart = () => {
    if (selectedBundleItems.length === 0) {
      showToast('Please select at least one item', { type: 'warning' });
      return;
    }

    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.img,
      quantity: quantity,
      color: selectedColor.name,
      size: selectedSize.name
    });

    selectedBundleItems.forEach(index => {
      const item = frequentlyBought[index];
      if (item) {
        addToCart({
          id: item.id,
          name: item.title,
          price: item.price,
          image: item.img,
          quantity: 1
        });
      }
    });

    showToast(
      `${selectedBundleItems.length + 1} items added to cart! ` + 
      (bundleDiscount > 0 ? `You saved $${bundleDiscount.toFixed(2)}!` : ''),
      { type: 'success', duration: 3000 }
    );
  };

  // ===== دالة إضافة/إزالة من المفضلة =====
  const handleWishlist = () => {
    if (!product) return;
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
      showToast('Removed from wishlist 💔', { type: 'info' });
    } else {
      addToWishlist({
        id: product.id,
        name: product.title,
        title: product.title,
        price: product.price,
        image: product.img,
        img: product.img,
        rating: product.rating || 4,
        inStock: product.inStock !== false,
        category: product.category,
        brand: product.brand
      });
      setIsWishlisted(true);
      showToast('Added to wishlist! ❤️', { type: 'success' });
    }
  };

  // ===== دالة إضافة إلى السلة =====
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.img,
      quantity: quantity,
      color: selectedColor.name,
      size: selectedSize.name
    });
    
    showToast('Product added to cart successfully!', { type: 'success' });
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title} on our store!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', { type: 'info' });
    }
  };
  
  const handleImageZoom = () => {
    showToast('Image zoom feature coming soon!', { type: 'info' });
  };
  
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      if (index < Math.floor(rating)) {
        return <FaStar key={index} className={styles.starFilled} />;
      } else {
        return <FaRegStar key={index} className={styles.starEmpty} />;
      }
    });
  };
  
  // ===== إنشاء مصفوفة صور للمنتج =====
  const getProductImages = () => {
    if (product) {
      const baseImages = [
        product.img,
        product.img.replace('.png', '_alt1.png'),
        product.img.replace('.png', '_alt2.png'),
        product.img.replace('.png', '_alt3.png')
      ].filter(Boolean);
      return baseImages.length > 0 ? baseImages : ['/images/default-product.png'];
    }
    return ['/images/default-product.png'];
  };
  
  // ===== ألوان متاحة للمنتج =====
  const colorOptions = [
    { id: 1, name: "Midnight Black", code: "#000000", icon: <FaGem /> },
    { id: 2, name: "Arctic White", code: "#FFFFFF", icon: <FaGem /> },
    { id: 3, name: "Ocean Blue", code: "#2196F3", icon: <FaGem /> },
    { id: 4, name: "Sunset Gold", code: "#FFD700", icon: <FaGem /> },
    { id: 5, name: "Lunar Silver", code: "#C0C0C0", icon: <FaGem /> },
    { id: 6, name: "Rose Pink", code: "#FF6B9D", icon: <FaGem /> },
    { id: 7, name: "Forest Green", code: "#2E8B57", icon: <FaGem /> }
  ];

  // ===== مقاسات متاحة =====
  const sizeOptions = [
    { id: 1, name: "XS", available: true, description: "Extra Small" },
    { id: 2, name: "S", available: true, description: "Small" },
    { id: 3, name: "M", available: true, description: "Medium" },
    { id: 4, name: "L", available: true, description: "Large" },
    { id: 5, name: "XL", available: true, description: "Extra Large" },
    { id: 6, name: "XXL", available: true, description: "2X Large" }
  ];
  
  if (!product) {
    return (
      <div className={styles.productPage}>
        <div className={styles.loading}>
          <p>Loading product information...</p>
        </div>
      </div>
    );
  }
  
  const productImagesArray = getProductImages();
  
  return (
    <div className={styles.productPage}>
      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbItem}>
          <FaHome /> Home
        </Link>
        <FaChevronRight className={styles.breadcrumbSeparator} />
        <Link to="/products" className={styles.breadcrumbItem}>
          <FaStore /> Shop
        </Link>
        <FaChevronRight className={styles.breadcrumbSeparator} />
        <Link to={`/products?category=${product.category}`} className={styles.breadcrumbItem}>
          <FaLayerGroup /> {product.category}
        </Link>
        <FaChevronRight className={styles.breadcrumbSeparator} />
        <span className={styles.currentPage}>{product.title}</span>
      </div>
      
      {/* Main Product Section */}
      <div className={styles.productContainer}>
        {/* Image Gallery */}
        <div
          className={styles.productGalleryWrapper}
          ref={productGalleryWrapperRef}
          style={{ height: stickyStyle.position === 'fixed' ? wrapperHeight : 'auto' }}
        >
          <div
            className={styles.productGallery}
            ref={productGalleryRef}
            style={stickyStyle}
          >
            <div className={styles.productBadges}>
            {product.discount && (
              <div className={`${styles.discountBadge} ${styles.badgeWithIcon}`}>
                <FaFire /> {product.discount} OFF
              </div>
            )}
            {product.isNew && (
              <div className={`${styles.newBadge} ${styles.badgeWithIcon}`}>
                <FaBolt /> New Arrival
              </div>
            )}
            {product.tags?.includes('bestseller') && (
              <div className={`${styles.bestsellerBadge} ${styles.badgeWithIcon}`}>
                <FaGem /> Bestseller
              </div>
            )}
          </div>
          
          <div className={styles.imageControls}>
            <button 
              className={styles.imageControlBtn}
              onClick={handleImageZoom}
              title="Zoom Image"
            >
              <FaEye />
            </button>
            <button 
              className={styles.imageControlBtn}
              onClick={handleShare}
              title="Share Product"
            >
              <FaShareAlt />
            </button>
            <button 
              className={`${styles.imageControlBtn} ${isWishlisted ? styles.active : ''}`}
              onClick={handleWishlist}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <FaHeart />
            </button>
          </div>
          
          <div 
            className={styles.mainImage}
            onMouseEnter={() => setImageHover(true)}
            onMouseLeave={() => setImageHover(false)}
          >
            <img 
              src={productImagesArray[selectedImage]} 
              alt={product.title}
              className={imageHover ? styles.imageHover : ''}
            />
            {imageHover && (
              <div className={styles.zoomHint}>
                <FaEye /> Hover to zoom
              </div>
            )}
          </div>
          
          <div className={styles.thumbnailGallery}>
            {productImagesArray.map((img, index) => (
              <div 
                key={index}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.title} view ${index + 1}`} />
                <div className={styles.thumbnailOverlay}>
                  <FaEye />
                </div>
              </div>
            ))}
          </div>
        </div>
       </div>
         
        {/* Product Information */}
        <div className={styles.productInfo}>
          <div className={styles.brand}>
            <FaGem /> {product.brand?.toUpperCase() || 'PREMIUM BRAND'}
          </div>
          
          <h3 className={styles.productTitle}>
            {product.title}
            {product.inStock ? (
              <span className={styles.stockBadge}>
                <FaWarehouse /> In Stock
              </span>
            ) : (
              <span className={styles.outOfStockBadge}>
                <FaBoxOpen /> Out of Stock
              </span>
            )}
          </h3>
          
          <div className={styles.ratingSection}>
            <div className={styles.stars}>
              {renderStars(product.rating || 4)}
            </div>
            <span className={styles.ratingCount}>
              <FaStar /> {(product.rating || 4).toFixed(1)}
            </span>
            <Link to="#reviews" className={styles.reviewsLink}>
              <FaUserCheck /> ({product.reviewCount || 0} verified reviews)
            </Link>
          </div>
          
          <div className={styles.priceSection}>
            <div className={styles.currentPrice}>
              <FaTag /> {product.price}
            </div>
            {product.originalPrice && (
              <>
                <div className={styles.originalPrice}>
                  {product.originalPrice}
                </div>
                <div className={styles.discountPercentage}>
                  <FaFire /> Save {Math.round((1 - parseInt(product.price.replace('$', '')) / parseInt(product.originalPrice.replace('$', ''))) * 100)}%
                </div>
              </>
            )}
          </div>

          {/* Countdown Timer */}
          {product.discount && (
            <div className={styles.countdownTimer}>
              <div className={styles.timerContent}>
                <FaClock className={styles.timerIcon} />
                <span className={styles.timerText}>Limited Time Offer! Ends in:</span>
                <div className={styles.timerDisplay}>
                  <div className={styles.timerUnit}>
                    <span className={styles.timerNumber}>{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className={styles.timerLabel}>HRS</span>
                  </div>
                  <span className={styles.timerColon}>:</span>
                  <div className={styles.timerUnit}>
                    <span className={styles.timerNumber}>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className={styles.timerLabel}>MIN</span>
                  </div>
                  <span className={styles.timerColon}>:</span>
                  <div className={styles.timerUnit}>
                    <span className={styles.timerNumber}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className={styles.timerLabel}>SEC</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className={styles.productDescription}>
            <p>
              <FaLeaf /> {product.description || `Experience premium quality with our ${product.category} collection. ${product.title} combines elegance with functionality for the modern lifestyle.`}
            </p>
          </div>
          
          {/* Color and Size Selection */}
          <div className={styles.variantSection}>
            <h3 className={styles.variantTitle}>
              <FaPalette /> Select Color:
              <span className={styles.selectedColorText}>{selectedColor.name}</span>
            </h3>
            <div className={styles.colorOptions}>
              {colorOptions.map(color => (
                <div
                  key={color.id}
                  className={`${styles.colorOption} ${selectedColor.id === color.id ? styles.active : ''}`}
                  style={{ backgroundColor: color.code }}
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                >
                  {selectedColor.id === color.id && (
                    <div className={styles.colorCheckmark}>
                      <FaCheck />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <h3 className={styles.variantTitle}>
              <FaRulerVertical /> Select Size:
              <span className={styles.selectedSizeText}>{selectedSize.name} ({selectedSize.description})</span>
            </h3>
            <div className={styles.sizeOptions}>
              {sizeOptions.map(size => (
                <div
                  key={size.id}
                  className={`${styles.sizeOption} ${selectedSize.id === size.id ? styles.active : ''} ${!size.available ? styles.disabled : ''}`}
                  onClick={() => size.available && setSelectedSize(size)}
                  title={`${size.name} - ${size.description}`}
                >
                  <span className={styles.sizeName}>{size.name}</span>
                  <span className={styles.sizeDescription}>{size.description}</span>
                  {selectedSize.id === size.id && (
                    <FaCheck className={styles.sizeCheckmark} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Size Guide */}
          <button 
            className={styles.sizeGuideBtn}
            onClick={() => setShowSizeGuide(true)}
          >
            <FaRulerCombined className={styles.sizeGuideIcon} /> Size Guide
          </button>

          {showSizeGuide && (
            <div className={styles.sizeGuideModal}>
              <div className={styles.sizeGuideContent}>
                <div className={styles.sizeGuideHeader}>
                  <h3><FaRulerCombined /> Size Guide</h3>
                  <button 
                    className={styles.sizeGuideClose}
                    onClick={() => setShowSizeGuide(false)}
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className={styles.sizeGuideBody}>
                  <div className={styles.sizeGuideInfo}>
                    <FaInfoCircle /><p> Measure your body to find the perfect fit</p>
                  </div>
                  <table className={styles.sizeTable}>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Chest (cm)</th>
                        <th>Waist (cm)</th>
                        <th>Hip (cm)</th>
                        <th>Fit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>XS</td><td>81-86</td><td>66-71</td><td>86-91</td><td>Slim</td></tr>
                      <tr><td>S</td><td>86-91</td><td>71-76</td><td>91-96</td><td>Slim</td></tr>
                      <tr><td>M</td><td>91-96</td><td>76-81</td><td>96-101</td><td>Regular</td></tr>
                      <tr><td>L</td><td>96-101</td><td>81-86</td><td>101-106</td><td>Regular</td></tr>
                      <tr><td>XL</td><td>101-106</td><td>86-91</td><td>106-111</td><td>Relaxed</td></tr>
                      <tr><td>XXL</td><td>106-111</td><td>91-96</td><td>111-116</td><td>Relaxed</td></tr>
                    </tbody>
                  </table>
                  <div className={styles.sizeGuideTips}>
                    <h4><FaLightbulb /> Tips:</h4>
                    <ul>
                      <li>Measure under your arms, around the fullest part of your chest</li>
                      <li>Keep the tape measure horizontal and snug, but not tight</li>
                      <li>For help, contact our customer service</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Quantity Section */}
          <div className={styles.quantitySection}>
            <div className={styles.quantityHeader}>
              <FaSortAmountUp className={styles.quantityIcon} />
              <h3 className={styles.quantityTitle}>Select Quantity</h3>
              <span className={styles.quantityHint}>
                {stock <= 5 ? (
                  <>Only <strong>{stock}</strong> left in stock!</>
                ) : (
                  <>(Max {Math.min(stock, 10)} per order)</>
                )}
              </span>
            </div>
            
            <div className={styles.quantityControlModern}>
              <button 
                className={styles.quantityBtnMinus}
                onClick={() => handleQuantityChange('decrement')}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <FaMinus />
              </button>
              
              <div className={`${styles.quantityDisplay} ${quantity >= Math.min(stock, 10) - 2 ? styles.warning : ''}`}>
                <span className={styles.quantityNumber}>{quantity}</span>
              </div>
              
              <button 
                className={styles.quantityBtnPlus}
                onClick={() => handleQuantityChange('increment')}
                disabled={quantity >= Math.min(stock, 10)}
                aria-label="Increase quantity"
              >
                <FaPlus />
              </button>
            </div>
            
            <div className={styles.quantityProgress}>
              <div 
                className={styles.quantityProgressBar}
                style={{ 
                  width: `${(quantity / Math.min(stock, 10)) * 100}%`,
                  background: stock <= 3 ? 
                    'linear-gradient(90deg, #ff6b6b, #ff5252)' : 
                    'linear-gradient(90deg, #fdb673, #ff9a3d)'
                }}
              ></div>
              
              <div className={styles.progressLabels}>
                <span className={styles.quantityCurrent}>{quantity}</span>
                <span className={styles.quantitySeparator}>/</span>
                <span className={styles.quantityMax}>{Math.min(stock, 10)}</span>
              </div>
            </div>
            
            {stock <= 10 && (
              <div className={styles.stockAlertMini}>
                <FaExclamationTriangle className={styles.alertIcon} />
                <span>
                  {stock <= 3 ? 'Selling fast!' : 
                   stock <= 7 ? 'Low stock!' : 'Limited availability'}
                </span>
              </div>
            )}
            
            <div className={styles.quantitySuggestions}>
              <span className={styles.suggestionsTitle}>Popular quantities:</span>
              <div className={styles.suggestionChips}>
                {[1, 2, 3, 5].map(num => (
                  <button
                    key={num}
                    className={`${styles.suggestionChip} ${quantity === num ? styles.active : ''}`}
                    onClick={() => handleSuggestedQuantity(num)}
                    disabled={num > Math.min(stock, 10)}
                  >
                    {num} {num === 1 ? 'item' : 'items'}
                    {num === 3 && <span className={styles.bestValue}><FaStar /> Best Value</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Calculator */}
          <div className={styles.priceCalculator}>
            <h4><FaCalculator className={styles.calcIcon} /> Order Summary</h4>
            
            <div className={styles.calcRows}>
              <div className={styles.calcRow}>
                <span className={styles.calcLabel}>Product Price:</span>
                <span className={styles.calcValue}>
                  {product.price} × {quantity}
                </span>
              </div>
              
              <div className={styles.calcRow}>
                <span className={styles.calcLabel}>Shipping:</span>
                <span className={styles.calcValue}>
                  {parseFloat(product.price.replace('$', '')) * quantity > 100 ? 
                    <span className={styles.freeShipping}><FaShippingFast /> FREE</span> : 
                    '$5.99'
                  }
                </span>
              </div>
              
              <div className={styles.calcRow}>
                <span className={styles.calcLabel}>Estimated Tax:</span>
                <span className={styles.calcValue}>$2.50</span>
              </div>
              
              <div className={styles.calcDivider}></div>
              
              <div className={`${styles.calcRow} ${styles.totalRow}`}>
                <span className={styles.totalLabel}><strong>Total Amount:</strong></span>
                <span className={styles.totalValue}>
                  <strong>
                    ${(
                      parseFloat(product.price.replace('$', '')) * quantity + 
                      (parseFloat(product.price.replace('$', '')) * quantity > 100 ? 0 : 5.99) + 
                      2.50
                    ).toFixed(2)}
                  </strong>
                </span>
              </div>
            </div>
            
            <div className={styles.calcNote}>
              <FaInfoCircle className={styles.noteIcon} />
              <span>Free shipping on orders over $100. Tax calculated at checkout.</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button 
              className={styles.addToCartBtn}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <FaShoppingCart />
              <span>
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </span>
            </button>
            
            <button 
              className={styles.buyNowBtn}
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              <FaCreditCard />
              <span>
                Buy Now
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Purchase Features */}
      <div className={styles.purchaseFeatures}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresTitle}>
            <FaGem className={styles.featuresTitleIcon} />
            Why Shop With Us?
            <FaGem className={styles.featuresTitleIcon} />
          </h2>
          <p className={styles.featuresSubtitle}>
            Experience premium shopping with our exclusive benefits and guarantees
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <FaShippingFast />
          </div>
          <div className={styles.featureContent}>
            <h4 className={styles.featureTitle}>Free & Fast Shipping</h4>
            <p className={styles.featureDescription}>
              Free shipping on all orders over $100. Express delivery available.
            </p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <FaUndo />
          </div>
          <div className={styles.featureContent}>
            <h4 className={styles.featureTitle}>30-Day Returns</h4>
            <p className={styles.featureDescription}>
              Full refund within 30 days. No questions asked return policy.
            </p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <FaShieldAlt />
          </div>
          <div className={styles.featureContent}>
            <h4 className={styles.featureTitle}>Secure Payment</h4>
            <p className={styles.featureDescription}>
              256-bit SSL encryption. Your payment information is always protected.
            </p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <FaUserCheck />
          </div>
          <div className={styles.featureContent}>
            <h4 className={styles.featureTitle}>24/7 Support</h4>
            <p className={styles.featureDescription}>
              Dedicated customer support team available around the clock.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together */}
      {frequentlyBought.length > 0 && (
        <div className={styles.frequentlyBought}>
          <div className={styles.fbtHeader}>
            <h2 className={styles.fbtTitle}>
              <FaShoppingCart className={styles.fbtTitleIcon} />
              Frequently Bought Together
              <FaShoppingCart className={styles.fbtTitleIcon} />
            </h2>
            <p className={styles.fbtSubtitle}>
              {frequentlyBought.length === 3 
                ? "Complete your experience with these popular additions"
                : "Customers often buy these items together"}
            </p>
          </div>
          
          <div className={styles.fbtContainer}>
            <div className={styles.fbtMainProduct}>
              <div className={styles.fbtProductCard}>
                <div className={styles.fbtProductImage}>
                  <img src={product.img} alt={product.title} />
                  <div className={styles.fbtProductCheck}>
                    <FaCheck />
                  </div>
                </div>
                <div className={styles.fbtProductInfo}>
                  <h4 className={styles.fbtProductName}>{product.title}</h4>
                  <div className={styles.fbtProductPrice}>
                    <FaTag /> {product.price}
                  </div>
                  <div className={styles.fbtProductRating}>
                    {renderStars(product.rating || 4)}
                    <span>({product.reviewCount || 0})</span>
                  </div>
                </div>
              </div>
              <div className={styles.fbtPlusSign}>
                <FaPlus />
              </div>
            </div>
            
            <div className={styles.fbtBundleProducts0}>
              <div className={styles.fbtBundleProducts}>
                {frequentlyBought.map((item, index) => (
                  <div key={item.id} className={styles.fbtBundleItem}>
                    <div className={styles.fbtBundleCheckbox}>
                      <input 
                        type="checkbox" 
                        id={`bundle-${item.id}`}
                        checked={selectedBundleItems.includes(index)}
                        onChange={() => handleBundleToggle(index)}
                        className={styles.fbtCheckbox}
                      />
                      <label 
                        htmlFor={`bundle-${item.id}`} 
                        className={styles.fbtCheckboxLabel}
                      >
                        <FaCheck className={styles.checkIcon} />
                      </label>
                    </div>
                    
                    <div className={styles.fbtBundleCard}>
                      <div className={styles.fbtBundleImage}>
                        <img src={item.img} alt={item.title} />
                        {item.isNew && (
                          <div className={styles.fbtBundleBadge} style={{background: '#fdb673'}}>
                            <FaBolt /> New
                          </div>
                        )}
                        {item.discount && (
                          <div className={styles.fbtBundleBadge} style={{background: '#ff6b6b'}}>
                            <FaFire /> {item.discount}
                          </div>
                        )}
                        {item.tags?.includes('bestseller') && (
                          <div className={styles.fbtBundleBadge} style={{background: '#9b59b6'}}>
                            <FaGem /> Best
                          </div>
                        )}
                      </div>
                      
                      <div className={styles.fbtBundleInfo}>
                        <h4 className={styles.fbtBundleName}>{item.title}</h4>
                        <div className={styles.fbtBundlePrice}>
                          <FaTag /> {item.price}
                          {item.originalPrice && (
                            <span className={styles.fbtOriginalPrice}>
                              {item.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className={styles.fbtBundleRating}>
                          {renderStars(item.rating || 4)}
                          <span className={styles.fbtRatingCount}>
                            ({item.reviewCount || 0})
                          </span>
                        </div>
                        <div className={styles.fbtCategory}>
                          <FaTag className={styles.fbtCategoryIcon} />
                          {item.category}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.fbtEqualsSign}>
                <FaEquals />
              </div>
            </div>
            
            <div className={styles.fbtTotalSection}>
              <div className={styles.fbtTotalBox}>
                <div className={styles.fbtTotalHeader}>
                  <h4 className={styles.fbtTotalTitle}>
                    <FaShoppingCart /> Bundle Total
                  </h4>
                  {selectedBundleItems.length > 0 && (
                    <div className={styles.fbtSavings}>
                      <FaFire /> 
                      {selectedBundleItems.length === frequentlyBought.length 
                        ? 'Save 15%' 
                        : selectedBundleItems.length > 1 
                          ? 'Save 10%' 
                          : 'Add more to save'}
                    </div>
                  )}
                </div>
                
                <div className={styles.fbtPriceBreakdown}>
                  <div className={styles.fbtPriceRow}>
                    <span>{product.title}:</span>
                    <span>{product.price}</span>
                  </div>
                  
                  {frequentlyBought.map((item, index) => {
                    if (selectedBundleItems.includes(index)) {
                      return (
                        <div key={item.id} className={styles.fbtPriceRow}>
                          <span>{item.title}:</span>
                          <span>{item.price}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                  
                  {bundleDiscount > 0 && (
                    <>
                      <div className={styles.fbtPriceDivider}></div>
                      <div className={styles.fbtPriceRow}>
                        <span>Bundle Discount:</span>
                        <span className={styles.fbtDiscount}>
                          -${bundleDiscount.toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                  
                  <div className={`${styles.fbtPriceRow} ${styles.fbtFinalRow}`}>
                    <span className={styles.fbtTotalLabel}>Total:</span>
                    <span className={styles.fbtTotalPrice}>
                      ${bundleTotal.toFixed(2)}
                    </span>
                  </div>
                  
                  {selectedBundleItems.length > 1 && (
                    <div className={styles.fbtPriceRow}>
                      <span className={styles.fbtPerItem}>
                        ~${(bundleTotal / (selectedBundleItems.length + 1)).toFixed(2)} per item
                      </span>
                    </div>
                  )}
                </div>
                
                <button 
                  className={styles.fbtAddAllButton}
                  onClick={handleAddBundleToCart}
                  disabled={selectedBundleItems.length === 0}
                >
                  <FaShoppingCart /> 
                  {selectedBundleItems.length === 0 
                    ? 'Select Items to Add' 
                    : `Add ${selectedBundleItems.length + 1} Items to Cart`}
                </button>
                
                <div className={styles.fbtBenefits}>
                  <div className={styles.fbtBenefit}>
                    <FaShippingFast className={styles.fbtBenefitIcon} />
                    <span>Free Shipping</span>
                  </div>
                  <div className={styles.fbtBenefit}>
                    <FaShieldAlt className={styles.fbtBenefitIcon} />
                    <span>Warranty Included</span>
                  </div>
                  <div className={styles.fbtBenefit}>
                    <FaBox className={styles.fbtBenefitIcon} />
                    <span>Shipped Together</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.fbtFooter}>
            <p className={styles.fbtFooterText}>
              <FaInfoCircle className={styles.fbtFooterIcon} />
              <strong>Bundle Benefits:</strong> 
              {selectedBundleItems.length > 1 
                ? ` You're saving $${bundleDiscount.toFixed(2)}! Items ship together for faster delivery.`
                : ' Add 2 or more items to unlock bundle savings and free shipping.'}
            </p>
          </div>
        </div>
      )}
      
      {/* Information Tabs */}
      <div className={styles.productTabs}>
        <div className={styles.tabHeaders}>
          <div 
            className={`${styles.tabHeader} ${activeTab === 'description' ? styles.active : ''}`}
            onClick={() => setActiveTab('description')}
          >
            <FaGem /> Description
          </div>
          <div 
            className={`${styles.tabHeader} ${activeTab === 'specifications' ? styles.active : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            <FaTachometerAlt /> Specifications
          </div>
          <div 
            className={`${styles.tabHeader} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <FaUserCheck /> Reviews ({product.reviewCount || 0})
          </div>
          <div 
            className={`${styles.tabHeader} ${activeTab === 'shipping' ? styles.active : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            <FaShippingFast /> Shipping & Returns
          </div>
          <div 
            className={`${styles.tabHeader} ${activeTab === 'qa' ? styles.active : ''}`}
            onClick={() => setActiveTab('qa')}
          >
            <FaQuestionCircle /> Q&A ({product.qaCount || 5})
          </div>
        </div>
        
        <div className={styles.tabContent}>
          {activeTab === 'description' && (
            <>
              <h3><FaGem /> Product Details</h3>
              <p>{product.description || `This premium ${product.category} product from ${product.brand || 'our collection'} is designed with attention to detail and crafted using the finest materials.`}</p>
              
              <h3><FaBolt /> Key Features</h3>
              <ul className={styles.featuresList}>
                <li><FaCheck /> Premium quality materials and construction</li>
                <li><FaCheck /> Innovative design with modern aesthetics</li>
                <li><FaCheck /> Excellent value with competitive pricing</li>
                <li><FaCheck /> Trusted brand with proven reliability</li>
                <li><FaCheck /> Suitable for everyday use and special occasions</li>
                <li><FaCheck /> Available in multiple color and size options</li>
              </ul>
            </>
          )}
          
          {activeTab === 'specifications' && (
            <>
              <h3><FaTachometerAlt /> Technical Specifications</h3>
              <div className={styles.specsGrid}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Category:</span>
                  <span className={styles.specValue}>{product.category}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Brand:</span>
                  <span className={styles.specValue}>{product.brand || 'Not specified'}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>SKU:</span>
                  <span className={styles.specValue}>PROD-{String(product.id).padStart(4, '0')}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Availability:</span>
                  <span className={`${styles.specValue} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Weight:</span>
                  <span className={styles.specValue}>Approx. 1.5 kg</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Dimensions:</span>
                  <span className={styles.specValue}>15 x 10 x 5 cm</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Material:</span>
                  <span className={styles.specValue}>Premium materials</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Warranty:</span>
                  <span className={styles.specValue}>2 Years</span>
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'reviews' && (
            <>
              <h3><FaUserCheck /> Customer Reviews</h3>
              <div className={styles.ratingSummary}>
                <div className={styles.averageRating}>
                  <span className={styles.ratingNumber}>{(product.rating || 4).toFixed(1)}</span>
                  <div className={styles.ratingStars}>
                    {renderStars(product.rating || 4)}
                  </div>
                  <p>Based on {product.reviewCount || 0} verified reviews</p>
                </div>
              </div>
              
              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerStars}>
                      {renderStars(5)}
                    </div>
                    <span className={styles.reviewerName}>Alex Johnson</span>
                    <span className={styles.verifiedBadge}>
                      <FaUserCheck /> Verified Purchase
                    </span>
                  </div>
                  <span className={styles.reviewDate}>2 weeks ago</span>
                </div>
                <p className={styles.reviewText}>
                  "Absolutely love this product! The quality exceeded my expectations and it arrived earlier than expected. Will definitely purchase again!"
                </p>
              </div>
            </>
          )}
          
          {activeTab === 'shipping' && (
            <>
              <h3><FaShippingFast /> Shipping Information</h3>
              <ul className={styles.shippingList}>
                <li><FaTruck /> Free shipping on all orders over $100</li>
                <li><FaShippingFast /> Express shipping available (1-2 business days)</li>
                <li><FaWarehouse /> Multiple pickup points in major cities</li>
                <li><FaExchangeAlt /> Real-time tracking for all orders</li>
              </ul>
              
              <h3><FaUndo /> Returns & Exchanges</h3>
              <ul className={styles.returnsList}>
                <li><FaUndo /> 30-day free returns policy from delivery date</li>
                <li><FaExchangeAlt /> Full refund or exchange available</li>
                <li><FaShieldAlt /> No questions asked return policy</li>
                <li><FaSyncAlt /> Easy return process through our portal</li>
              </ul>
            </>
          )}
          
          {activeTab === 'qa' && (
            <div className={styles.qaSection}>
              <h3><FaQuestionCircle /> Frequently Asked Questions</h3>
              
              <div className={styles.qaList}>
                <div className={styles.qaItem}>
                  <div className={styles.question}>
                    <FaQuestion className={styles.questionIcon} />
                    <div className={styles.questionContent}>
                      <strong>What is the return policy for this item?</strong>
                      <span className={styles.questionMeta}>Asked by Sarah • 2 days ago</span>
                    </div>
                  </div>
                  <div className={styles.answer}>
                    <FaCheckCircle className={styles.answerIcon} />
                    <div className={styles.answerContent}>
                      <p>We offer a 30-day return policy for unused items in original packaging with tags attached. Free returns for all orders over $100.</p>
                      <span className={styles.answerMeta}>Answered by Customer Support</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.qaItem}>
                  <div className={styles.question}>
                    <FaQuestion className={styles.questionIcon} />
                    <div className={styles.questionContent}>
                      <strong>How long does shipping take?</strong>
                      <span className={styles.questionMeta}>Asked by Michael • 1 week ago</span>
                    </div>
                  </div>
                  <div className={styles.answer}>
                    <FaCheckCircle className={styles.answerIcon} />
                    <div className={styles.answerContent}>
                      <p>Standard shipping: 3-5 business days. Express shipping: 1-2 business days (additional fee applies). International shipping: 7-14 days.</p>
                      <span className={styles.answerMeta}>Answered by Shipping Department</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.qaItem}>
                  <div className={styles.question}>
                    <FaQuestion className={styles.questionIcon} />
                    <div className={styles.questionContent}>
                      <strong>Is this product machine washable?</strong>
                      <span className={styles.questionMeta}>Asked by Jessica • 3 days ago</span>
                    </div>
                  </div>
                  <div className={styles.answer}>
                    <FaCheckCircle className={styles.answerIcon} />
                    <div className={styles.answerContent}>
                      <p>Yes, this product is machine washable. We recommend cold water, gentle cycle, and hang drying for best results.</p>
                      <span className={styles.answerMeta}>Answered by Product Specialist</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.qaForm}>
                <h4><FaPaperPlane /> Ask a Question</h4>
                <p>Can't find what you're looking for? Ask us directly!</p>
                <textarea 
                  className={styles.qaTextarea}
                  placeholder="Type your question here..."
                  rows="4"
                />
                <div className={styles.qaFormActions}>
                  <button className={styles.askButton}>
                    <FaPaperPlane /> Submit Question
                  </button>
                  <span className={styles.qaNote}>
                    <FaInfoCircle /> We'll respond within 24 hours
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Real Customer Photos Section */}
      {customerPhotos.length > 0 && (
        <div className={styles.customerPhotosSection}>
          <div className={styles.customerPhotosHeader}>
            <h2 className={styles.customerPhotosTitle}>
              <FaUsers className={styles.photosTitleIcon} />
              Real Customer Photos ({customerPhotos.length}+)
              <FaUsers className={styles.photosTitleIcon} />
            </h2>
            <p className={styles.customerPhotosSubtitle}>
              See how {customerPhotos.length}+ customers are using {product.title} in real life
            </p>
            <div className={styles.photosStats}>
              <div className={styles.statItem}>
                <FaCamera className={styles.statIcon} />
                <span className={styles.statNumber}>{customerPhotos.length}+</span>
                <span className={styles.statLabel}>Photos</span>
              </div>
              <div className={styles.statItem}>
                <FaStar className={styles.statIcon} />
                <span className={styles.statNumber}>4.8</span>
                <span className={styles.statLabel}>Avg Rating</span>
              </div>
              <div className={styles.statItem}>
                <FaHeart className={styles.statIcon} />
                <span className={styles.statNumber}>{customerPhotos.reduce((sum, photo) => sum + photo.likes, 0)}+</span>
                <span className={styles.statLabel}>Total Likes</span>
              </div>
            </div>
          </div>

          <div className={styles.customerPhotosGrid}>
            {displayedPhotos.map((photo, index) => (
              <div 
                key={photo.id} 
                className={styles.customerPhotoCard}
                onClick={() => {
                  const actualIndex = customerPhotos.findIndex(p => p.id === photo.id);
                  setSelectedCustomerPhoto(actualIndex);
                  setShowPhotoModal(true);
                }}
              >
                <div className={styles.photoContainer}>
                  <img 
                    src={photo.url} 
                    alt={photo.alt}
                    className={styles.customerPhoto}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop';
                      e.target.alt = 'Customer photo';
                    }}
                  />
                  <div className={styles.photoOverlay}>
                    <div className={styles.overlayContent}>
                      <FaEye className={styles.overlayIcon} />
                      <span>Click to view</span>
                    </div>
                  </div>
                  <div className={styles.photoBadge}>
                    <FaCamera />
                    <span className={styles.photoNumber}>{index + 1}</span>
                  </div>
                </div>
                
                <div className={styles.photoInfo}>
                  <div className={styles.customerInfo}>
                    <div className={styles.customerAvatar}>
                      {photo.customerName.charAt(0)}
                    </div>
                    <div className={styles.customerDetails}>
                      <h4 className={styles.customerName}>{photo.customerName}</h4>
                      <div className={styles.customerRating}>
                        {renderStars(photo.rating)}
                        <span className={styles.ratingText}>{photo.rating}/5</span>
                      </div>
                    </div>
                    <div className={styles.photoLikes}>
                      <FaHeart className={styles.likeIcon} />
                      <span>{photo.likes}</span>
                    </div>
                  </div>
                  
                  <p className={styles.photoComment}>"{photo.comment}"</p>
                  
                  <div className={styles.photoMeta}>
                    <div className={styles.metaItem}>
                      <FaCalendarAlt className={styles.metaIcon} />
                      <span>{photo.date}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FaMapMarkerAlt className={styles.metaIcon} />
                      <span>{photo.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* زر إظهار/إخفاء المزيد من الصور */}
          <div className={styles.showMoreContainer}>
            <button 
              className={styles.showMoreButton}
              onClick={() => setShowAllPhotos(!showAllPhotos)}
            >
              {showAllPhotos ? (
                <>
                  <FaChevronUp className={styles.showMoreIcon} />
                  <span className={styles.buttonText}>
                    Show Less Photos
                    <span className={styles.buttonSubtext}>(Currently showing all {customerPhotos.length})</span>
                  </span>
                </>
              ) : (
                <>
                  <FaChevronDown className={styles.showMoreIcon} />
                  <span className={styles.buttonText}>
                    Show All {customerPhotos.length} Photos
                    <span className={styles.buttonSubtext}>(Currently showing {displayedPhotos.length} of {customerPhotos.length})</span>
                  </span>
                </>
              )}
            </button>
          </div>

          <div className={styles.uploadPhotoCTA}>
            <div className={styles.uploadContent}>
              <FaCamera className={styles.uploadIcon} />
              <div className={styles.uploadText}>
                <h3>Share Your Photo!</h3>
                <p>Join {customerPhotos.length}+ customers who shared their experience</p>
              </div>
            </div>
            <button className={styles.uploadButton}>
              <FaUpload className={styles.uploadBtnIcon} />
              Upload Your Photo
            </button>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {showPhotoModal && customerPhotos[selectedCustomerPhoto] && (
        <div className={styles.photoModal} onClick={() => setShowPhotoModal(false)}>
          <div className={styles.photoModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>
                <FaCamera /> Customer Photo
              </h3>
              <button 
                className={styles.modalClose}
                onClick={() => setShowPhotoModal(false)}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.modalPhotoContainer}>
                <img 
                  src={customerPhotos[selectedCustomerPhoto].url} 
                  alt={customerPhotos[selectedCustomerPhoto].alt}
                  className={styles.modalPhoto}
                />
                <div className={styles.photoNavigation}>
                  <button 
                    className={styles.navButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCustomerPhoto(prev => 
                        prev > 0 ? prev - 1 : customerPhotos.length - 1
                      );
                    }}
                    aria-label="Previous photo"
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    className={styles.navButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCustomerPhoto(prev => 
                        prev < customerPhotos.length - 1 ? prev + 1 : 0
                      );
                    }}
                    aria-label="Next photo"
                  >
                    <FaChevronRight />
                  </button>
                </div>
                <div className={styles.photoCounter}>
                  {selectedCustomerPhoto + 1} / {customerPhotos.length}
                </div>
              </div>
              
              <div className={styles.modalInfo}>
                <div className={styles.modalCustomerInfo}>
                  <div className={styles.modalAvatar}>
                    {customerPhotos[selectedCustomerPhoto].customerName.charAt(0)}
                  </div>
                  <div className={styles.modalCustomerDetails}>
                    <h4>{customerPhotos[selectedCustomerPhoto].customerName}</h4>
                    <div className={styles.modalRating}>
                      {renderStars(customerPhotos[selectedCustomerPhoto].rating)}
                      <span className={styles.verifiedBadge}>
                        <FaCheckCircle /> Verified Purchase
                      </span>
                    </div>
                  </div>
                  <div className={styles.modalActions}>
                    <button className={styles.likeButton}>
                      <FaHeart />
                      <span>{customerPhotos[selectedCustomerPhoto].likes}</span>
                    </button>
                    <button className={styles.shareButton}>
                      <FaShareAlt />
                    </button>
                  </div>
                </div>
                
                <p className={styles.modalComment}>
                  "{customerPhotos[selectedCustomerPhoto].comment}"
                </p>
                
                <div className={styles.modalMeta}>
                  <div className={styles.modalMetaItem}>
                    <FaCalendarAlt />
                    <span>{customerPhotos[selectedCustomerPhoto].date}</span>
                  </div>
                  <div className={styles.modalMetaItem}>
                    <FaMapMarkerAlt />
                    <span>{customerPhotos[selectedCustomerPhoto].location}</span>
                  </div>
                  <div className={styles.modalMetaItem}>
                    <FaHashtag />
                    <span>#{product.category.toLowerCase().replace(/\s+/g, '')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className={styles.relatedProducts}>
          <h2 className={styles.sectionTitle}>
            <FaGem /> You Might Also Like
          </h2>
          <p className={styles.sectionSubtitle}>Discover more products from the {product.category} category</p>
          
          <div className={styles.productsGrid}>
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
          
          <div className={styles.viewAllContainer}>
            <Link to={`/products?category=${product.category}`} className={styles.viewAllBtn}>
              View All {product.category} Products <FaChevronRight />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;