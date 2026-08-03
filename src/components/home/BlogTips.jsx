import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, blogCategories } from '../../data/blogData';
import BlogCard from '../blog/BlogCard';
import styles from './BlogTips.module.css';
import { 
  FaChevronRight,
  FaNewspaper
} from 'react-icons/fa';

const BlogTips = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const displayedPosts = filteredPosts.slice(0, 3);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>

          <h2 className={styles.sectionTitle}>
            Latest Articles
          </h2>
          
          <p className={styles.sectionSubtitle}>
            Expert tips and industry trends to grow your business
          </p>
        </div>

        <div className={styles.categoriesFilter}>
          {blogCategories.map((category, index) => (
            <button 
              key={index} 
              className={`${styles.categoryBtn} ${
                activeCategory === category ? styles.active : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.blogGrid}>
          {displayedPosts.map((post) => (
            <BlogCard key={post.id} post={post} variant="small" />
          ))}
        </div>

        <div className={styles.loadMore}>
          <Link to="/blog" className={styles.loadMoreBtn}>
            View All Articles
            <FaChevronRight className={styles.loadMoreIcon} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogTips;