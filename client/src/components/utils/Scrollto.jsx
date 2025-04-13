import React, { useState, useEffect } from "react";

const ScrollButton = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [scaled, setScaled] = useState(false);

  const toggleScrollPosition = () => {
    if (isAtTop) {
      // Scroll down to the bottom
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      console.log(document.head.scrollHeight)
    } else {
      // Scroll up to the top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    // Check if the user is at the top of the page
    setIsAtTop(window.scrollY === 0);
  };

  // Continuous scaling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScaled((prevScaled) => !prevScaled);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Inline styles for the button
  const scaleStyle = {
    width: "60px",
    height: "60px",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    position: "fixed",
    bottom: "80px",
    right: "20px",
    transition: "transform 0.2s ease-in-out",
    transform: scaled ? "scale(1.2)" : "scale(1)",
    borderRadius: "50%",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    display: "flex",
    backgroundColor: "purple",
    color: "white",
    zIndex: 50,
  };

  return (
    <button
      onClick={toggleScrollPosition}
      style={scaleStyle}
      className="scroll-toggle-btn"
    >
      {isAtTop ? (
        <i className="fas fa-hand-point-down"></i>
      ) : (
        <i className="fas fa-hand-point-up"></i>
      )}
    </button>
  );
};

export default ScrollButton;
