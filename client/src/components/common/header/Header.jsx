import React, { useState, useEffect } from "react";
import "./header.css";
import { nav, navExpand } from "../../data/Data";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "/images/logo.png?url";

const Header = () => {
  const { loggedInUser, logout: customLogout } = useAuth();  // Custom JWT auth context
  const { user, isAuthenticated, isLoading, logout: auth0Logout } = useAuth0(); // Auth0
  const [isNavListOpen, setIsNavListOpen] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const location = useLocation();

  // Log the users for debugging
  console.log("OAuth User-->", user);
  console.log("Custom Auth User-->", loggedInUser);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsNavListOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRequirementClick = (event) => {
    event.preventDefault();
    setShowExpand((prev) => !prev);
  };

  const handleLogout = () => {
    // Handle logout based on the authentication method
    if (loggedInUser) {
      customLogout(); // Custom logout for JWT
    } else if (isAuthenticated) {
      auth0Logout({ returnTo: window.location.origin }); // Auth0 logout
    }
  };

  // Determine which user to show (JWT or Auth0)
  const currentUser = loggedInUser || (isAuthenticated && user);

  // Check if we're on a "requirement" page
  const isRequirementActive = location.pathname.includes("requirement");

  return (
    <header>
      <div className="flex top-header">
        {/* Logo */}
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <ul className={isNavListOpen ? "small overflow-scroll" : "flex"}>
            {nav.map((item, index) => (
              <li key={index} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `reqli text-slate-500 ${
                      isActive && !isRequirementActive ? "active" : ""
                    }`
                  }
                  onClick={(event) =>
                    item.text === "Requirement" && handleRequirementClick(event)
                  }
                >
                  {item.text}
                </NavLink>

                {/* Dropdown for "Requirement" */}
                {item.text === "Requirement" && (
                  <>
                    <i
                      className={`exp-icon fa-solid ${
                        showExpand ? "fa-chevron-up" : "fa-chevron-down"
                      }`}
                      onClick={handleRequirementClick}
                      aria-expanded={showExpand}
                    />
                    {showExpand && (
                      <div className="dropdown-expand">
                        <ul className={isSmallScreen ? "" : "dropdown"}>
                          {navExpand.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <NavLink
                                to={subItem.path}
                                className={({ isActive }) =>
                                  isActive ? "active" : ""
                                }
                              >
                                {subItem.text}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="button">
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
                <div className="absolute top-16 right-0 bg-white border border-gray-300 shadow-md p-4 min-w-[200px] z-10 rounded-lg transition-all duration-300 ease-in-out">
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
                    <Link to="profile/settings" className="text-center">
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
