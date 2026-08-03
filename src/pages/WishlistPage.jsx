import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash, FaEye } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import styles from './WishlistPage.module.css';

const WishlistPage = () => {
  const { wishlist, addToCart, removeFromWishlist, clearWishlist } = useCart();
  const { showToast } = useToast();

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
    showToast('Removed from wishlist', { type: 'info' });
  };

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
    showToast('Added to cart successfully!', { type: 'success' });
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    });
    showToast(`${wishlist.length} items moved to cart!`, { type: 'success' });
  };

  const handleClearAll = () => {
    clearWishlist();
    showToast('Wishlist cleared', { type: 'info' });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span 
        key={index} 
        className={index < Math.floor(rating) ? styles.starFilled : styles.starEmpty}
      >
        ★
      </span>
    ));
  };

  if (wishlist.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <FaHeart />
            </div>
            <h2>Your Wishlist is Empty</h2>
            <p>Start adding your favorite items to your wishlist!</p>
            <Link to="/products" className={styles.shopBtn}>
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              <FaHeart className={styles.titleIcon} />
              My Wishlist
            </h1>
            <p className={styles.subtitle}>
              {wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved
            </p>
          </div>
          <div className={styles.headerActions}>
            <button 
              className={styles.moveAllBtn}
              onClick={handleMoveAllToCart}
              disabled={wishlist.length === 0}
            >
              <FaShoppingCart />
              Move All to Cart
            </button>
            <button 
              className={styles.clearBtn}
              onClick={handleClearAll}
              disabled={wishlist.length === 0}
            >
              <FaTrash />
              Clear All
            </button>
          </div>
        </div>

        <div className={styles.wishlistGrid}>
          {wishlist.map((item) => (
            <div key={item.id} className={styles.wishlistCard}>
              <div className={styles.cardImage}>
                <img 
                  src={item.image || 'https://via.placeholder.com/300x300?text=Product'} 
                  alt={item.name} 
                />
                {item.inStock ? (
                  <span className={styles.stockBadge}>In Stock</span>
                ) : (
                  <span className={styles.outOfStockBadge}>Out of Stock</span>
                )}
              </div>
              
              <div className={styles.cardContent}>
                <h3 className={styles.productName}>{item.name}</h3>
                <div className={styles.rating}>
                  {renderStars(item.rating || 4)}
                  <span className={styles.ratingCount}>({item.rating || 4})</span>
                </div>
                <div className={styles.priceSection}>
                  <span className={styles.price}>{item.price}</span>
                </div>
                
                <div className={styles.cardActions}>
                  <Link 
                    to={`/product/${item.id}`} 
                    className={styles.viewBtn}
                  >
                    <FaEye />
                    View
                  </Link>
                  <button 
                    className={styles.addToCartBtn}
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                  >
                    <FaShoppingCart />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button 
                    className={styles.removeBtn}
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    aria-label="Remove from wishlist"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;