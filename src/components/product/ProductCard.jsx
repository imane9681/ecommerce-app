import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import QuickViewModal from './QuickViewModal';
import SearchModal from './SearchModal';
import { FaStar, FaRegStar, FaHeart, FaSearch, FaShoppingCart, FaEye } from 'react-icons/fa';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, fullWidth = false, imageFit = 'contain' }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { showToast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [rating] = useState(product.rating || 4);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.img,
      quantity: 1
    });
    showToast('Product added to cart successfully!', { type: 'success' });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
      showToast('Removed from wishlist', { type: 'info' });
    } else {
      addToWishlist(product);
      setIsWishlisted(true);
      showToast('Added to wishlist!', { type: 'success' });
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSearch(true);
  };

  const renderStars = () => {
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

  // معالجة خطأ تحميل الصورة
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div className={`${styles.productItem} ${fullWidth ? styles.fullWidth : ''}`}>
        <div className={styles.overlay}>
          <Link 
            to={{
              pathname: `/product/${product.id}`,
              state: { product }
            }} 
            className={styles.productThumb}
          >
            <img 
              src={imageError ? '/images/placeholder.png' : product.img} 
              alt={product.title} 
              loading="lazy"
              onError={handleImageError}
              className={imageFit === 'cover' ? styles.cover : ''}
            />
          </Link>
          {product.discount && (
            <span className={styles.discount}>{product.discount}</span>
          )}
          {product.isNew && <span className={styles.newBadge}>New</span>}
        </div>

        <div className={styles.productInfo}>
          <span className={styles.category}>
            {product.category && product.category.toUpperCase()}
          </span>
          
          <Link 
            to={{
              pathname: `/product/${product.id}`,
              state: { product }
            }}
            className={styles.productTitle}
          >
            {product.title}
          </Link>
          
          <div className={styles.rating}>
            {renderStars()}
            <span className={styles.ratingCount}>({product.reviewCount || 24})</span>
          </div>
          
          <div className={styles.priceSection}>
            <h4 className={styles.price}>{product.price}</h4>
            {product.originalPrice && (
              <span className={styles.originalPrice}>{product.originalPrice}</span>
            )}
          </div>
        </div>

        <ul className={styles.icons}>
          <li 
            onClick={handleWishlist}
            className={isWishlisted ? styles.active : ''}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FaHeart />
          </li>
          <li 
            onClick={handleQuickView}
            title="Quick view"
          >
            <FaEye />
          </li>
          <li 
            onClick={handleSearch}
            title="Search similar products"
          >
            <FaSearch />
          </li>
          <li 
            onClick={handleAddToCart}
            title="Add to cart"
          >
            <FaShoppingCart />
          </li>
        </ul>
      </div>

      {showQuickView && (
        <QuickViewModal 
          product={product} 
          onClose={() => setShowQuickView(false)} 
        />
      )}

      {showSearch && (
        <SearchModal 
          product={product} 
          onClose={() => setShowSearch(false)} 
        />
      )}
    </>
  );
};

export default ProductCard;