import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import {
  nav,
  navExpandCAndidate,
  navExpandRecruiter,
} from "../../common/constants";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "/images/logo.png";
import subnav_logo from "/images/subnav_logo.png";
import clsx from "clsx";
import "./notifications.css";
import NotificationButton from "./Notification";
import { FaRegMoon, FaSun, FaUser } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import UserDropdown from "./UserDropdown";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Header = () => {
  const { loggedInUser, logout: customLogout, googleUser } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();

  const [isNavListOpen, setIsNavListOpen] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);
  const [navExpand, setExpandNav] = useState([]);
  const [confirmlogout, setConfirmLogout] = useState(false);

  const dropdownRef = useRef(null);

  const currentUser = loggedInUser || googleUser;

  useEffect(() => {
    if (currentUser) {
      setExpandNav(
        currentUser?.role === "candidate" ? navExpandCAndidate : navExpandRecruiter
      );
    } else {
      setExpandNav([
        { text: "Talent Search", path: "requirements/hire-talent" },
        { text: "Opportunities", path: "requirements/browse-opportunities" },
        { text: "My Job Listings", path: "requirements/listed-opportunity" },
        { text: "Resume Builder", path: "requirements/resume-builder" },
      ]);
    }
  }, [currentUser]);

  const handleLogout = () => {
    customLogout();
    localStorage.removeItem("authToken");
    setConfirmLogout(false);
    setShowAboutUser(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAboutUser(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 mt-1 mb-1 border dark:border-gray-700 rounded-xl">
      <div className="relative flex items-center justify-between h-16 sm:h-18 lg:h-20 px-3 sm:px-5 lg:px-6 bg-white dark:bg-gray-900 rounded-xl">
        {/* Logo */}
        <div className="logo hidden lg:block">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="dark:invert dark:filter" />
          </NavLink>
        </div>

        {/* Desktop nav */}
        <DesktopNav nav={nav} navExpand={navExpand} />

        {/* Mobile nav (slide-in panel) */}
        <MobileNav
          isOpen={isNavListOpen}
          onClose={() => setIsNavListOpen(false)}
          nav={nav}
          navExpand={navExpand}
          subnavLogo={subnav_logo}
        />

        <div className="nav-group flex items-center gap-6">
          {currentUser && <NotificationButton />}

          {/* User section */}
          <div ref={dropdownRef} className="button relative">
            {currentUser ? (
              <>
                <div
                  className="flex items-center space-x-3 hover:scale-[0.9] transition-transform duration-200 cursor-pointer"
                  onClick={() => setShowAboutUser((prev) => !prev)}
                >
                  <span className="inline-flex items-center justify-center bg-blue-500 h-11 w-11 rounded-full font-bold text-white text-lg">
                    {currentUser?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>

                <UserDropdown
                  confirmlogout={confirmlogout}
                  currentUser={currentUser}
                  handleLogout={handleLogout}
                  setConfirmLogout={setConfirmLogout}
                  showAboutUser={showAboutUser}
                />
              </>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Sign In */}
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <i className="fa fa-sign-in text-sm"></i>
                  <span className="hidden xs:inline sm:inline">Sign In</span>
                </Link>

                {/* Sign Up */}
                <Link
                  to="/signup"
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <i className="fa fa-user-plus text-sm"></i>
                  <span className="hidden xs:inline sm:inline">Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            className={clsx(
              "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
              theme === "light" ? "text-gray-700" : "text-yellow-400"
            )}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <FaRegMoon size={21} /> : <FaSun size={21} />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsNavListOpen(true)}
            className="text-gray-700 dark:text-gray-300 text-3xl md:hidden"
            aria-label="Open menu"
          >
            <i className="fa fa-bars" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;