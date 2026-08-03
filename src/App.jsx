import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { BookmarkProvider } from './context/BookmarkContext';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login'; 
import SignUp from './pages/SignUp';
import WishlistPage from './pages/WishlistPage';
import BlogPage from './pages/BlogPage';
import CategoriesPage from './pages/CategoriesPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import ShippingPage from './pages/ShippingPage';
import ReturnsPage from './pages/ReturnsPage';
import './App.css';

const ScrollToTop = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search]);

  return null;
};

function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <BookmarkProvider>
          <Router>
            <Layout>
                <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/register" element={<SignUp />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/returns" element={<ReturnsPage />} />
              </Routes>
            </Layout>
          </Router>
        </BookmarkProvider>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;