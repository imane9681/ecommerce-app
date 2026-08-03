import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('bookmarkedPosts');
      if (savedBookmarks) {
        setBookmarkedPosts(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts));
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  }, [bookmarkedPosts]);

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev => {
      if (prev.includes(postId)) {
        return prev.filter(id => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  const isBookmarked = (postId) => {
    return bookmarkedPosts.includes(postId);
  };

  const getBookmarkCount = () => {
    return bookmarkedPosts.length;
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedPosts,
        toggleBookmark,
        isBookmarked,
        getBookmarkCount,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};