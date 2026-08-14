import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { footer } from "../../common/constants";
import "./footer.css";

const Footer = () => {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentFooter = footerRef.current;

    if (!currentFooter) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(currentFooter);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`border-t border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200 ${
        isVisible ? "footer-visible" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <section className="footer-section py-12 sm:py-16">
          <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white px-5 py-10 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:px-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Do You Need Help With Anything?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base">
              Receive updates, hot deals, tutorials, and discounts sent
              straight to your inbox every month.
            </p>

            <form
              className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>

              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email address"
                className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              />

              <button
                type="submit"
                className="shrink-0 rounded-xl bg-green-500 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* Main Footer */}
        <section className="footer-section border-t border-gray-200 py-12 dark:border-gray-800 sm:py-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
            {/* Logo and Brand Information */}
            <div className="max-w-sm">
              <Link to="/" className="inline-block">
                <img
                  src="/images/logo.png"
                  alt="Company logo"
                  className="h-14 w-auto max-w-[200px] object-contain"
                />
              </Link>

              <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-400">
                Connecting talented professionals with trusted companies and
                helping people discover better career opportunities.
              </p>

              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Need assistance?
                </p>

                <a
                  href="mailto:support@example.com"
                  className="mt-2 inline-block text-sm text-green-600 transition hover:text-green-700 hover:underline dark:text-green-400 dark:hover:text-green-300"
                >
                  support@example.com
                </a>
              </div>
            </div>

            {/* Footer Link Columns */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 xl:grid-cols-3">
              {footer.map((section, index) => (
                <div key={section.title || index} className="min-w-0">
                  <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                    {section.title}
                  </h3>

                  <ul className="space-y-3">
                    {section.text.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={item.url}
                          className="inline-block text-sm leading-6 text-gray-600 transition-colors hover:translate-x-1 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                        >
                          {item.list}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Section */}
        <div className="border-t border-gray-200 py-6 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:text-left">
            <p>
              © {new Date().getFullYear()} All rights reserved.
            </p>

            <p>
              Designed by{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Ajdecoder
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;