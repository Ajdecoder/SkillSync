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
import { RegCandidate } from "../Register/RegCandidate.jsx";
import { RegRecruiter } from "../Register/RegRecruiter.jsx";
import Header from "../common/header/Header.jsx";
import Blog from "../blog/Blog.jsx";
import { BlogPage } from "../blog/BlogPage.jsx";
import { Settings } from "../setttings/Setting.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChatBot } from "../chatbot/ChatBot.jsx";
import {  SavedSearches } from "../Resources/SavedSearch.jsx";
import { SavedOpportunity } from "../Resources/SavedOpportunity.jsx";
import { MarketTrends } from "../Resources/MarketTrends.jsx";
import { BookmarkTalent } from "../Resources/BookMarkTalent.jsx";
import { AddOpportunityFormProvider } from "../context/AddOpportunityFromContext.jsx";
import TalentConnectPage from "../ConnectPage/HiringConnectPage.jsx";
import OpportunityConnectPage from "../ConnectPage/OpportunityConnectPage.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, [pathname]);

  return null;
};

const Pages = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [spin, setSpin] = useState(false);

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
    { path: "/requirements/saved-searches", component: <SavedSearches /> },
    { path: "/requirements/saved-opportunities", component: <SavedOpportunity /> },
    { path: "/requirements/bookmark-talent", component: <BookmarkTalent /> },
    { path: "/requirements/market-trends", component: <MarketTrends /> },
    { path: "talent/connect/:post_id", component: <TalentConnectPage /> },
    { path: "opportunity/connect/:post_id", component: <OpportunityConnectPage /> },
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
          <AddOpportunityFormProvider>
          <Router>
            <ScrollToTop />
            <Header />
            <Routes>
              {routes.map(({ path, component }, index) => (
                <Route key={index} path={path} element={component} />
              ))}
            </Routes>
         {!isChatOpen &&   <button
              onClick={() => setChatOpen(!isChatOpen)}
              style={{
                position: "fixed",
                bottom: "3rem",
                right: "20px",
                zIndex: 1000,
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
              className="animate-pulse"
            >
              💬
            </button>}
            {isChatOpen && (
              <div className="w-[22rem]">
                <ChatBot />
              </div>
            )}
            <Footer />
          </Router>
          </AddOpportunityFormProvider>
        </HireFormProvider>
      </Auth0Provider>
    </AuthProvider>
  );
};

export default Pages;
