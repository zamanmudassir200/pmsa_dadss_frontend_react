import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import PlatformData from "@/pages/PlatformData";
import DashboardLayout from "@/pages/DashboardLayout";
import Navbar from "@/components/Navbar/Navbar";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <DashboardLayout />
          </>
        }
      >
        <Route index element={<Home />} />
        <Route path="platformData" element={<PlatformData />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
