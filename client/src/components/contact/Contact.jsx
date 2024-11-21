import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Get Help & Friendly Support
        </h1>
        <form
          className="shadow-lg p-8 rounded-lg bg-[#111827]"
          action="mailto:anujshrivastav530@gmail.com"
          method="GET"
        >
          <h2 className="text-xl font-semibold text-blue-600 text-center mb-6">
            Fill out the form
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              cols="30"
              rows="5"
              placeholder="Message"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 transition duration-300"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
