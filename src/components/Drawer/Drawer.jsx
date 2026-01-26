import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { FaChevronDown } from "react-icons/fa";
import { sidebarLinks } from "@/adapters/sidebar/sidebarLinks";
import { useStore } from "@/store/store";
import Cookies from "js-cookie";
import axios from "axios";
import Logout from "../Logout/Logout";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
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
  // const [hoverTooltip, setHoverTooltip] = useState(false);
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
    <div className="flex ">
      {/* ================= SIDEBAR ================= */}
      <div
        className={`${sidebarOpen ? width : collapsedWidth}
 border-r border-gray-300`}
      >
        <aside
          className={`
    fixed z-40 h-screen px-[1.75px] transition-all duration-300 ease-in-out shadow-2xl 
        ${sidebarOpen ? "w-86.25" : "w-18.5"} ${!backgroundColor ? "bg-[#d3d3d3]" : backgroundColor}  
         ${textColor}
  `}
        >
          {/* ---------- HEADER ---------- */}
          <div className="flex items-center  p-2.5 h-14.5">
            {sidebarOpen && (
              <h1 className="text-[24px] pb-2 font-bold tracking-wide ml-5">
                DADSS
              </h1>
            )}

            <span
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto bg-white hover:bg-gray-100 cursor-pointer 
    flex items-center justify-center text-black 
    w-9.5 h-9.5 rounded-full "
            >
              {sidebarOpen ? (
                <MenuFoldOutlined className="text-[14px]" />
              ) : (
                <MenuUnfoldOutlined className="text-[14px]" />
              )}
            </span>
          </div>

          {/* ---------- MENU ---------- */}
          <nav className=" mt-1  px-[4.25px] mb-1 w-full h-[calc(100vh-160px)] overflow-y-auto ">
            {filteredLinks.map((item) => {
              const Icon = item.icon;
              const isDropdown = !!item.children;
              /* ===== NORMAL LINK ===== */
              if (!isDropdown) {
                return (
                  <div
                    // onMouseEnter={() => !sidebarOpen && setHoverTooltip(true)}
                    // onMouseLeave={() => !sidebarOpen && setHoverTooltip(false)}
                    key={item.label}
                    className="mb-1"
                  >
                    <Tooltip className="">
                      <TooltipTrigger className="w-full">
                        <NavLink
                          key={item.label}
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 pl-6 py-2 h-10 rounded-md
                      transition-all duration-200
                      ${isActive ? "bg-[#939393]" : "hover:bg-[#c5c3c3]"}
                    `
                          }
                        >
                          <Icon size={20} />
                          {sidebarOpen && (
                            <span className=" text-[14.5px]">{item.label}</span>
                          )}

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
                <div key={item.label} className="mt-1 mb-1.75 ">
                  <div
                    onClick={() => sidebarOpen && toggleMenu(item.label)}
                    onMouseEnter={() =>
                      !sidebarOpen && setHoverMenu(item.label)
                    }
                    onMouseLeave={() => !sidebarOpen && setHoverMenu(null)}
                    // onClick={() => toggleMenu(item.label)}
                    className="flex items-center pl-6 py-2  justify-between px-3  cursor-pointer rounded-md hover:bg-[#c5c3c3] relative"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={18} />
                      {sidebarOpen && (
                        <span className="text-[14.5px]">{item.label}</span>
                      )}
                    </div>

                    {sidebarOpen && (
                      <FaChevronDown
                        size={10}
                        className={`transition-transform mr-1.5 mb-0.5 ${
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
              mt-0.75 flex flex-col  gap-0.5
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
                      flex items-center gap-2.5 w-full  ${sidebarOpen && " px-12 "} px-3  py-3 rounded-md
                      transition-all h-10 mt-1 
                      ${isActive ? "bg-[#939393]" : "hover:bg-[#c5c3c3]"}
                    `
                            }
                          >
                            <ChildIcon size={20} />
                            <span className="text-[14.5px]">{child.label}</span>
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
      </div>
      {/* <div className="absolute bottom-0">
        <Footer />
      </div> */}
    </div>
  );
};

export default Drawer;
