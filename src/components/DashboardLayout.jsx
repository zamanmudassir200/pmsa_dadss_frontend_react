import { Outlet } from "react-router-dom";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import Drawer from "./Drawer/Drawer";

const DashboardLayout = () => {
  const { sidebarOpen, setSidebarOpen } = useStore();

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

  return (
    <div className={`flex`}>
      {/* Sidebar */}
      <Drawer
        backgroundColor={""}
        width={"w-[350px]"}
        collapsedWidth={"w-20"}
        textColor={""}
      />
      {/* Right Content */}
      <main className={`flex-1 h-screen bg-gray-100 overflow-y-auto `}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
