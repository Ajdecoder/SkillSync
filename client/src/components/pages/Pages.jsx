import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "../common/footer/Footer";
import { AuthProvider } from "../context/AuthContext.jsx";
import Aos from "aos";
import "aos/dist/aos.css";
import "../blog/Blog.css";
import { HireFormProvider } from "../context/HireFormContext.jsx";
import Header from "../common/header/Header.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChatBot } from "../chatbot/ChatBot.jsx";
import { AddOpportunityFormProvider } from "../context/AddOpportunityFromContext.jsx";
import { PassRecoveryProvider } from "../context/PassRecoveryContext.jsx";
import { RoutesConfig } from "./PageRoutes.jsx";
import GoToTopButton from "../utils/ScrolltoTop.jsx";
import ScrollProgress from "../utils/ScrollProgress.jsx";
import { LoginLoading } from "../Login/LoginLoading.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

const Pages = () => {
  const [spin, setSpin] = useState(false);
  const [loading, setLoading] = useState(false);  

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

    
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000); 

    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AuthProvider>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri:
            import.meta.env.NODE_ENV === "production"
              ? import.meta.env.VITE_REDIRECT_URI
              : window.location.origin,
        }}
      >
        <HireFormProvider>
          <AddOpportunityFormProvider>
            <PassRecoveryProvider>
              <Router
              future={{
                v7_startTransition: true, 
                v7_relativeSplatPath: true, 
              }}
              >
                <ScrollToTop />
                <ScrollProgress />
                {loading ? (
                  
                  <div className="loading-screen">
                  <LoginLoading />
                  </div>
                ) : (
                  <>
                    {/* Only show Header and Footer after loading */}
                    <Header />
                    <Routes>
                      {RoutesConfig({ spin, setSpin })}
                    </Routes>
                    <GoToTopButton />
                    <ChatBot />
                    <Footer />
                  </>
                )}
              </Router>
            </PassRecoveryProvider>
          </AddOpportunityFormProvider>
        </HireFormProvider>
      </Auth0Provider>
    </AuthProvider>
  );
};

export default Pages;
