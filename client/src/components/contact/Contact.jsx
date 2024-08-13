import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <>
      <section className="contact">
        <h1>Get Helps & Friendly Support</h1>
          <form
            className="shadow"
            action="mailto:anujshrivastav530@gmail.com"
            method="GET"
          >
            <h1>Fillup The Form</h1> <br />
            <div>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Email" />
            </div>
            <input type="text" placeholder="Subject" />
            <textarea cols="30" rows="10"></textarea>
            <button>Submit Request</button>
          </form>
      </section>
    </>
  );
};

export default Contact;
