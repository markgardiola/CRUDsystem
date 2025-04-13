import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Create from "./components/Create";
import Read from "./components/Read";
import Edit from "./components/Edit";
import About from "./components/About";
import Booking from "./components/Booking";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signIn" element={<SignIn />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/homepage" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/read/:id" element={<Read />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
