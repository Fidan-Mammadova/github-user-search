// src/components/layout/Header/Header.tsx
import React from 'react';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Поиск пользователей GitHub</h1>
      </div>
    </header>
  );
};
