import React from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import PlatformData from "./components/PlatformData";
import './App.css'

const App = () => {
  return (  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/platformData" element={<PlatformData />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
};    

export default App;
