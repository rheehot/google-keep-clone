import { useState, useEffect, useRef } from 'react';

export const useClickOutside = (initialValue) => {
  const [isClickOutside, setIsClickOutside] = useState(initialValue);
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsClickOutside(false);
    } else {
      setIsClickOutside(true);
    }
  };

  const handleResetClick = () => setIsClickOutside(initialValue);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return {
    ref,
    isClickOutside,
    handleResetClick,
    setIsClickOutside,
  };
};
