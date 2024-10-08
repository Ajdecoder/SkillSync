import React, { useState, useEffect } from "react";
import "./header.css";
import { nav, navExpand } from "../../data/Data";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import logo from '/images/logo.png?url'
import { Loading } from "../../loading/Loading";

const Header = () => {
  const { loggedInUser, logout,loading } = useAuth();
  const [navList, setNavList] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseClick = () => {
    setShowAboutUser(!showAboutUser);
  };

  const handleRequirementClick = (event) => {
    setShowExpand(prev => !prev);
  };

  const handleNavClick = (itemText) => {
    setActiveTab(itemText); 
  };


  // if(!loading){
  //   return 'loading...'
  // }

  return (
    <header>
      <div className="flex top-header">
        <div className="logo">
          <Link to="/">
            <img src={logo}alt="Logo" />
          </Link>
        </div>
        <div className="nav">
          <ul className={navList ? "small" : "flex"}>
            {nav.map((item, index) => (
              <li key={index}>
                <div
                  className="reqli-container"
                  onClick={() => {
                    handleNavClick(item.text);
                    if (item.text === "Requirement") handleRequirementClick();
                  }}
                >
                  <Link
                    to={item.path}
                    className={`reqli ${activeTab === item.text ? "active" : ""}`} 
                  >
                    {item.text}
                  </Link>
                  {item.text === "Requirement" && (
                    <i 
                      className={`exp-icon fa-solid ${showExpand ? "fa-chevron-up" : "fa-chevron-down"}`}
                      onClick={(event) => {
                        handleRequirementClick(event);
                      }}
                    />
                  )}
                </div>
                {item.text === "Requirement" && showExpand && (
                  <div className="dropdown-expand">
                    <ul className={isSmallScreen ? "" : "dropdown"}>
                      {navExpand.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subItem.path}>{subItem.text}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="button">
          {loggedInUser ? (
            <>
              <h6 className="profile-icon">
                <span
                  className="profile-icon-details"
                  onClick={handleMouseClick}
                >
                  {loggedInUser.name.toUpperCase()[0]}
                </span>
                {showAboutUser && (
                  <div className="about-user">
                    <p>Name: {loggedInUser.name}</p>
                    <p>Email: {loggedInUser.email}</p>
                    <div>
                      <button onClick={logout} className="log-sign">
                        <i className="fa fa-sign-out"></i> Logout
                      </button>
                    </div>
                  </div>
                )}
              </h6>
            </>
          ) : (
            <Link to="/login" className="log-sign">
              <i className="fa fa-sign-in"></i> Sign in
            </Link>
          )}
        </div>
        <div className="toggle">
          <button onClick={() => setNavList(!navList)}>
            {navList ? (
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
