import React, { useState, useEffect, useCallback } from "react";
import "./header.css";
import { nav, navExpand } from "../../data/Data";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "/images/logo.png?url";
import { Loading } from "../../loading/Loading";

const Header = ({ ref }) => {
  const { loggedInUser, logout, loading, setLoading } = useAuth();
  const [isNavListOpen, setIsNavListOpen] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      
      if (window.innerWidth > 768) {
        setIsNavListOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      setShowAboutUser(false);
    }
  }, [loggedInUser]);

  const handleMouseClick = (event) => {
    event.stopPropagation();

    setShowAboutUser((prev) => !prev);
  };

  const handleRequirementClick = useCallback((event) => {
    event.stopPropagation();
    setShowExpand((prev) => !prev);
  }, []);

  const handleNavClick = useCallback((itemText) => {
    setActiveTab(itemText);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <header>
      <div className="flex top-header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav className="nav">
          <ul className={isNavListOpen ? "small overflow-scroll" : "flex"}>
            {nav.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`reqli text-slate-500 ${
                    activeTab === item.text ? "active" : ""
                  }`}
                  onClick={(event) => {
                    handleNavClick(item.text);
                    if (item.text === "Requirement") {
                      handleRequirementClick(event);
                    }
                  }}
                >
                  {item.text}
                </Link>
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
                              <NavLink to={subItem.path}>
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
        <div className="button">
          {loggedInUser ? (
            <>
              <h6
                className="hover:cursor-pointer relative"
                onClick={handleMouseClick}
              >
                <span className=" inline-block bg-blue-500 text-white rounded-full p-3 text-lg font-bold">
                  {loggedInUser.name?.toUpperCase()[0]}
                </span>
                {showAboutUser && (
                  <div className="absolute top-10 right-0 bg-white border border-gray-300 shadow-md p-4 min-w-[200px] z-10 rounded-lg opacity-100">
                    <p className="text-sm text-gray-700 mb-2">
                      Name: {loggedInUser.name}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      Email: {loggedInUser.email}
                    </p>
                    <div>
                      <button
                        onClick={logout}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                      >
                        <i className="fa fa-sign-out mr-2"></i> Logout
                      </button>
                    </div>
                  </div>
                )}
              </h6>
            </>
          ) : (
            <>
              <Link to="/login" className="log-sign">
                <i className="fa fa-sign-in"></i> Sign in
              </Link>
            </>
          )}
        </div>
        <div className="toggle">
          <button onClick={() => setIsNavListOpen(!isNavListOpen)}>
            {isNavListOpen ? (
              <i className="fa fa-times"></i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
