import React, { useState } from "react";
import { blogPosts } from "../data/blogsData";
import "../blog/Blog.css";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 6; 

  const startIndex = currentPage * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

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
            <div className="read-more-button">
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
      <div className="navigation-btn">
        <button
          onClick={handlePrev}
          className="prev-btn"
          disabled={currentPage === 0}
        > 
          Prev
        </button>
        <button
          onClick={handleNext}
          className="next-btn"
          disabled={endIndex >= blogPosts.length}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Blog;
