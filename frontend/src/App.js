import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import { AuthProvider } from "./context/Auth.jsx";
import Navbar from "./components/Navbar.jsx"

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <AuthProvider>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
