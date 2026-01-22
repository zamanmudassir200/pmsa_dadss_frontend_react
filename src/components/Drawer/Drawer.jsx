import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { FaChevronDown } from "react-icons/fa";
import { sidebarLinks } from "@/adapters/sidebar/sidebarLinks";
import { useStore } from "@/store/store";
import Cookies from "js-cookie";
import axios from "axios";
import { FaPowerOff } from "react-icons/fa6";
import Logout from "../Logout/Logout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import Footer from "../Footer/Footer";

const Drawer = ({
  backgroundColor,
  textColor = "text-black",
  font,
  width,
  collapsedWidth,
}) => {
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen } = useStore();
  const [openMenus, setOpenMenus] = useState({});
  const [hoverMenu, setHoverMenu] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_MSA_BACKEND_API}/logout`, {
        refresh: localStorage.getItem("refreshToken"),
      });
    } catch (err) {
      console.error(err);
    }
    localStorage.clear();
    navigate("/");
  };

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const category = Cookies.get("category");

  const filteredLinks = sidebarLinks.filter((item) => {
    if (category === "B" && ["Users", "Platform Data"].includes(item.label))
      return false;
    if (category === "C" && item.adminOnly) return false;
    return true;
  });
  return (
    <div className="flex">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed  z-40 h-screen 
          transition-all duration-300 ease-in-out
          ${sidebarOpen && width ? width : collapsedWidth}
          ${!backgroundColor ? "bg-gray-200" : backgroundColor}
          ${textColor}

        `}
      >
        {/* ---------- HEADER ---------- */}
        <div className="flex items-center px-4 py-4">
          {sidebarOpen && (
            <h1 className="text-2xl font-bold tracking-wide">DADSS</h1>
          )}

          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto bg-white hover:bg-gray-100 cursor-pointer text-black p-3 rounded-full shadow-md"
          >
            {sidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Button>
        </div>

        {/* ---------- MENU ---------- */}
        <nav className="px-2  pr-2 mt-3 h-[calc(100vh-160px)] overflow-y-auto ">
          {filteredLinks.map((item) => {
            const Icon = item.icon;
            const isDropdown = !!item.children;
            /* ===== NORMAL LINK ===== */
            if (!isDropdown) {
              return (
                <div key={item.label} className="">
                  <Tooltip className="">
                    <TooltipTrigger className="w-full">
                      <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                          `
                      flex items-center gap-3 ml-4  px-3 py-2 rounded-md
                      transition-all duration-200
                      ${isActive ? "bg-[#939393]" : "hover:bg-gray-300"}
                    `
                        }
                      >
                        <Icon size={20} />
                        {sidebarOpen && <span>{item.label}</span>}

                        {!sidebarOpen && (
                          <TooltipContent side="right" className={"text-md"}>
                            {item.label}
                          </TooltipContent>
                        )}
                      </NavLink>
                    </TooltipTrigger>
                  </Tooltip>
                </div>
              );
            }

            return (
              <div key={item.label} className="mt-1">
                <div
                  onClick={() => sidebarOpen && toggleMenu(item.label)}
                  onMouseEnter={() => !sidebarOpen && setHoverMenu(item.label)}
                  onMouseLeave={() => !sidebarOpen && setHoverMenu(null)}
                  // onClick={() => toggleMenu(item.label)}
                  className="flex items-center ml-4 justify-between px-3 py-2 cursor-pointer rounded-md hover:bg-white/20 relative"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </div>

                  {sidebarOpen && (
                    <FaChevronDown
                      size={12}
                      className={`transition-transform ${
                        openMenus[item.label] ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* -------- DROPDOWN ITEMS -------- */}
                {((sidebarOpen && openMenus[item.label]) ||
                  (!sidebarOpen && hoverMenu === item.label)) && (
                  <div
                    onMouseEnter={() =>
                      !sidebarOpen && setHoverMenu(item.label)
                    }
                    onMouseLeave={() => !sidebarOpen && setHoverMenu(null)}
                    className={`
              mt-1 flex flex-col  gap-1
              ${
                !sidebarOpen
                  ? "absolute left-18 top-20 bg-gray-200 shadow-lg rounded-md w-48 z-50"
                  : ""
              }
            `}
                  >
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `
                      flex items-center gap-2 w-full ${sidebarOpen && "ml-4 px-9 "} px-3  py-2 text-sm rounded-md
                      transition-all
                      ${isActive ? "bg-[#939393]" : "hover:bg-gray-400"}
                    `
                          }
                        >
                          <ChildIcon size={16} />
                          <span>{child.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <Logout handleLogout={handleLogout} />
      </aside>
      <div className="absolute bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Drawer;
