import React from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../../context/BookmarkContext';
import { 
  FaCalendar, 
  FaUser, 
  FaClock, 
  FaArrowRight, 
  FaBookmark,
  FaFire,
  FaEye,
  FaComment,
  FaHeart,
  FaTag
} from 'react-icons/fa';
import styles from './BlogCard.module.css';

const BlogCard = ({ post, variant = 'default' }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <article className={`${styles.blogCard} ${styles[variant]}`}>
      <div className={styles.cardImage}>
        <img 
          src={post.image} 
          alt={post.title}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x250/FF9A3D/ffffff?text=${encodeURIComponent(post.category)}`;
          }}
        />
        <div className={styles.cardCategory}>
          <FaTag className={styles.categoryIcon} />
          {post.category}
        </div>
        {post.featured && (
          <div className={styles.featuredBadge}>
            <FaFire /> Featured
          </div>
        )}
        <button 
          className={`${styles.bookmarkBtn} ${isBookmarked(post.id) ? styles.active : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(post.id);
          }}
          aria-label={isBookmarked(post.id) ? "Remove from bookmarks" : "Add to bookmarks"}
        >
          <FaBookmark />
        </button>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span className={styles.metaItem}>
            <FaCalendar className={styles.metaIcon} />
            {post.date}
          </span>
          <span className={styles.metaItem}>
            <FaClock className={styles.metaIcon} />
            {post.readTime}
          </span>
          <span className={styles.metaItem}>
            <FaEye className={styles.metaIcon} />
            {post.views}
          </span>
        </div>
        
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>
        
        <div className={styles.cardFooter}>
          <div className={styles.author}>
            <FaUser className={styles.authorIcon} />
            <span>{post.author}</span>
          </div>
          <div className={styles.cardStats}>
            <span className={styles.statItem}>
              <FaComment /> {post.comments}
            </span>
            <span className={styles.statItem}>
              <FaHeart /> {post.likes}
            </span>
          </div>
        </div>
        
        <Link to={`/blog/${post.id}`} className={styles.readMoreBtn}>
          Read More
          <FaArrowRight className={styles.btnIcon} />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;