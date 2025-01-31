import React, { useState, useEffect, useRef } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { useLocation } from "react-router-dom";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageHeight, setPageHeight] = useState(document.body.scrollHeight);
  const lenis = useLenis();
  const location = useLocation();
  const observerRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      if (!lenis) return;

      const scrollTop = lenis.scroll;
      const docHeight = lenis.limit || pageHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    const updatePageHeight = () => {
      setPageHeight(document.body.scrollHeight);
      lenis?.resize();
      updateProgress(); // Ensure scrollbar updates after resize
    };

    // Observe DOM changes to detect height updates
    observerRef.current = new MutationObserver(() => {
      updatePageHeight();
    });

    observerRef.current.observe(document.body, {
      childList: true, // Watches for added/removed elements
      subtree: true, // Watches deep changes
      attributes: true, // Watches for attribute changes (e.g., style changes)
      characterData: true, // Watches for text changes
    });

    // Initial updates
    updateProgress();
    lenis?.on("scroll", updateProgress);
    window.addEventListener("resize", updatePageHeight);

    return () => {
      lenis?.off("scroll", updateProgress);
      window.removeEventListener("resize", updatePageHeight);
      observerRef.current?.disconnect(); // Clean up observer
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
