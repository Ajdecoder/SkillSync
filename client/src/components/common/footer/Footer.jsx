import React, { useEffect, useRef, useState } from "react";
import { footer } from "../..//common/constants";
import "./footer.css";

const Footer = () => {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the footer is visible
    );
    setIsVisible(false);

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        // observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10 border-t border-gray-200 dark:border-gray-800 ${isVisible ? "footer-visible" : ""
        }`}
    >
      {/* Newsletter Section */}
      <div
        className={` ${isVisible ? "animate-slideInLeft relative top-[30px]" : ""
          }`}
      >
        <div className="newsletter text-center px-4 md:px-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Do You Need Help With Anything?
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Receive updates, hot deals, tutorials, and discounts sent straight to your
            inbox every month.
          </p>

          <div className="flex justify-center items-center gap-3">
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 rounded-xl w-full sm:w-2/3 md:w-1/3
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              className="bg-green-500 hover:bg-green-600
          text-white font-semibold
          py-3 px-6 rounded-xl
          shadow-md hover:shadow-lg transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div
        className={` ${isVisible ? "animate-slideInLeft" : ""}`}
      >
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-14 px-4 md:px-8 text-center">
          {footer.map((val, index) => (
            <div className="box" key={index}>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {val.title}
              </h3>

              <ul className="space-y-2">
                {val.text.map((items) => (
                  <li
                    key={items.id}
                    className="text-gray-600 dark:text-gray-400
                hover:text-green-500 dark:hover:text-green-400
                cursor-pointer transition"
                    onClick={() => (window.location.href = `${items.url}`)}
                  >
                    {items.list}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Section */}
      <div className=" text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
        <span>
          © {new Date().getFullYear()} · Designed by{" "}
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Ajdecoder
          </span>
        </span>
      </div>
    </footer>

  );
};

export default Footer;
