import React, { useState } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn, userDetails }) => {
  const [navList, setNavList] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleMouseClick = () => {
    setShowAboutUser(!showAboutUser); // Toggle about-user div on mouse click
  };

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src="./images/logo.png" alt="Logo" />
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((item, index) => (
                <li key={index}>
                  <Link to={item.path}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="button flex m-4">
            {isLoggedIn ? (
              <>
                <h6 className="profile-icon">
                  {userDetails && userDetails.name ? (
                    <>
                      <span
                        className="profile-icon-details"
                        onClick={handleMouseClick} // Change to onClick
                      >
                        {userDetails.name.toUpperCase()[0]}
                      </span>
                      {showAboutUser && (
                        <div className="about-user">
                          {/* Render user details here */}
                          <p>Name: {userDetails.name}</p>
                          <p>Email: {userDetails.email}</p>
                          <div>
                            <button onClick={handleLogout} className="log-sign">
                              <i className="fa fa-sign-out"></i> Logout
                            </button>
                          </div>
                          {/* Add other user details as needed */}
                        </div>
                      )}
                    </>
                  ) : (
                    <span>Guest</span>
                  )}
                </h6>
              </>
            ) : (
              <>
                <div className="head-btn">
                  <Link to="/login" className="log-sign">
                    <i className="fa fa-sign-in"></i> Sign in
                  </Link>
                  <Link to="/signup" className="log-sign">
                    <i className="fa fa-sign-out"></i> Join now
                  </Link>
                </div>
              </>
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
    </>
  );
};

export default Header;
