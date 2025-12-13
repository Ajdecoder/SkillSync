import React, { useState, useEffect } from "react";
import { blogPosts } from "../data/blogsData";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../common/loadingSpinner/spinner";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [spin, setSpin] = useState(true);

  const postsPerPage = 6;
  const navigate = useNavigate();
  const startIndex = currentPage * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpin(false);
    }
    , 1000);

    return () => clearTimeout(timer);
  }
  , []);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (endIndex < blogPosts.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBlogClick = (data) => {
    console.log(data)
    navigate(`/blog/${data.title.replace(/\s+/g, '-').toLowerCase()}` , { state: { blogData: data } });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {spin ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="container mx-auto px-4 py-12">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((data) => (
                <div
                  key={data.id}
                  onClick={() => handleBlogClick(data)}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={data.image}
                      alt={data.title}
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {data.title}
                    </h2>

                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center mr-4">
                        <FaUser className="mr-1 text-blue-500" />
                        <span>{data.author}</span>
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1 text-blue-500" />
                        <span>{data.date}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {data.excerpt.slice(0, 100)}...
                    </p>

                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      Read more
                      <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-12">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors ${currentPage === 0
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                  }`}
              >
                <FaArrowLeft />
              </button>

              <span className="mx-4 text-gray-700 dark:text-gray-300 font-medium">
                Page {currentPage + 1} of{" "}
                {Math.ceil(blogPosts.length / postsPerPage)}
              </span>

              <button
                onClick={handleNext}
                disabled={endIndex >= blogPosts.length}
                className={`flex items-center justify-center w-12 h-12 rounded-full ml-4 transition-colors ${endIndex >= blogPosts.length
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                  }`}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
