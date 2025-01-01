import "./App.css";
import Pages from "./components/pages/Pages";
import "./components/breakpoints/mobile.css";
import "./components/breakpoints/tablet.css";
import { useEffect } from "react";
import { LoginLoading } from "./components/Login/LoginLoading";
import { useScreenLoadingContext } from "./components/context/LoadingContext";

function App() {
  const { isLoading, showLoading, hideLoading } = useScreenLoadingContext();

  useEffect(() => {
    showLoading();
    hideLoading();
    const timer = setTimeout(() => {
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      {/* Loading Screen or Main Pages */}
      {isLoading ? <LoginLoading /> : <Pages />}
    </>
  );
}

export default App;
