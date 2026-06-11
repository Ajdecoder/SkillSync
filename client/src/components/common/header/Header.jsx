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
import UserDropdown from "./UserDropdown";

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
  const [confirmlogout, setConfirmLogout] = useState(false)
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
    customLogout();
    localStorage.removeItem("googleUser");
    setConfirmLogout(false);
    setShowAboutUser(false);
    navigate("/");
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
      className="relative nav-item"
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
            "text-slate-500 hover:text-slate-700 dark:hover:text-white dark:text-gray-300 reqli",
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
          <ul className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 dropdown">
            {navExpand.map((subItem, subIndex) => (
              <li key={subIndex}>
                <NavLink
                  to={subItem.path}
                  className={({ isActive }) =>
                    clsx(
                      "inline-block hover:bg-gray-100 dark:hover:bg-gray-700 ml-0 p-2 w-full text-gray-700 dark:text-gray-300",
                      isActive && "active bg-gray-100 dark:bg-gray-700"
                    )
                  }
                >
                  <span className="inline-block mr-2 align-middle">
                    {!isNavListOpen && subItem.icon}
                  </span>
                  <span className="inline-block m-0 align-middle">
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
    <header className="bg-white dark:bg-gray-900 mt-1 mb-1 border-[1.2px] dark:border-gray-700 rounded-lg">
      <div className="top-header relative flex bg-white dark:bg-gray-900 border-[1.2px] dark:border-gray-700 rounded-lg h-20">
        {/* Logo */}
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="dark:invert dark:filter" />
          </NavLink>
        </div>

        {/* Navigation */}
        <nav ref={headerRef} className="relative">
          {/* Dark Background Overlay for Mobile */}
          {isNavListOpen && isSmallScreen && (
            <div
              className="z-30 fixed inset-0 bg-black/60 dark:bg-black/80"
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
              className="hidden m-[30px] w-36 subnav_logo"
              src={subnav_logo}
              alt=""
            />
            {navList}
          </ul>
        </nav>

        <div className="nav-group flex justify-between items-center gap-10">
          {/* Theme Toggle */}
          <button
            className={`theme-toggle p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${theme === "light" ? "text-gray-700" : "text-yellow-400"
              }`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"
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
                  className="flex items-center space-x-3 hover:scale-[0.9] transition-ease-in duration-200 cursor-pointer"
                  onClick={() => setShowAboutUser((prev) => !prev)}
                >
                  <span className="inline-block bg-blue-500 p-3 rounded-full font-bold text-white text-lg">
                    {currentUser?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>

                {/* User Dropdown Menu */}
               <UserDropdown confirmlogout={confirmlogout} currentUser={currentUser} handleLogout={handleLogout} setConfirmLogout={setConfirmLogout} showAboutUser={showAboutUser}  />
              </>
            ) : (
              <Link
                to="/login"
                className="relative text-gray-700 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-300 log-sign"
              >
                <i className="mr-2 fa fa-sign-in"></i> Sign in
              </Link>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="toggle">
            <button
              onClick={() => setIsNavListOpen(!isNavListOpen)}
              className="text-gray-700 dark:text-gray-300 text-3xl"
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
