import { NavLink, Outlet } from "react-router-dom";

import { useStore } from "@/store/store";
import { MdDashboard } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { useEffect, useState } from "react";
import { sidebarLinks } from "@/adapters/sidebar/sidebarLinks";
import { FaChevronDown } from "react-icons/fa";
import Drawer from "./Drawer/Drawer";
import Footer from "./Footer/Footer";

const DashboardLayout = () => {
  const { sidebarOpen, setSidebarOpen } = useStore();
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  return (
    <div className={`flex  `}>
      {/* Sidebar */}
      <Drawer backgroundColor={""} width={"100px"} />
      {/* Right Content */}
      <main
        className={`flex-1 h-screen ${sidebarOpen ? "pl-88" : "pl-20"}  bg-gray-100 overflow-y-auto `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
