import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import RequirementDropdown from "./RequirementDropdown";

const DesktopNav = ({ nav, navExpand }) => {
  const location = useLocation();

  return (
    <ul className="hidden md:flex items-center gap-8">
      {nav.map((item, index) =>
        item.text === "Requirement" ? (
          <li key={index}>
            <RequirementDropdown navExpand={navExpand} variant="desktop" />
          </li>
        ) : (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "text-slate-500 hover:text-slate-700 dark:hover:text-white dark:text-gray-300",
                  isActive &&
                    !location.pathname.includes("requirement") &&
                    "text-blue-600 dark:text-blue-400"
                )
              }
            >
              <span>{item.icon} {item.text.toUpperCase()}</span>
              
            </NavLink>
          </li>
        )
      )}
    </ul>
  );
};

export default DesktopNav;