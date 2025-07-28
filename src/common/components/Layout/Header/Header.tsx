// src/components/layout/Header/Header.tsx
import React from 'react';
import styles from './Header.module.scss';
import useTheme from '../../../../contexts/useTheme-hook';
import { FaSun, FaMoon } from 'react-icons/fa'; 

export const Header: React.FC = () => {

   const { theme, toggleTheme } = useTheme();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Github User Search</h1>
        <button
        className={styles.themeButton}
        data-testid="themeButton"
        type="button"
        onClick={toggleTheme} 
        aria-label={`Toggle theme to ${theme === 'light' ? 'dark' : 'light'}`}
        data-theme={theme} 
      >
        {theme === 'light' ? 'Dark' : 'Light'}{' '} 
        {theme === 'light' ? <FaMoon /> : <FaSun />} 
      </button>
      </div>
    </header>
  );
};
