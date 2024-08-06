import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import HireResources from "../Resources/HireResources";
import PostResources from "../Resources/PostResources";
import { AuthProvider } from "../utils/AuthContext.jsx"

const Pages = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/get-resources" element={<HireResources />} />
          <Route path="/post-resources" element={<PostResources />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default Pages;