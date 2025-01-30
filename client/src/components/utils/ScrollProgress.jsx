import React, { useState, useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { useLocation } from "react-router-dom";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenis = useLenis();
  const location = useLocation(); // Used to detect page navigation

  useEffect(() => {
    const updateProgress = () => {
      if (!lenis) return;

      const scrollTop = lenis.scroll;
      const docHeight = lenis.limit;

      // Calculate progress
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
    };

    // Initial update progress when the component mounts
    updateProgress();

    lenis.on("scroll", updateProgress); // Listen for scroll event

    // Handle page navigation by resetting scroll position
    const handlePageNavigation = () => {
      // Scroll to top on page navigation
      lenis.scrollTo(0); 
    };

    // Trigger page navigation logic
    handlePageNavigation();

    return () => {
      lenis.off("scroll", updateProgress); // Clean up the scroll event listener
    };
  }, [lenis, location]); // Re-run on page navigation

  return (
    <div
      style={{ width: `${scrollProgress}%` }}
      className="fixed top-0 left-0 h-2 bg-red-600 transition-none z-[1500]"
    ></div>
  );
};

export default ScrollProgress;
