// ProductList.jsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductList = ({ products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  if (!products || products.length === 0) {
    return (
      <div className={styles.noProducts}>
        <p>No products found. Please try a different category.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }
      
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div>
      <div className={styles.productCenter}>
        {currentProducts.map((product, index) => (
          <ProductCard key={product.id || index} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`${styles.pageBtn} ${page === currentPage ? styles.active : ''} ${page === '...' ? styles.dots : ''}`}
              onClick={() => typeof page === 'number' && goToPage(page)}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}

          <button 
            className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;