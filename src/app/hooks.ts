
import { useState, useEffect } from 'react';

/**
 * 
 *
 * @param value 
 * @param delay 
 * @returns 
 */
export const useDebounce = <T>(value: T, delay: number): T => {

  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
 
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

 
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); 

  return debouncedValue;
};