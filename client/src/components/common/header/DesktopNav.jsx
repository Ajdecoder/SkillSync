import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import RequirementDropdown from "./RequirementDropdown";
import SearchDropdown from "./SearchRequirements";
import { FaListCheck } from "react-icons/fa6";

const DesktopNav = ({ nav, navExpand }) => {
  const location = useLocation();

  return (
    <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-xs md:text-[11px] sm:text-[10px]">
      {nav.map((item, index) =>
        item.text === "Requirement" ? (
          <li className="flex items-center gap-2" key={index}>
            <FaListCheck size={18} className="text-slate-400" />
            <RequirementDropdown navExpand={navExpand} variant="desktop" />
          </li>
        ) : (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors",
                  isActive &&
                    !location.pathname.includes("requirement") &&
                    "text-blue-400"
                )
              }
            >
              {item?.icon}
              <span className="font-medium uppercase tracking-wide">
                {item?.text}
              </span>
            </NavLink>
          </li>
        )
      )}

      {/* Search */}
      <li className="ml-1">
        <SearchDropdown variant="desktop" />
      </li>
    </ul>
  );
};

export default DesktopNav;