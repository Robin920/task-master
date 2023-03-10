import { useState } from "react";

import {
  BrowserRouter as Router, 
  Routes,
  Route,
} from "react-router-dom";


import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import Header from "./layouts/Header"
import Footer from "./layouts/Footer"

import userContext from "./context/userContext";


const App = () => {

  const [user, setUser] = useState(null)

  return(
    <>
      <userContext.Provider value={{user, setUser}}>
        <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
          </Routes>
        <Footer/>
        </Router>
      </userContext.Provider>
    </>
  )
}

export default App;
