import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Navbar from "@/components/Navbar/Navbar";
import { pagesMap } from "./pagesMap";
import { sidebarLinks } from "@/adapters/sidebar/sidebarLinks";
import generateRoutes from "@/utils/generateRoutes";
import Login from "@/pages/Login";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/"
        element={
          <>
            <Navbar backgroundcolor={""} font={""} textColor={""} />
            <DashboardLayout />
          </>
        }
      >
        {generateRoutes(sidebarLinks, pagesMap)}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
