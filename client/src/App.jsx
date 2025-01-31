import "./App.css";
import Pages from "./components/pages/Pages";
import "./components/breakpoints/mobile.css";
import "./components/breakpoints/tablet.css";
import { Lenis } from "@studio-freight/react-lenis";

function App() {
  return (
    <>
      <Lenis root  >
        <Pages />
      </Lenis>
    </>
  );
}

export default App;
