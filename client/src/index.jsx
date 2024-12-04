import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./App.css"
import { ScreenLoadingProvider } from "./components/context/LoadingContext"


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
  <ScreenLoadingProvider>
    <App />
  </ScreenLoadingProvider>
</React.StrictMode>
)
