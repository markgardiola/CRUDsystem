import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Create from "./pages/Create";
import Read from "./pages/Read";
import Edit from "./pages/Edit";
import About from "./pages/About";
import Booking from "./pages/Booking";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/homepage" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/booking" element={<Booking />}></Route>
            {/* <Route path="/create" element={<Create />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/read/:id" element={<Read />}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
