// src/components/common/Loader/Loader.tsx
import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer} aria-label="Loading">
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Searching...</p>
    </div>
  );
};