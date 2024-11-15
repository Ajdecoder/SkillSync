import React from "react";
import { footer } from "../../data/Data";
import "./footer.css";

const Footer = () => {
  return (
    <>
    

      <footer className="bottom-footer" >
        <div className='box'>
          <div className='newsletter'>
            <h2>Do You Need Help With Anything?</h2>
            <p>
              Receive updates, hot deals, tutorials, and discounts sent straight
              to your inbox every month.
            </p>

            <div className='input'>
              <input type='text' placeholder='Email Address' />
              <button className="foot-btn bg-green-500 p-1">Subscribe</button>
            </div>
          </div>
        </div>
        <div className='container'>
          {footer.map((val, index) => (
            <div className='box' key={index}>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li key={items.id}>{items.list}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='legal'>
          <span>© 2024. Designed By Ajdecoder.</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
