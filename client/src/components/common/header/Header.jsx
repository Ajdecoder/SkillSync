import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import {
  nav,
  navExpandCAndidate,
  navExpandRecruiter,
} from "../..//common/constants";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "/images/logo.png";
import subnav_logo from "/images/subnav_logo.png";
import clsx from "clsx";
import "./notifications.css";
import NotificationButton from "./Notification";
import { FaMoon, FaRegMoon, FaRegUser, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { loggedInUser, logout: customLogout, googleUser } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();
  const [isNavListOpen, setIsNavListOpen] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [navExpand, setExpandNav] = useState([]);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const dropdownExpandRef = useRef(null);
  const headerRef = useRef(null);

  const currentUser = loggedInUser || googleUser;

  useEffect(() => {
    if (currentUser) {
      setExpandNav(
        currentUser?.role === "candidate"
          ? navExpandCAndidate
          : navExpandRecruiter
      );
    } else {
      setExpandNav([
        {
          text: "Talent Search",
          path: "requirements/hire-talent",
        },
        {
          text: "Browse Opportunities",
          path: "requirements/browse-opportunities",
        },
        {
          text: "My Job Listings",
          path: "requirements/listed-opportunity",
        },
        {
          text: "Resume Builder",
          path: "requirements/resume-builder",
        },
        {
          text: "Market Trends",
          path: "requirements/market-trends",
        },
      ]);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsNavListOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    if (currentUser) {
      customLogout();
      localStorage.removeItem("googleUser");
      navigate("/");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAboutUser(false);
      }

      if (
        isSmallScreen &&
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setIsNavListOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSmallScreen]);

  const navList = nav.map((item, index) => (
    <li
      onClick={() => setIsNavListOpen(false)}
      key={index}
      className="nav-item relative"
      onMouseEnter={() => {
        if (item.text === "Requirement") {
          setShowDropdown(true);
        }
      }}
      onMouseLeave={() => {
        if (item.text === "Requirement") {
          setShowDropdown(false);
        }
      }}
    >
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          clsx(
            "reqli text-slate-500 hover:text-slate-700 dark:text-gray-300 dark:hover:text-white",
            {
              "active text-blue-600 dark:text-blue-400":
                isActive && !location.pathname.includes("requirement"),
            }
          )
        }
      >
        {item.text}
      </NavLink>

      {item.text === "Requirement" && (
        <div
          ref={dropdownExpandRef}
          className={clsx("dropdown-expand", {
            block: isSmallScreen || showDropdown,
            hidden: !isSmallScreen && !showDropdown,
          })}
        >
          <ul className="dropdown bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            {navExpand.map((subItem, subIndex) => (
              <li key={subIndex}>
                <NavLink
                  to={subItem.path}
                  className={({ isActive }) =>
                    clsx(
                      "inline-block w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 ml-0",
                      isActive && "active bg-gray-100 dark:bg-gray-700"
                    )
                  }
                >
                  <span className="inline-block align-middle mr-2">
                    {!isNavListOpen && subItem.icon}
                  </span>
                  <span className="inline-block align-middle m-0">
                    {subItem.text}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  ));

  return (
    <header className="border-[1.2px] rounded-lg dark:border-gray-700 bg-white dark:bg-gray-900 mt-1 mb-1">
      <div className="flex top-header relative border-[1.2px] rounded-lg dark:border-gray-700 bg-white dark:bg-gray-900 h-20">
        {/* Logo */}
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="dark:filter dark:invert" />
          </NavLink>
        </div>

        {/* Navigation */}
        <nav ref={headerRef} className="relative">
          {/* Dark Background Overlay for Mobile */}
          {isNavListOpen && isSmallScreen && (
            <div
              className="fixed inset-0 bg-black/60 dark:bg-black/80 z-30"
              onTouchStart={() => setIsNavListOpen(false)}
            ></div>
          )}

          <ul
            className={clsx(
              isNavListOpen
                ? "small overflow-scroll z-40 rounded-t-[5%] bg-white dark:bg-gray-900"
                : "flex"
            )}
          >
            <img
              className="subnav_logo hidden w-36 m-[30px]"
              src={subnav_logo}
              alt=""
            />
            {navList}
          </ul>
        </nav>

        <div className="flex items-center justify-between gap-10 nav-group">
          {/* Theme Toggle */}
          <button
            className={`theme-toggle p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              theme === "light" ? "text-gray-700" : "text-yellow-400"
            }`}
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? <FaRegMoon size={21} /> : <FaSun size={21} />}
          </button>

          {currentUser && <NotificationButton />}

          {/* User Section */}
          <div ref={dropdownRef} className="button">
            {currentUser ? (
              <>
                <div
                  className="flex items-center space-x-3 cursor-pointer hover:scale-[0.9] transition-ease-in duration-200"
                  onClick={() => setShowAboutUser((prev) => !prev)}
                >
                  <span className="inline-block bg-blue-500 text-white rounded-full p-3 text-lg font-bold">
                    {currentUser?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>

                {/* User Dropdown Menu */}
                {showAboutUser && (
                  <div className="flex flex-col absolute top-16 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md p-4 min-w-[200px] rounded-lg transition-all duration-300 ease-in-out z-[999]">
                    <Link
                      to="/profile/userProfile"
                      className="text-center text-2xl text-gray-700 dark:text-gray-300"
                    >
                      <i className="fa-solid fa-googleUser">
                        <FaRegUser />
                      </i>
                    </Link>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <strong>Name:</strong> {currentUser?.name || "User"}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <strong>Email:</strong> {currentUser?.email || "N/A"}
                    </p>
                    <div className="flex flex-col p-2 gap-3">
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                      >
                        <i className="fa fa-sign-out mr-2"></i> Logout
                      </button>

                      <Link
                        to="/profile/settings"
                        className="text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Settings
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="log-sign relative text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <i className="fa fa-sign-in mr-2"></i> Sign in
              </Link>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="toggle">
            <button
              onClick={() => setIsNavListOpen(!isNavListOpen)}
              className="text-3xl text-gray-700 dark:text-gray-300"
            >
              <i className={!isNavListOpen && "fa fa-bars"}></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
