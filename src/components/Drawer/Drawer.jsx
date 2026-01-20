import { sidebarLinks } from "@/adapters/sidebar/sidebarLinks";
import { useStore } from "@/store/store";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { NavLink } from "react-router-dom";
const Drawer = ({ backgroundColor, width }) => {
  const { sidebarOpen, setSidebarOpen } = useStore();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  let bgColor = !backgroundColor ? "bg-gray-300" : backgroundColor;
  return (
    <div>
      <aside
        className={`${bgColor} p-4 fixed h-screen  transition-all duration-300
        ${sidebarOpen ? "w-86" : "w-20"}`}
      >
        <div className="flex mb-6 items-center justify-between">
          {sidebarOpen && (
            <h2 className="text-2xl font-bold flex items-center gap-2 select-none">
              DADSS
            </h2>
          )}
          <div className="cursor-pointer select-none rounded-lg transition-all duration-200 p-1">
            {sidebarOpen ? (
              <MenuUnfoldOutlined
                className="bg-white p-3 rounded-full"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              />
            ) : (
              <MenuFoldOutlined
                className="bg-white p-3 rounded-full"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              />
            )}
            {/* {sidebarOpen ? (
              <GoSidebarExpand size={22} />
            ) : (
              <GoSidebarCollapse size={22} />
            )} */}
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
    </div>
  );
};

export default Drawer;
