import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import RequirementDropdown from "./RequirementDropdown";

const MobileNav = ({ isOpen, onClose, nav, navExpand, subnavLogo }) => {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="z-30 fixed inset-0 bg-black/60 dark:bg-black/80"
          onClick={onClose}
        />
      )}

      <ul
        className={clsx(
          "fixed top-0 right-0 z-40 h-full w-72 overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 dark:bg-gray-900 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <img className="w-36 mb-6" src={subnavLogo} alt="" />

        {nav.map((item, index) =>
          item.text === "Requirement" ? (
            <li key={index} className="border-b border-gray-100 dark:border-gray-800">
              <RequirementDropdown
                navExpand={navExpand}
                variant="mobile"
                onNavigate={onClose}
              />
            </li>
          ) : (
            <li key={index} className="border-b border-gray-100 dark:border-gray-800">
              <NavLink
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    "block py-3 text-slate-500 dark:hover:text-white dark:text-gray-300 rounded-lg transition-colors duration-300 hover:text-blue-600",
                    isActive &&
                      !location.pathname.includes("requirement") &&
                      "text-blue-600 dark:text-blue-400"
                  )
                }
              >
                {item.text.toUpperCase()}
              </NavLink>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default MobileNav;