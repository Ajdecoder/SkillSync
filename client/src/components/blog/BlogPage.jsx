import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { blogPosts } from "../data/blogsData";

export const BlogPage = () => {
  const [blog, setBlog] = useState(null); // Initially null for loading state
  const { Blogid } = useParams();

  const getBlog = (id) => {
    const foundBlog = blogPosts.find((blog) => blog.id === id);
    setBlog(foundBlog);
  };

  useEffect(() => {
    if (Blogid) {
      getBlog(Blogid);
    }
  }, [Blogid]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-xl">
      {/* Blog Image */}
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
        />
        <div className="absolute bottom-6 left-6 text-white font-bold text-3xl bg-black bg-opacity-50 p-4 rounded-lg">
          {blog.title}
        </div>
      </div>

      {/* Blog Content */}
      <div className="mt-8">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <p className="font-medium">By {blog.author}</p>
          <p className="font-medium">{blog.date}</p>
        </div>
        <div className="mt-4 text-gray-700 text-lg leading-relaxed">
          <p>{blog.excerpt}</p>
        </div>

        {/* Blog Full Content */}
        <div className="mt-6 text-gray-800">
          <p className="text-xl">{blog.content}</p>
        </div>
      </div>

      {/* Back to Blog List Button */}
      <div className="mt-8 text-center">
        <Link
          to="/blogs"
          className="inline-block px-8 py-3 mt-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:bg-gradient-to-br transition-all"
        >
          Back to Blog List
          <i className="fa-solid fa-angles-right ml-4" />
        </Link>
      </div>
    </div>
  );
};
