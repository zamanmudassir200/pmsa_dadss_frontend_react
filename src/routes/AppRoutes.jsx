import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import PlatformData from "@/pages/PlatformData";
import DashboardLayout from "@/pages/DashboardLayout";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="platformData" element={<PlatformData />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
