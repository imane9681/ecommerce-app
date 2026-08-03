import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';
import Newsletter from '../home/Newsletter';
import WelcomeModal from './WelcomeModal';

const Layout = ({ children }) => {
  const [welcomeClosed, setWelcomeClosed] = useState(false);

  const handleWelcomeClose = () => {
    setWelcomeClosed(true);
  };

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Newsletter />
      <Footer />

      {/* Show WelcomeModal once per user (component handles localStorage) */}
      {!welcomeClosed && <WelcomeModal onClose={handleWelcomeClose} />}
    </div>
  );
};

export default Layout;