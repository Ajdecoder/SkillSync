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
    const timer = setTimeout(() => {
      hideLoading();
    }, 2000);
  
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <>
      {isLoading ? (
        <LoginLoading />
      ) : (
        <Pages />
      )}
    </>
  );
}

export default App;
