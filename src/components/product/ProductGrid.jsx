// ProductGrid.jsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductGrid = ({ title = "Featured Products", products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  if (!products || products.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.title}>
          <h1>{title}</h1>
          <p>No products available at the moment.</p>
        </div>
      </section>
    );
  }

  // حساب إجمالي الصفحات
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // دوال التنقل بين الصفحات
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    // التمرير إلى أعلى القسم
    const section = document.getElementById(`grid-${title.replace(/\s+/g, '-')}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // إنشاء أرقام الصفحات
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
    <section className={styles.section} id={`grid-${title.replace(/\s+/g, '-')}`}>
      <div className={styles.title}>
        <h1>{title}</h1>
        <p>All the latest picked from designer of our store</p>
        <span className={styles.productCount}>{products.length} products</span>
      </div>

      <div className={styles.productCenter}>
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* عرض الترقيم فقط إذا كان عدد المنتجات > 12 */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`}
            onClick={prevPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
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
            onClick={nextPage}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;