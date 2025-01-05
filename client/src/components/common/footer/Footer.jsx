import React, { useState, useEffect, useRef } from "react";
import { footer } from "../../data/Data";
import "./footer.css";

const Footer = () => {
  // State to track if the elements are in view
  const [inView, setInView] = useState(false);
  
  // Refs for the elements you want to observe
  const newsletterRef = useRef(null);
  const containerRef = useRef(null);
  const boxRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.5 } // 50% of the element must be visible
    );

    // Observe the newsletter section and container
    if (newsletterRef.current) observer.observe(newsletterRef.current);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (newsletterRef.current) observer.unobserve(newsletterRef.current);
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  useEffect(() => {
    // Observe each box in the footer using individual refs
    boxRefs.current.forEach((el) => {
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.classList.add("animate-fade-in"); // Apply animation class
            } else {
              el.classList.remove("animate-fade-in");
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(el);

        return () => observer.unobserve(el); // Cleanup observer
      }
    });
  }, [boxRefs]);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div
        ref={newsletterRef} // Attach ref to this element
        className={`newsletter text-center px-4 md:px-8 ${inView ? "animate-fade-in" : ""}`}
        style={{ opacity: inView ? 1 : 0, transition: "opacity 1s ease" }}
      >
        <h2 className="text-2xl font-bold mb-4">
          Do You Need Help With Anything?
        </h2>
        <p className="text-gray-400 mb-6">
          Receive updates, hot deals, tutorials, and discounts sent straight
          to your inbox every month.
        </p>
        <div className="input flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Email Address"
            className="p-2 rounded-lg w-2/3 md:w-1/3 text-black"
          />
          <button className="foot-btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md">
            Subscribe
          </button>
        </div>
      </div>

      {/* Links Section */}
      <div
        ref={containerRef} // Attach ref to this element
        className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 px-4 md:px-8 text-center"
      >
        {footer.map((val, index) => (
          <div
            ref={(el) => (boxRefs.current[index] = el)} // Store each box reference
            className="box"
            key={index}
            style={{ opacity: 0, transform: "translateY(50px)", transition: "opacity 1s ease, transform 1s ease" }}
          >
            <h3 className="text-lg font-semibold mb-4">{val.title}</h3>
            <ul className="space-y-2">
              {val.text.map((items) => (
                <li
                  key={items.id}
                  className="hover:text-green-400 cursor-pointer"
                >
                  {items.list}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal Section */}
      <div className="legal text-center mt-1.5 text-gray-500 text-sm absolute w-full">
        <span>© 2024. Designed By Ajdecoder.</span>
      </div>
    </footer>
  );
};

export default Footer;
