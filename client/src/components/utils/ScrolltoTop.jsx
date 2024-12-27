import React, { useState, useEffect } from 'react';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
    onClick={scrollToTop}
    className={`${
      isVisible ? "block" : "hidden"
    } fixed bottom-20 right-5 bg-purple-700 text-white border-none h-16 p-4 rounded-md cursor-pointer shadow-lg text-xl hover:bg-black transition-all duration-300`}
  >
    <i className="fas fa-hand-point-up"></i>
  </button>
  
  );
};

export default GoToTopButton;
