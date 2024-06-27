import "./App.css"
import AuthProvider from "./components/context/authContext.provider"
import Pages from "./components/pages/Pages"


function App() {


  return (
    <>
    <AuthProvider>
      <Pages />
    </AuthProvider>
    </>
  )
}

export default App
