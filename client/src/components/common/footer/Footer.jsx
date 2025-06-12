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
      className={`bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-8  ${
        isVisible ? "footer-visible" : ""
      }`}
    >
      {/* Newsletter Section */}
      <div
        className={`footer-section ${
          isVisible ? "animate-slideInLeft relative top-[30px] " : ""
        }`}
      >
        <div className="newsletter text-center px-4 md:px-8">
          <h2 className="text-2xl font-bold mb-4">
            Do You Need Help With Anything?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Receive updates, hot deals, tutorials, and discounts sent straight
            to your inbox every month.
          </p>
          <div className="input flex justify-center items-center gap-2  ">
            <input
              type="text"
              placeholder="Email Address"
              className="p-2 rounded-lg w-2/3 md:w-1/3 text-black dark:text-white bg-white border border-black  dark:border-gray-600"
            />
            <button className="foot-btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div
        className={`footer-section ${isVisible ? "animate-slideInLeft" : ""}`}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 px-4 md:px-8 text-center">
          {footer.map((val, index) => (
            <div className="box" key={index}>
              <h3 className="text-lg font-semibold mb-4">{val.title}</h3>
              <ul className="space-y-2">
                {val.text.map((items) => (
                  <li
                    key={items.id}
                    className="hover:text-green-500 dark:hover:text-green-400 cursor-pointer transition"
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
      <div className="footer-section legal text-center text-gray-500 dark:text-gray-400 relative bottom-[-30px] text-sm">
        <span>© 2024. Designed By Ajdecoder.</span>
      </div>
    </footer>
  );
};

export default Footer;
