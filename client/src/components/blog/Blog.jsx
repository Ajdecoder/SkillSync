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
        <div className="navigation-btn flex">
          <button
            onClick={handlePrev}
            className={currentPage === 0 ? "prev-btn disabled-btn" : "prev-btn border border-red-500"}
            disabled={currentPage === 0}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className={
              endIndex >= blogPosts.length
                ? "next-btn disabled-btn"
                : "next-btn"
            }
            disabled={endIndex >= blogPosts.length}
          >
            Next
          </button>
          <span style={{ margin: "auto" }} >
            {currentPage + 1} of {Math.ceil(blogPosts.length / postsPerPage)}
          </span>
        </div>
      )}
    </>
  );
};

export default Blog;
