import React, { useState, useEffect } from "react";
import "./header.css";
import { nav, navExpand } from "../../data/Data";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "/images/logo.png?url";
import { Loading } from "../../loading/Loading";

const Header = () => {
  const { loggedInUser, logout, loading } = useAuth();
  const [isNavListOpen, setIsNavListOpen] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const location = useLocation();
    
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsNavListOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    if (!loggedInUser) setShowAboutUser(false);
  }, [loggedInUser]);
  
  const handleRequirementClick = (event) => {
    event.preventDefault();
    setShowExpand((prev) => !prev);
  };

  const isRequirementActive = location.pathname.includes("requirement");

  if (loading) return <Loading />;

  return (
    <header>
      <div className="flex top-header">
        {/* Logo Section */}
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
                  onClick={(event) => {
                    if (item.text === "Requirement") handleRequirementClick(event);
                  }}
                >
                  {item.text}
                </NavLink>    

                {/* "Requirement" Dropdown */}
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
                                  isActive ? "active" : "" // Active class on child links
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
          {loggedInUser ? (
            <>
              <div
                className="flex items-center space-x-3 cursor-pointer hover:scale-[0.9] transition-ease-in duration-200 relative"
                onClick={() => setShowAboutUser((prev) => !prev)}
              >
                <span className="inline-block bg-blue-500 text-white rounded-full p-3 text-lg font-bold">
                  {loggedInUser.name?.toUpperCase()[0]}
                </span>
              </div>

              {/* User Dropdown */}
              <div
                className={`absolute top-16 right-0 bg-white border border-gray-300 shadow-md p-4 min-w-[200px] z-10 rounded-lg transition-all duration-300 ease-in-out transform ${
                  showAboutUser ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                }`}
              >
                {showAboutUser && (
                  <>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Name:</strong> {loggedInUser.name}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Email:</strong> {loggedInUser.email}
                    </p>
                    <div className="flex flex-col p-2 gap-3">
                      <button
                        onClick={logout}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                      >
                        <i className="fa fa-sign-out mr-2"></i> Logout
                      </button>
                      <button>
                        <Link to={'profile/settings'} >settings</Link>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="log-sign">
              <i className="fa fa-sign-in"></i> Sign in
            </Link>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
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
