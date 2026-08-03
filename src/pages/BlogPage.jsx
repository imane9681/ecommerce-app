import React, { useState } from 'react';
import { useBookmarks } from '../context/BookmarkContext';
import { blogPosts, blogCategories } from '../data/blogData';
import BlogCard from '../components/blog/BlogCard';
import { 
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaNewspaper,
  FaRocket,
  FaStar,
  FaUser,
  FaInfoCircle,
  FaBlog,
  FaBookmark
} from 'react-icons/fa';
import styles from './BlogPage.module.css';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const { getBookmarkCount } = useBookmarks();
  const postsPerPage = 6;

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBookmark = !showBookmarks || true;
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const resetFilters = () => {
    setActiveCategory('All');
    setSearchTerm('');
    setShowBookmarks(false);
    setCurrentPage(1);
  };

  return (
    <div className={styles.blogPage}>
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FaNewspaper className={styles.heroBadgeIcon} />
            <span>Latest Articles</span>
          </div>
          <h1 className={styles.heroTitle}>Insights & Inspiration</h1>
          <p className={styles.heroSubtitle}>
            Expert tips, industry trends, and strategies to help you succeed in the digital world
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <FaRocket className={styles.heroStatIcon} />
              <span>{blogPosts.length}+ Articles</span>
            </div>
            <div className={styles.heroStat}>
              <FaStar className={styles.heroStatIcon} />
              <span>4.8/5 Rating</span>
            </div>
            <div className={styles.heroStat}>
              <FaUser className={styles.heroStatIcon} />
              <span>10K+ Readers</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filterWrapper}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button 
                  className={styles.clearSearch}
                  onClick={() => setSearchTerm('')}
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <div className={styles.filterActions}>
              <button 
                className={`${styles.bookmarkFilter} ${showBookmarks ? styles.active : ''}`}
                onClick={() => setShowBookmarks(!showBookmarks)}
              >
                <FaBookmark />
                {showBookmarks ? `Saved (${getBookmarkCount()})` : `Save (${getBookmarkCount()})`}
              </button>
              {(activeCategory !== 'All' || searchTerm || showBookmarks) && (
                <button 
                  className={styles.resetBtn}
                  onClick={resetFilters}
                >
                  <FaTimes /> Reset
                </button>
              )}
            </div>
          </div>

          <div className={styles.categoriesWrapper}>
            <div className={styles.categoriesScroll}>
              {blogCategories.map((category) => (
                <button
                  key={category}
                  className={`${styles.categoryBtn} ${activeCategory === category ? styles.active : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === 'All' ? (
                    <>
                      <FaBlog className={styles.categoryIcon} /> All
                    </>
                  ) : (
                    category
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.blogGridSection}>
        <div className={styles.container}>
          <div className={styles.gridHeader}>
            <div>
              <h2 className={styles.gridTitle}>
                {activeCategory === 'All' ? 'All Articles' : activeCategory}
              </h2>
              <p className={styles.gridSubtitle}>
                <FaInfoCircle className={styles.gridSubtitleIcon} />
                {sortedPosts.length} article{sortedPosts.length > 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {currentPosts.length > 0 ? (
            <>
              <div className={styles.blogGrid}>
                {currentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} variant="default" />
                ))}
              </div>

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
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      className={`${styles.pageBtn} ${currentPage === number ? styles.active : ''}`}
                      onClick={() => paginate(number)}
                      aria-label={`Page ${number}`}
                    >
                      {number}
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
            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <FaNewspaper />
              </div>
              <h3>No Articles Found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button className={styles.resetBtn} onClick={resetFilters}>
                <FaTimes /> Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;