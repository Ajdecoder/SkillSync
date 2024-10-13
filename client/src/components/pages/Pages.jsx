import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import HireResources from "../Resources/HireResources";
import PostResources from "../Resources/PostResources";
import { AuthProvider } from "../utils/AuthContext.jsx";
import { Resources } from "../Resources/Resources.jsx";
import Aos from "aos";
import "aos/dist/aos.css";
import "../blog/Blog.css";


const Header = React.lazy(() => import("../common/header/Header.jsx"));
const Blog = React.lazy(() => import("../blog/Blog"));

const Pages = () => {
  useEffect(() => {
    Aos.init({
      duration: 1300,
      once: false,
    });
  }, []);

  const [spin, setSpin] = useState(false); 

  return (
    <AuthProvider>
      <Router>
      <Suspense fallback={<Header/>} >
        <Header />
      </Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route
            path="/blog"
            element={
              <Suspense fallback={<div className="loading-div">Loading...</div>}>
                <Blog spin={spin} setSpin={setSpin} />
              </Suspense>
            }
          />

          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<RegisterAuthRoute />} />
          <Route path="/login" element={<LoginAuthRoute />} />
          <Route path="requirements/" element={<Resources />} />
          <Route path="requirements/hire-talent" element={<HireResources />} />
          <Route
            path="requirements/post-resources"
            element={<PostResources />}
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

const LoginAuthRoute = () => {
  return <Login />;
};

const RegisterAuthRoute = () => {
  return <Register />;
};

export default Pages;
