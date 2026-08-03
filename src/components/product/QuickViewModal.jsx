import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { 
  FaTimes, 
  FaStar, 
  FaRegStar, 
  FaShoppingCart, 
  FaHeart,
  FaMinus,
  FaPlus,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaTag,
  FaEye
} from 'react-icons/fa';
import styles from './QuickViewModal.module.css';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // التحقق من حالة wishlist عند تحميل المنتج
  useEffect(() => {
    if (product) {
      setIsWishlisted(isInWishlist(product.id));
    }
  }, [product, isInWishlist]);

  // إيقاف التمرير عند فتح المودال
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // إغلاق المودال عند الضغط على ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.img,
      quantity: quantity
    });
    showToast('Product added to cart successfully!', { type: 'success' });
    onClose();
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
      showToast('Removed from wishlist', { type: 'info' });
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
      showToast('Added to wishlist!', { type: 'success' });
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      if (index < Math.floor(rating)) {
        return <FaStar key={index} className={styles.starFilled} />;
      } else if (index < rating) {
        return <FaStar key={index} className={styles.starHalf} />;
      } else {
        return <FaRegStar key={index} className={styles.starEmpty} />;
      }
    });
  };

  // صور المنتج (مع صور افتراضية)
  const productImages = [
    product.img,
    product.img?.replace('.png', '_alt1.png') || product.img,
    product.img?.replace('.png', '_alt2.png') || product.img,
  ].filter(Boolean);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>

        <div className={styles.modalBody}>
          {/* Image Section */}
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <img src={productImages[selectedImage]} alt={product.title} />
            </div>
            <div className={styles.thumbnailList}>
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.title} view ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className={styles.infoSection}>
            <div className={styles.category}>
              {product.category?.toUpperCase() || 'PRODUCT'}
            </div>
            
            <h2 className={styles.title}>{product.title}</h2>
            
            <div className={styles.rating}>
              {renderStars(product.rating || 4)}
              <span className={styles.ratingCount}>({product.reviewCount || 24} reviews)</span>
            </div>

            <div className={styles.price}>
              {product.price}
              {product.originalPrice && (
                <span className={styles.originalPrice}>{product.originalPrice}</span>
              )}
            </div>

            <p className={styles.description}>
              {product.description || `Experience premium quality with our ${product.category || 'product'} collection. ${product.title} combines elegance with functionality.`}
            </p>

            {product.discount && (
              <div className={styles.discountBadge}>
                <FaTag />
                <span>{product.discount} OFF</span>
              </div>
            )}

            {/* Quantity Selector */}
            <div className={styles.quantitySection}>
              <span className={styles.quantityLabel}>Quantity:</span>
              <div className={styles.quantityControl}>
                <button 
                  className={styles.qtyBtn}
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity <= 1}
                >
                  <FaMinus />
                </button>
                <span className={styles.quantityNumber}>{quantity}</span>
                <button 
                  className={styles.qtyBtn}
                  onClick={() => handleQuantityChange('increment')}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                <FaShoppingCart />
                Add to Cart
              </button>
              <button 
                className={`${styles.wishlistBtn} ${isWishlisted ? styles.active : ''}`}
                onClick={handleWishlist}
              >
                <FaHeart />
              </button>
            </div>

            {/* Features */}
            <div className={styles.features}>
              <div className={styles.feature}>
                <FaTruck />
                <span>Free Shipping</span>
              </div>
              <div className={styles.feature}>
                <FaShieldAlt />
                <span>Secure Payment</span>
              </div>
              <div className={styles.feature}>
                <FaUndo />
                <span>30-Day Returns</span>
              </div>
            </div>

            {/* View Full Details */}
            <Link 
              to={`/product/${product.id}`} 
              className={styles.viewDetails}
              onClick={onClose}
            >
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;