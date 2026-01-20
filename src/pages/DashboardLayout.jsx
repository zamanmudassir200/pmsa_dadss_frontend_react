import { NavLink, Outlet } from "react-router-dom";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { useStore } from "@/store/store";
import { MdDashboard } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { useEffect, useState } from "react";
import { sidebarLinks } from "@/adapters/sidebar/sidebarLinks";
import { FaChevronDown } from "react-icons/fa";

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
      <aside
        className={`bg-gray-300 p-4 fixed h-screen  transition-all duration-300
        ${sidebarOpen ? "w-84" : "w-16"}`}
      >
        <div className="flex mb-6 items-center justify-between">
          {sidebarOpen && (
            <h2 className="text-xl font-bold flex items-center gap-2 select-none">
              DADSS
            </h2>
          )}
          <div
            className="cursor-pointer hover:bg-gray-400 select-none rounded-lg transition-all duration-200 p-1"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <GoSidebarExpand size={22} />
            ) : (
              <GoSidebarCollapse size={22} />
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="flex flex-col gap-1   h-[calc(100vh-72px)]  overflow-y-auto pr-1   pb-24
"
        >
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            const isDropdown = !!item.children;

            // 🔹 Normal Link
            if (!isDropdown) {
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center select-none gap-3 px-1 py-2 rounded
                    ${isActive ? "bg-gray-400" : "hover:bg-white/20"}`
                  }
                >
                  <Icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </NavLink>
              );
            }

            // 🔹 Dropdown
            return (
              <div key={item.label}>
                <div
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-white/20 rounded select-none"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </div>

                  {sidebarOpen && (
                    <FaChevronDown
                      className={`transition-transform ${
                        openMenus[item.label] ? "rotate-180" : ""
                      }`}
                      size={12}
                    />
                  )}
                </div>

                {/* Dropdown Items */}
                {openMenus[item.label] && sidebarOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => {
                      const DropDownIcon = child.icon;
                      if (DropDownIcon) {
                        return (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              `px-4 select-none flex items-center gap-2  py-1 rounded text-sm
                          ${isActive ? "bg-gray-400" : "hover:bg-white/20"}`
                            }
                          >
                            <DropDownIcon size={20} />
                            {child.label}
                          </NavLink>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Right Content */}
      <main
        className={`flex-1 h-screen ${sidebarOpen ? "pl-86" : "pl-18"}  bg-gray-100 overflow-y-auto `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
