import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import { nav, navExpandCAndidate, navExpandRecruiter } from "../../data/Data";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "/images/logo.png?url";
import clsx from "clsx";
import "./notifications.css";
import NotificationButton from "./Notification";

const Header = () => {
  const { loggedInUser, logout: customLogout } = useAuth();
  const { user, isAuthenticated, logout: auth0Logout } = useAuth0();
  const navigate = useNavigate();
  // State management
  const [isNavListOpen, setIsNavListOpen] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [navExpand, setExpandNav] = useState([]);
  const location = useLocation();
  const dropdownRef = useRef(null); // Ref for user dropdown
  const dropdownExpandRef = useRef(null); // Ref for Requirement dropdown
  const headerRef = useRef(null); // Ref for header
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    "New message from recruiter",
    "Your profile has been updated",
    "You have an interview scheduled",
  ]);

  // Determine current user
  const currentUser = loggedInUser || (isAuthenticated && user);

  // console.log("Auth0currentUser",user)
  // console.log("CustomAuth",loggedInUser)

  // Handle notification toggle
  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
  };

  // Set navigation based on user role
  useEffect(() => {
    setExpandNav(
      loggedInUser?.role === "candidate"
        ? navExpandCAndidate
        : navExpandRecruiter
    );
  }, [loggedInUser]);

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
    if (loggedInUser) {
      customLogout();
      navigate("/");
    } else if (isAuthenticated) {
      auth0Logout({ returnTo: window.location.origin });
    }
  };

  // Handle Requirement dropdown toggle
  const handleRequirementClick = (event) => {
    event.preventDefault();
    setShowExpand((prev) => !prev);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAboutUser(false);
      }

      if (
        dropdownExpandRef.current &&
        !dropdownExpandRef.current.contains(event.target)
      ) {
        setShowExpand(false);
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
    <li ref={dropdownExpandRef} key={index} className="nav-item">
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          clsx("reqli text-slate-500", {
            active: isActive && !location.pathname.includes("requirement"),
          })
        }
        onClick={(event) =>
          item.text === "Requirement" && handleRequirementClick(event)
        }
      >
        {item.text}
      </NavLink>
      {item.text === "Requirement" && showExpand && (
        <div ref={dropdownExpandRef} className="dropdown-expand">
          <ul className={clsx({ dropdown: !isSmallScreen })}>
            {navExpand.map((subItem, subIndex) => (
              <li key={subIndex}>
                <NavLink
                  to={subItem.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {subItem.text}
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
      <div className="flex top-header relative top-0">
        {/* Logo */}
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>

        {/* Navigation */}
        <nav ref={headerRef} className="nav">
          <ul
            className={clsx(isNavListOpen ? "small overflow-scroll" : "flex")}
          >
            {navList}
          </ul>
        </nav>

        <NotificationButton />

        {/* User Section */}
        <div ref={dropdownRef} className="button mb-[1rem]">
          {currentUser ? (
            <>
              {/* User Avatar */}
              <div
                className="flex items-center space-x-3 cursor-pointer hover:scale-[0.9] transition-ease-in duration-200 relative mt-[-20px]"
                onClick={() => setShowAboutUser((prev) => !prev)}
              >
                <span className="inline-block bg-blue-500 text-white rounded-full p-3 text-lg font-bold">
                  {currentUser?.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>

              {/* Dropdown Menu */}
              {showAboutUser && (
                <div className="flex flex-col absolute top-16 right-0 bg-white border border-gray-300 shadow-md p-4 min-w-[200px] z-10 rounded-lg transition-all duration-300 ease-in-out">
                  <Link
                    to="/profile/userProfile"
                    className="text-center text-2xl"
                  >
                    <i className="fa-solid fa-user"></i>
                  </Link>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Name:</strong> {currentUser?.name || "User"}
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
            <Link to="/login" className="log-sign relative bottom-4">
              <i className="fa fa-sign-in"></i> Sign in
            </Link>
          )}
        </div>

        {/* Toggle Button */}
        <div className="toggle">
          <button onClick={() => setIsNavListOpen(!isNavListOpen)}>
            <i className={isNavListOpen ? "fa fa-times" : "fa fa-bars"}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
