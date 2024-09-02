import React from "react";
import { blogPosts } from "../data/blogsData";
import '../blog/blog.css';

const Blog = () => {
  return (
    <div className="blog-out">
      {blogPosts.map((data, index) => (
        <div key={index} className="blog-post">
          <h1>{data.title}</h1>
          <h3>By {data.author}</h3>
          <p>{data.date}</p>
          <img src={data.image} alt={data.title} />
          <p>{data.excerpt}</p>
          <div className="blog-content">
            <p>{data.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
