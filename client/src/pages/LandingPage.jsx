import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Search from "./Search";

function Home() {
  return (
    <div className="container-fluid mt-5 p-0 bg-transparent">
      <Carousel />
      <Search />
    </div>
  );
}

export default Home;
