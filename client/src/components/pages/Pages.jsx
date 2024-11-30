import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import { BlogPage } from "../blog/BlogPage.jsx";
import { Settings } from "../setttings/Setting.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, [pathname]); // Trigger when the route changes

  return null;
};

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
    { path: "/signup/recruiter", component: <RegRecruiter /> },
    { path: "/signup/candidate", component: <RegCandidate /> },
    { path: "/blog/:Blogid", component: <BlogPage /> },
    { path: "/profile/settings", component: <Settings /> },
  ];

  useEffect(() => {
    Aos.init({
      offset: 30,
      duration: 100,
      easing: "ease-in-out",
      delay: 100,
      once: true,
    });

    const handleScroll = () => Aos.refresh();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AuthProvider>
      <Auth0Provider
        domain="dev-yog8yr68bfvtwp3g.us.auth0.com"
        clientId="0VfXemgsJftbilQdQh0so9swXkKaHzTB"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <HireFormProvider>
          <Router>
            <ScrollToTop />
            <Header ref={ref} />
            <Routes>
              {routes.map(({ path, component }, index) => (
                <Route key={index} path={path} element={component} />
              ))}
            </Routes>
            <Footer />
          </Router>
        </HireFormProvider>
      </Auth0Provider>
    </AuthProvider>
  );
};

export default Pages;
