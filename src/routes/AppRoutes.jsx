import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import PlatformData from "@/pages/PlatformData";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/platformData" element={<PlatformData />} />
    </Routes>
  );
};

export default AppRoutes;
