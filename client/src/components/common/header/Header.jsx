import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import {
  nav,
  navExpandCAndidate,
  navExpandRecruiter,
} from "../..//common/constants";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "/images/logo.png?url";
import clsx from "clsx";
import "./notifications.css";
import NotificationButton from "./Notification";
import { FaMoon, FaRegMoon, FaRegUser, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { loggedInUser, logout: customLogout, googleUser } = useAuth();
  const { toggleTheme, theme } = useTheme(); // Assuming toggleTheme and theme are provided by AuthContext
  const navigate = useNavigate();
  // State management
  const [isNavListOpen, setIsNavListOpen] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [navExpand, setExpandNav] = useState([]);
  const location = useLocation();
  const dropdownRef = useRef(null); // Ref for googleUser dropdown
  const dropdownExpandRef = useRef(null); // Ref for Requirement dropdown
  const headerRef = useRef(null); // Ref for header

  // Determine current googleUser
  const currentUser = loggedInUser || googleUser;

  // console.log("Auth0currentUser",googleUser)
  // console.log("CustomAuth",loggedInUser)

  // Set navigation based on googleUser role
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

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsNavListOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle logout
  const handleLogout = () => {
    if (currentUser) {
      customLogout();
      localStorage.removeItem("googleUser");
      navigate("/");
    }
  };

  // Close dropdowns when clicking outside
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

  // Render navigation items
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
          clsx("reqli text-slate-500", {
            active: isActive && !location.pathname.includes("requirement"),
          })
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
          <ul className="dropdown">
            {navExpand.map((subItem, subIndex) => (
              <li key={subIndex}>
                <NavLink
                  to={subItem.path}
                  className={({ isActive }) =>
                    clsx("inline-block w-full px-2 py-1", isActive && "active")
                  }
                >
                  <span className="inline-block align-middle mr-2">
                    {!isNavListOpen && subItem.icon}
                  </span>
                  <span className="inline-block align-middle">
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
    <header>
      <div className="flex top-header relative  dark:bg-gray-800 ">
        {/* Logo */}
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>

        {/* Navigation */}
        <nav ref={headerRef} className="nav">
          <ul
            className={clsx(
              isNavListOpen ? "small overflow-scroll z-40" : "flex"
            )}
          >
            {navList}
          </ul>
        </nav>

        <div className="flex items-center justify-between gap-10">
          <button
            className={`theme-toggle bg-${
              theme === "light" ? "white" : "black"
            }`}
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? (
              <FaRegMoon size={21} />
            ) : (
              <FaSun size={21} color="fb8500" />
            )}
          </button>

          {currentUser && <NotificationButton />}

          {/* google_User Section */}
          <div ref={dropdownRef} className="button">
            {currentUser ? (
              <>
                <div
                  className="flex items-center space-x-3 cursor-pointer hover:scale-[0.9] transition-ease-in duration-200 "
                  onClick={() => setShowAboutUser((prev) => !prev)}
                >
                  <span className="inline-block bg-blue-500 text-white rounded-full p-3 text-lg font-bold">
                    {currentUser?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>

                {/* Dropdown Menu */}
                {showAboutUser && (
                  <div className="flex flex-col absolute top-16 right-0 bg-white border border-gray-300 shadow-md p-4 min-w-[200px] rounded-lg transition-all duration-300 ease-in-out z-[999]">
                    <Link
                      to="/profile/userProfile"
                      className="text-center text-2xl"
                    >
                      <i className="fa-solid fa-googleUser">
                        <FaRegUser />
                      </i>
                    </Link>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Name:</strong>{" "}
                      {currentUser?.name || "google_User"}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Email:</strong> {currentUser?.email || "N/A"}
                    </p>
                    <div className="flex flex-col p-2 gap-3">
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                      >
                        <i className="fa fa-sign-out mr-2"></i> Logout
                      </button>

                      <Link to="/profile/settings" className="text-center">
                        Settings
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="log-sign relative">
                <i className="fa fa-sign-in"></i> Sign in
              </Link>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <div className="toggle">
          <button
            onClick={() => setIsNavListOpen(!isNavListOpen)}
            className="text-3xl"
          >
            <i className={isNavListOpen ? "fa fa-times" : "fa fa-bars"}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
