import React, { useState, useEffect } from 'react';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scaled, setScaled] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Continuous scaling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScaled((prevScaled) => !prevScaled);
    }, 1000); // Change scale every 1 second (1000ms)

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Inline styles for scaling the button
  const scaleStyle = {
    width: "60px", // Adjust button size
    height: "60px", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    position: "fixed",
    bottom: "80px",
    right: "20px",
    transition: "transform 0.2s ease-in-out", // Smooth transition
    transform: scaled ? "scale(1.2)" : "scale(1)", // Apply scale based on state
    borderRadius: "50%",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      style={scaleStyle}
      className={`${isVisible ? "block" : "hidden"} scroll-to-top text-white text-xl flex justify-center items-center bg-[purple] hover:bg-black z-[1000]`}
    >
      <i className="fas fa-hand-point-up"></i>
    </button>
  );
};

export default GoToTopButton;
