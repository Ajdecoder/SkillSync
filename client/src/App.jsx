import "./App.css";
import Pages from "./components/pages/Pages";
import "./components/breakpoints/mobile.css";
import "./components/breakpoints/tablet.css";
import { useTheme } from "./components/context/ThemeContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <ToastContainer
      />
      <Pages />
    </div>
  );
}

export default App;
