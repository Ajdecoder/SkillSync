import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const formId = import.meta.env.VITE_FORM_ID; // Ensure this environment variable is set
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return (
      <section className="bg-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">
            Thank You!
          </h1>
          <p className="text-green-500">Your Response Has Been Recorded 😊</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Get Help & Friendly Support
        </h1>
        <form
          onSubmit={handleSubmit}
          className="shadow-lg p-8 rounded-lg bg-[#111827] flex justify-center"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>
            <input
              name="subject"
              type="text"
              placeholder="Subject"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              cols="30"
              rows="5"
              placeholder="Message"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <button
              type="submit"
              disabled={state.submitting}
              className={`w-full py-2 mt-4 rounded-md text-white ${
                state.submitting
                  ? "bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {state.submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
