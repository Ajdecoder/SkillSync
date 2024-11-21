import React, { Suspense, useEffect, useRef, useState } from "react";
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
import AddOpportunity from "../Resources/AddOpportunity.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { Resources } from "../Resources/Resources.jsx";
import Aos from "aos";
import "aos/dist/aos.css";
import "../blog/Blog.css";
import { HireFormProvider } from "../context/HireFormContext.jsx";
import ConnectPage from "../ConnectPage/ConnectPage.jsx";
import { RegCandidate } from "../Register/RegCandidate.jsx";
import { RegRecruiter } from "../Register/RegRecruiter.jsx";
import Header from "../common/header/Header.jsx";
import Blog from "../blog/Blog.jsx";

const Pages = () => {
  const [spin, setSpin] = useState(false);
  const { ref } = useRef();

  const routes = [
    { path: "/", component: <Home /> },
    { path: "/about", component: <About /> },
    { path: "/services", component: <Services /> },
    { path: "/blog", component: <Blog spin={spin} setSpin={setSpin} /> },
    { path: "/pricing", component: <Pricing /> },
    { path: "/contact", component: <Contact /> },
    { path: "/login", component: <Login /> },
    { path: "/requirements", component: <Resources /> },
    { path: "/requirements/hire-talent", component: <HireResources /> },
    { path: "/requirements/add-opportunity", component: <AddOpportunity /> },
    { path: "/connect/:post_id", component: <ConnectPage /> },
    { path: "/signup", component: <Register /> },
    { path: "/signup/recruiter", component: <RegCandidate /> },
    { path: "/signup/candidate", component: <RegRecruiter /> },
  ];

  useEffect(() => {
    Aos.init({
      offset: 120, // Offset to start animations sooner (120px from the viewport)
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Smooth animation
      delay: 100, // Delay between animations (optional)
      once: false, // Whether animation should happen only once
      mirror: true, 
    });
  }, []);

  return (
    <AuthProvider>
      <HireFormProvider>
        <Router>
            <Header ref={ref} />
          <Routes>
            {routes.map(({ path, component }, index) => (
              <Route key={index} path={path} element={component} />
            ))}
          </Routes>
          <Footer />
        </Router>
      </HireFormProvider>
    </AuthProvider>
  );
};

export default Pages;
