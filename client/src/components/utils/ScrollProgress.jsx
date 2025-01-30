import React, { useState, useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { useLocation } from "react-router-dom";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenis = useLenis();
  const location = useLocation();

  useEffect(() => {
    const updateProgress = () => {
      if (!lenis) return;

      const scrollTop = lenis.scroll;
      const docHeight = lenis.limit;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    const handlePageNavigation = () => {
      if (lenis) {
        lenis.scrollTo(0);
        setScrollProgress(0);
        lenis.resize(); // Changed from update() to resize()
      }
    };

    updateProgress();

    lenis?.on("scroll", updateProgress);

    handlePageNavigation();

    return () => {
      lenis?.off("scroll", updateProgress);
    };
  }, [lenis, location]);

  return (
    <div
      style={{ width: `${scrollProgress}%` }}
      className="fixed top-0 left-0 h-2 bg-red-600 transition-none z-[1500]"
    ></div>
  );
};

export default ScrollProgress;