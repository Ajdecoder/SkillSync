import React, { useState, useEffect } from "react";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // Current scroll position
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight; // Total scrollable height
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{ width: `${scrollProgress}%` }}
      className="absolute top-0 left-0 h-2 bg-purple-700 transition-all duration-300 z-50"
    ></div>
  );
};

export default ScrollProgress;
