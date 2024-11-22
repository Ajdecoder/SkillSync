import React from "react";
import { footer } from "../../data/Data";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white">
        {/* Newsletter Section */}
        <div className="box">
          <div className="newsletter text-center px-4 md:px-8">
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
        </div>

        {/* Links Section */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 px-4 md:px-8">
          {footer.map((val, index) => (
            <div className="box" key={index}>
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
    </>
  );
};

export default Footer;
