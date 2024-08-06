import React, { useState } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const Header = () => {
  const { loggedInUser, logout } = useAuth();
  const [navList, setNavList] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);

  const handleMouseClick = () => {
    setShowAboutUser(!showAboutUser); 
  };

  return (
    <header>
      <div className="container flex">
        <div className="logo">
          <Link to="/">
            <img src="./images/logo.png" alt="Logo" />
          </Link>
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
            <div className="head-btn">
              <Link to="/login" className="log-sign">
                <i className="fa fa-sign-in"></i> Sign in
              </Link>
              <Link to="/signup" className="log-sign">
                <i className="fa fa-sign-out"></i> Join now
              </Link>
            </div>
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