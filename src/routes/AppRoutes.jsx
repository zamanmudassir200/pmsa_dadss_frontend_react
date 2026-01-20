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
            <Navbar />
            <DashboardLayout />
          </>
        }
      >
        {generateRoutes(sidebarLinks, pagesMap)}
      </Route>
      {/* <Route index element={<Home />} />
        <Route path="user" element={<User />} />
        <Route path="usergroups" element={<UserGroups />} />
        <Route path="platformData" element={<PlatformData />} />
        <Route path="jettyData" element={<JettyData />} />
        <Route path="general_report" element={<SITREPByShip />} />
        <Route path="mission_report" element={<SITREPByAircraft />} />
        <Route path="fishing_vessel" element={<FishingSpecialReport />} />
        <Route path="merchant_vessel" element={<MerchantSpecialReport />} />
        <Route path="intel" element={<MerchantSpecialReport />} />
      </Route> */}
    </Routes>
  );
};

export default AppRoutes;
