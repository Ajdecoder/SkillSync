import React, { useState, useEffect } from "react";
import { blogPosts } from "../data/blogsData";
import "../blog/Blog.css";
// import ".././../tailwind.css";

const Blog = ({ spin, setSpin }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 6;

  const startIndex = currentPage * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  useEffect(() => {
    setSpin(true);
    const timeout = setTimeout(() => {
      setSpin(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentPage, setSpin]);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (endIndex < blogPosts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {spin ? (
        <div className="loading-div"></div>
      ) : (
        <div className="blog-out">
          {currentPosts.map((data) => (
            <div key={data.id} className="blog-post">
              <h1 className="blog-title">{data.title}</h1>
              <h3>By {data.author}</h3>
              <p>{data.date}</p>
              <img src={data.image} alt={data.title} />
              <p>{data.excerpt.slice(0, 100)}...</p>
              <div className="blog-content">
                <p>{data.content.slice(0, 200)}...</p>
              </div>
              <div className="read-more-button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <button>Read More</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination buttons */}
      {!spin && (
        <div className="navigation-btn flex p-7">
          <button
            onClick={handlePrev}
            className={`${
              currentPage === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-gray-600"
            } px-4 py-2 rounded-md font-semibold border border-red-500 transition-all duration-300`}
            disabled={currentPage === 0}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7.293 1.707 1.707 7.293a1 1 0 0 0 0 1.414l5.586 5.586A1 1 0 0 0 9 13.586V2.414a1 1 0 0 0-1.707-.707Z"
              />
            </svg>
          </button>

          <span style={{ margin: "auto" }}>
            {currentPage + 1} of {Math.ceil(blogPosts.length / postsPerPage)}
          </span>

          <button
            onClick={handleNext}
            className={`${
              endIndex >= blogPosts.length
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-green-600"
            } px-4 py-2 rounded-md font-semibold border border-blue-500 transition-all duration-300 ml-4`}
            disabled={endIndex >= blogPosts.length}
          >
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 10 16"
            >
              <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Blog;
