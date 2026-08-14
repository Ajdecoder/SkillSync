import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";

/**
 * Self-contained trigger + panel for the "Requirement" nav item.
 * variant="desktop" -> floating panel anchored under the trigger
 * variant="mobile"  -> inline accordion that pushes content down
 */
const RequirementDropdown = ({ navExpand = [], variant = "desktop", onNavigate }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleItemClick = () => {
        setShowDropdown(false);
        onNavigate?.();
    };

    const isDesktop = variant === "desktop";

    return (
        <div ref={wrapperRef} className={clsx("relative", !isDesktop && "w-full")}>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown((prev) => !prev);
                }}
                className={clsx(
                    "flex items-center gap-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-white dark:text-gray-300",
                    !isDesktop && "w-full justify-between py-3",
                    (showDropdown || location.pathname.includes("requirement")) &&
                    "text-blue-600 dark:text-blue-400"
                )}
            >
                REQUIREMENT
                <i
                    className={clsx(
                        "fa-solid fa-chevron-down text-[10px] transition-transform duration-200",
                        showDropdown && "rotate-180"
                    )}
                />
            </button>

            <div
                className={clsx(
                    "z-50 rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-black/10 ring-1 ring-black/5 transition-all duration-200 dark:border-gray-800 dark:bg-gray-900",
                    isDesktop
                        ? "absolute left-1/2 top-full mt-3 w-[24rem] -translate-x-1/2 origin-top"
                        : "static w-full mt-1 mb-2",
                    showDropdown
                        ? "visible translate-y-0 scale-100 opacity-100"
                        : isDesktop
                            ? "invisible -translate-y-2 scale-95 opacity-0 pointer-events-none absolute"
                            : "hidden"
                )}
            >
                {isDesktop && (
                    <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900" />
                )}

                <div className="relative px-4 py-3">
                    <ul
                        className={clsx(
                            "mt-1",
                            isDesktop ? "grid grid-cols-2 gap-x-6 gap-y-1" : "flex flex-col"
                        )}
                    >
                        {navExpand.map((subItem, subIndex) => (
                            <li key={subIndex}>
                                <NavLink
                                    to={subItem.path}
                                    onClick={handleItemClick}
                                    className={({ isActive }) =>
                                        clsx(
                                            "group flex items-center gap-2.5 rounded-xl px-2 py-2.5 transition-colors duration-150 hover:bg-blue-50 dark:hover:bg-gray-800",
                                            isActive && "bg-blue-50 dark:bg-gray-800"
                                        )
                                    }
                                >
                                    {subItem.icon && (
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-400 dark:group-hover:bg-gray-700">
                                            {subItem.icon}
                                        </span>
                                    )}
                                    <span className="whitespace-nowrap text-sm font-medium text-slate-700 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-400">
                                        {subItem.text}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RequirementDropdown;