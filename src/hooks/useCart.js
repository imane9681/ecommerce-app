import { useCart } from '../context/CartContext';

// Hook مخصص لوظائف السلة
export const useCartFunctions = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  // حساب المجموع الفرعي
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);
  };

  // حساب الضريبة (نسبة ثابتة 15%)
  const calculateTax = (subtotal, taxRate = 0.15) => {
    return subtotal * taxRate;
  };

  // حساب الإجمالي
  const calculateTotal = (subtotal, tax) => {
    return subtotal + tax;
  };

  // تنسيق الأرقام إلى منزلتين عشريتين
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    calculateSubtotal,
    calculateTax,
    calculateTotal,
    formatPrice
  };
};