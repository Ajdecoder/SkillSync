import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";

const RequirementDropdown = ({
    navExpand = [],
    variant = "desktop",
    onNavigate,
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef(null);
    const location = useLocation();

    const isDesktop = variant === "desktop";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Close dropdown when route changes
    useEffect(() => {
        setShowDropdown(false);
    }, [location.pathname]);

    const handleItemClick = () => {
        setShowDropdown(false);
        onNavigate?.();
    };

    const isRequirementActive = location.pathname.includes("requirement");

    return (
        <div
            ref={wrapperRef}
            className={clsx(
                "relative",
                !isDesktop && "w-full"
            )}
        >
            {/* Trigger */}
            <button
                type="button"
                aria-expanded={showDropdown}
                aria-haspopup="true"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown((prev) => !prev);
                }}
                className={clsx(
                    "group flex items-center gap-1.5",
                    "font-medium tracking-wide",
                    "text-sm",
                    "transition-colors duration-200",

                    "text-slate-600 hover:text-blue-600",

                    "dark:text-slate-300",
                    "dark:hover:text-blue-400",

                    !isDesktop && [
                        "w-full justify-between",
                        "pr-3 py-3",
                        "rounded-lg",
                    ],

                    (showDropdown || isRequirementActive) && [
                        "text-blue-600 dark:text-blue-400",
                    ]
                )}
            >
                <span>REQUIREMENT</span>

                <i
                    className={clsx(
                        "fa-solid fa-chevron-down",
                        "text-[9px]",
                        "transition-transform duration-200 ease-out",
                        "text-slate-400",
                        "dark:text-slate-500",
                        showDropdown && "rotate-180",
                        (showDropdown || isRequirementActive) &&
                        "text-blue-500 dark:text-blue-400"
                    )}
                />
            </button>

            {/* Dropdown */}
            <div
                className={clsx(
                    "z-50",
                    "border",
                    "border-slate-200 dark:border-slate-700",
                    "bg-white dark:bg-slate-900",
                    "shadow-sm shadow-slate-900/10 dark:shadow-black/30",
                    "transition-all duration-200 ease-out",

                    isDesktop
                        ? [
                            "absolute left-1/2 top-full",
                            "mt-3",
                            "w-[min(90vw,520px)]",
                            "-translate-x-1/2",
                            "rounded-2xl",
                            "origin-top",
                        ]
                        : [
                            "static",
                            "w-full",
                            "mt-1",
                            "rounded-xl",
                        ],

                    showDropdown
                        ? [
                            "visible",
                            "translate-y-0",
                            "scale-100",
                            "opacity-100",
                        ]
                        : isDesktop
                            ? [
                                "invisible",
                                "-translate-y-2",
                                "scale-95",
                                "opacity-0",
                                "pointer-events-none",
                            ]
                            : ["hidden"]
                )}
            >
                {/* Desktop arrow */}
                {isDesktop && (
                    <div
                        className="
                            absolute -top-1.5 left-1/2
                            h-3 w-3
                            -translate-x-1/2
                            rotate-45
                            border-l border-t
                            border-slate-200
                            bg-white
                            dark:border-slate-700
                            dark:bg-slate-900
                        "
                    />
                )}

                <div
                    className={clsx(
                        "relative",
                        isDesktop
                            ? "p-3 sm:p-4"
                            : "p-2"
                    )}
                >
                    {/* Header */}
                    {isDesktop && (
                        <div className="px-2 pb-3">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                Requirements
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                Explore available opportunities
                            </p>
                        </div>
                    )}

                    {/* Items */}
                    <ul
                        className={clsx(
                            "overflow-y-auto scrollbar-thin",
                            isDesktop
                                ? [
                                    "grid",
                                    "grid-cols-1 sm:grid-cols-2",
                                    "gap-1",
                                    "max-h-[min(60vh,420px)]",
                                ]
                                : [
                                    "flex flex-col",
                                    "max-h-[60vh]",
                                ]
                        )}
                    >
                        {navExpand.map((subItem, subIndex) => (
                            <li key={subItem.path || subIndex}>
                                <NavLink
                                    to={subItem.path}
                                    onClick={handleItemClick}
                                    className={({ isActive }) =>
                                        clsx(
                                            "group flex items-center gap-3",
                                            "rounded-xl",
                                            "transition-all duration-150",

                                            isDesktop
                                                ? "px-2.5 py-2.5"
                                                : "px-3 py-3",

                                            "hover:bg-blue-50",
                                            "dark:hover:bg-slate-800",

                                            isActive && [
                                                "bg-blue-50",
                                                "dark:bg-blue-500/10",
                                            ]
                                        )
                                    }
                                >
                                    {/* Icon */}
                                    {subItem.icon && (
                                        <span
                                            className="
                                                flex
                                                h-9 w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg

                                                bg-slate-100
                                                text-slate-600

                                                group-hover:bg-blue-100
                                                group-hover:text-blue-600

                                                dark:bg-slate-800
                                                dark:text-slate-400

                                                dark:group-hover:bg-blue-500/10
                                                dark:group-hover:text-blue-400

                                                transition-colors duration-150
                                            "
                                        >
                                            {subItem.icon}
                                        </span>
                                    )}

                                    {/* Text */}
                                    <span
                                        className="
                                            min-w-0
                                            flex-1
                                            text-sm
                                            font-medium
                                            text-slate-700

                                            group-hover:text-blue-600

                                            dark:text-slate-200
                                            dark:group-hover:text-blue-400
                                        "
                                    >
                                        {subItem.text}
                                    </span>

                                    {/* Arrow */}
                                    <i
                                        className="
                                            fa-solid fa-arrow-right
                                            text-[10px]
                                            text-slate-300

                                            opacity-0
                                            -translate-x-1

                                            group-hover:opacity-100
                                            group-hover:translate-x-0
                                            group-hover:text-blue-500

                                            dark:text-slate-600
                                            dark:group-hover:text-blue-400

                                            transition-all duration-150
                                        "
                                    />
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