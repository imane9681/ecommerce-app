import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './CartPage.module.css';
import MembershipBanner from '../components/home/MembershipBanner';
import { 
  FiTrash2, 
  FiChevronLeft, 
  FiShoppingBag, 
  FiPlus, 
  FiMinus,
  FiCreditCard,
  FiSmartphone,
  FiShield,
  FiCheck,
  FiArrowRight
} from 'react-icons/fi';
import { 
  FaShoppingCart, 
  FaTruck, 
  FaShippingFast,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaGooglePay,
  FaApplePay
} from 'react-icons/fa';
import { SiSamsungpay } from 'react-icons/si';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
  const [isClearing, setIsClearing] = useState(false);
  const [visibleItems, setVisibleItems] = useState({});
  const itemsSectionRef = useRef(null);
  const itemsRef = useRef([]);
  
  useEffect(() => {
    // Initialize visibility for all items
    const initialVisibility = {};
    cart.forEach((item, index) => {
      initialVisibility[item.id] = false;
    });
    setVisibleItems(initialVisibility);
    
    // Set up intersection observer for lazy loading animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const itemId = entry.target.dataset.itemId;
            if (itemId) {
              setVisibleItems(prev => ({
                ...prev,
                [itemId]: true
              }));
            }
          }
        });
      },
      {
        root: itemsSectionRef.current,
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Observe all item cards
    itemsRef.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemsRef.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [cart]);

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 300);
  };

  const changeQty = (id, nextQty) => {
    const qty = Math.max(1, Number(nextQty) || 1);
    updateQuantity(id, qty);
  };

  const calculateSubtotal = (price, quantity) => {
    const priceNumber = parseFloat(String(price).replace(/[^\d.-]/g, '')) || 0;
    return `$${(priceNumber * quantity).toFixed(2)}`;
  };

  // Handle smooth scroll to top
  const scrollToTop = () => {
    if (itemsSectionRef.current) {
      itemsSectionRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  if (!cart || getCartCount() === 0) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <FiShoppingBag />
            </div>
            <div className={styles.emptyTitle}>Your cart feels lonely</div>
            <p className={styles.emptyText}>Your shopping cart is empty. Start adding your favorite items!</p>
            <Link to="/products" className={styles.shopBtn}>
              <FiChevronLeft className={styles.btnIcon} />
              Start Shopping
            </Link>
          </div>
        </div>
        <MembershipBanner />
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Shopping Cart</h1>
            <p className={styles.subtitle}>
                <span className={styles.cartCount}>{getCartCount()}</span>
                  item{getCartCount() > 1 ? 's' : ''} in your cart
                </p>
          </div>
          <div className={styles.actions}>
            <button 
              className={`${styles.clearBtn} ${isClearing ? styles.clearing : ''}`} 
              onClick={handleClearCart}
            >
              <FiTrash2 className={styles.clearIcon} />
              Clear All
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.itemsContainer}>
            <div 
              className={styles.itemsSection}
              ref={itemsSectionRef}
            >
              <div className={styles.items}>
                {Array.isArray(cart) && cart.map((item, index) => (
                  <div 
                    ref={el => itemsRef.current[index] = el}
                    data-item-id={item.id}
                    className={`${styles.itemCard} ${visibleItems[item.id] ? styles.visible : ''} ${index === cart.length - 1 ? styles.lastItem : ''}`} 
                    key={item.id}
                    style={{ '--index': index }}
                  >
                    <div className={styles.itemMedia}>
                      <div className={styles.itemImgWrapper}>
                        <img 
                          className={styles.itemImg} 
                          src={item.image} 
                          alt={item.name} 
                          loading="lazy"
                        />
                        <div className={styles.itemBadge}>
                          {item.quantity}x
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.itemContent}>
                      <div className={styles.itemHeader}>
                        <h3 className={styles.itemTitle}>{item.name}</h3>
                        <button 
                          className={styles.removeBtn} 
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                      
                      <div className={styles.itemMeta}>
                        <span className={styles.itemPrice}>{item.price}</span>
                        <div className={styles.availability}>
                          <FiCheck style={{ fontSize: '0.9rem' }} />
                          In Stock
                        </div>
                      </div>
                      
                      <div className={styles.itemActions}>
                        <div className={styles.quantityControl}>
                          <button 
                            className={styles.qtyBtn}
                            onClick={() => changeQty(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <FiMinus />
                          </button>
                          <input
                            className={styles.qtyInput}
                            type="number"
                            value={item.quantity}
                            min={1}
                            max={99}
                            onChange={(e) => changeQty(item.id, e.target.value)}
                          />
                          <button 
                            className={styles.qtyBtn}
                            onClick={() => changeQty(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <FiPlus />
                          </button>
                        </div>
                        <div className={styles.subtotal}>
                          {calculateSubtotal(item.price, item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.continueSection}>
              <Link to="/products" className={styles.continueLink}>
                <FiChevronLeft className={styles.linkIcon} />
                Continue Shopping
              </Link>
            </div>
          </div>

          <aside className={styles.summaryCard}>
            <div className={styles.summaryHeader}>
              <h2 className={styles.summaryTitle}>
                <FaShoppingCart className={styles.summaryIcon} />
                Order Summary
              </h2>
            </div>
            
            <div className={styles.summaryContent}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span className={styles.freeShipping}>
                  <FaShippingFast />
                  Free
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              
              <div className={styles.divider}></div>
              
              <div className={styles.totalRow}>
                <span>Total</span>
                <div className={styles.totalAmount}>
                  <span className={styles.totalLabel}>USD</span>
                  <span className={styles.totalValue}>${(getCartTotal() * 1.08).toFixed(2)}</span>
                </div>
              </div>
              
              <div className={styles.promoSection}>
                <input 
                  type="text" 
                  placeholder="Promo code" 
                  className={styles.promoInput}
                />
                <button className={styles.promoBtn}>
                  Apply
                </button>
              </div>
              
              <button className={styles.checkoutBtn}>
                Proceed to Checkout
                <FiArrowRight className={styles.checkoutIcon} />
              </button>
              
              <div className={styles.paymentMethods}>
                <div className={styles.paymentLabel}>
                  <FiShield />
                  Secure Payment
                </div>
                <div className={styles.paymentIcons}>
                  <span className={styles.paymentIcon} title="Visa">
                    <FaCcVisa />
                  </span>
                  <span className={styles.paymentIcon} title="Mastercard">
                    <FaCcMastercard />
                  </span>
                  <span className={styles.paymentIcon} title="PayPal">
                    <FaCcPaypal />
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <MembershipBanner />
    </section>
  );
};

export default CartPage;