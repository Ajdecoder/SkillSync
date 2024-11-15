import React, { useState, useEffect, useCallback } from "react";
import "./header.css";
import { nav, navExpand } from "../../data/Data";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import logo from "/images/logo.png?url";
import { Loading } from "../../loading/Loading";

const Header = () => {
  const { loggedInUser, logout, loading } = useAuth();
  const [isNavListOpen, setIsNavListOpen] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      // Reset the nav list state when switching to a larger screen
      if (window.innerWidth > 768) {
        setIsNavListOpen(false);
      }
    };
  
    window.addEventListener("resize", handleResize);
    handleResize(); // call it once on component mount to set the initial state
  
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
                  className={`reqli text-slate-500 ${activeTab === item.text ? "active" : ""}`}
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
                      className={`exp-icon fa-solid ${showExpand ? "fa-chevron-up" : "fa-chevron-down"}`}
                      onClick={handleRequirementClick}
                      aria-expanded={showExpand}
                    />
                    {showExpand && (
                      <div className="dropdown-expand">
                        <ul className={isSmallScreen ? "" : "dropdown"}>
                          {navExpand.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <NavLink to={subItem.path}>{subItem.text}</NavLink>
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
              <h6 className="profile-icon">
                <span className="profile-icon-details" onClick={handleMouseClick}>
                  {loggedInUser.name?.toUpperCase()[0]}
                </span>
                {showAboutUser && (
                  <div className="about-user">
                    <p>Name: {loggedInUser.name}</p>
                    <p>Email: {loggedInUser.email}</p>
                    <div>
                      <button onClick={logout} className="log-sign hover:bg-red-600 duration-500">
                        <i className="fa fa-sign-out"></i> Logout
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
            {isNavListOpen ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
