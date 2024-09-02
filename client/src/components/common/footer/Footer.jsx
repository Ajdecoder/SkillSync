import React from "react";
import { footer } from "../../data/Data";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <section className='footerContact'>
        <div className='container'>
          <div className='send flex'>
            <div className='text'>
              <h1>Do You Have Questions?</h1>
              <p>We'll help you to grow your career and growth.</p>
            </div>
            <button className='btn5'>Contact Us Today</button>
          </div>
        </div>
      </section>

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
              <button className="foot-btn">Subscribe</button>
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
