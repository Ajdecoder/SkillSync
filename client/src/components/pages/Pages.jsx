import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import { AuthProvider, useAuth } from "../utils/AuthContext.jsx";
import { Resources } from "../Resources/Resources.jsx";
import Aos from "aos";
import "aos/dist/aos.css"
import Header from "../common/header/Header.jsx";

const Pages = () => {

  useEffect(()=>{
    Aos.init({
      duration:1300,
      once:false,
    })
  },[])

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
  // const { loggedInUser } = useAuth();
  // return loggedInUser ? <Navigate to="/" /> : <Login />;
  return <Login />;
};
const RegisterAuthRoute = () => {
  // const { loggedInUser } = useAuth();
  // return loggedInUser ? <Navigate to="/" /> : <Register />;
  return <Register />;
};

export default Pages;
