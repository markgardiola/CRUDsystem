import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Read from "./components/Read";
import Edit from "./components/Edit";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="CRUDsystem/" element={<Home />}></Route>
          <Route path="CRUDsystem/create" element={<Create />}></Route>
          <Route path="CRUDsystem/edit/:id" element={<Edit />}></Route>
          <Route path="CRUDsystem/read/:id" element={<Read />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
