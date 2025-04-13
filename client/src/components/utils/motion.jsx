export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.1) => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  });
  
  export const fadeIn = (direction, type, delay, duration) => ({
    hidden: {
      opacity: 0,
      y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
      x: direction === "left" ? 24 : direction === "right" ? -24 : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  });
  
  export const textVariant = (delay) => ({
    hidden: {
      y: 24,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.2,
        delay,
      },
    },
  });