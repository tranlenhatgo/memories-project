import { Container } from "@material-ui/core";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; //set up routing for multiple pages website

import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";

//main part of frontend
const App = () => {
  
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />

        {/* below part will change based on the route */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;