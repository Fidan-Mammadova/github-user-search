

import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...rest
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className || ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};
