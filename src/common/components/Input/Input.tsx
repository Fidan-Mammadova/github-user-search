


import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
import { FaSearch } from 'react-icons/fa'; // иконка из react-icons

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...rest }) => {
  return (
    <div className={`${styles.inputWrapper} ${className || ''}`}>
      <FaSearch className={styles.searchIcon} />
      <input
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        {...rest}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
