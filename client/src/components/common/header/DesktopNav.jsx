import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import RequirementDropdown from "./RequirementDropdown";
import SearchDropdown from "./SearchRequirements";
import { FaListCheck } from "react-icons/fa6";

const DesktopNav = ({ nav, navExpand }) => {
  const location = useLocation();

  return (
    <ul className="hidden md:flex md:items-center md:gap-2 lg:gap-4 xl:gap-6 text-[10px] md:text-[10px] lg:text-[11px] xl:text-xs flex-1 min-w-0 justify-center">
      {nav.map((item, index) =>
        item.text === "Requirement" ? (
          <li className="flex items-center gap-2 whitespace-nowrap" key={index}>
            <FaListCheck size={18} className="text-slate-400" />
            <RequirementDropdown navExpand={navExpand} variant="desktop" />
          </li>
        ) : (
          <li key={index} className="whitespace-nowrap">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-1.5 text-slate-400 hover:text-blue-500 transition-colors",
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
      <li className="ml-1 shrink-0">
        <SearchDropdown variant="desktop" />
      </li>
    </ul>
  );
};

export default DesktopNav;