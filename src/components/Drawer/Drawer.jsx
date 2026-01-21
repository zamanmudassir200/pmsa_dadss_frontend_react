// import { sidebarLinks } from "@/adapters/sidebar/sidebarLinks";
// import { useStore } from "@/store/store";
// import React, { useState } from "react";
// import { FaChevronDown } from "react-icons/fa";
// import { GoSidebarExpand } from "react-icons/go";
// import { GoSidebarCollapse } from "react-icons/go";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

// import { NavLink } from "react-router-dom";
// const Drawer = ({ backgroundColor, width }) => {
//   const { sidebarOpen, setSidebarOpen } = useStore();
//   const [openMenus, setOpenMenus] = useState({});

//   const toggleMenu = (label) => {
//     setOpenMenus((prev) => ({
//       ...prev,
//       [label]: !prev[label],
//     }));
//   };
//   let bgColor = !backgroundColor ? "bg-gray-300" : backgroundColor;
//   return (
//     <div>
//       <aside
//         className={`${bgColor} p-4 fixed h-screen  transition-all duration-300
//         ${sidebarOpen ? "w-86" : "w-20"}`}
//       >
//         <div className="flex mb-6 items-center justify-between">
//           {sidebarOpen && (
//             <h2 className="text-2xl font-bold flex items-center gap-2 select-none">
//               DADSS
//             </h2>
//           )}
//           <div className="cursor-pointer select-none rounded-lg transition-all duration-200 p-1">
//             {sidebarOpen ? (
//               <MenuUnfoldOutlined
//                 className="bg-white p-3 rounded-full"
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//               />
//             ) : (
//               <MenuFoldOutlined
//                 className="bg-white p-3 rounded-full"
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//               />
//             )}
//             {/* {sidebarOpen ? (
//               <GoSidebarExpand size={22} />
//             ) : (
//               <GoSidebarCollapse size={22} />
//             )} */}
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav
//           className="flex flex-col gap-1   h-[calc(100vh-72px)]  overflow-y-auto pr-1   pb-24
// "
//         >
//           {sidebarLinks.map((item) => {
//             const Icon = item.icon;
//             const isDropdown = !!item.children;

//             // 🔹 Normal Link
//             if (!isDropdown) {
//               return (
//                 <NavLink
//                   key={item.label}
//                   to={item.path}
//                   end
//                   className={({ isActive }) =>
//                     `flex items-center select-none gap-3 px-1 py-2 rounded
//                     ${isActive ? "bg-gray-400" : "hover:bg-white/20"}`
//                   }
//                 >
//                   <Icon size={20} />
//                   {sidebarOpen && <span>{item.label}</span>}
//                 </NavLink>
//               );
//             }

//             // 🔹 Dropdown
//             return (
//               <div key={item.label}>
//                 <div
//                   onClick={() => toggleMenu(item.label)}
//                   className="flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-white/20 rounded select-none"
//                 >
//                   <div className="flex items-center gap-3">
//                     <Icon size={20} />
//                     {sidebarOpen && <span>{item.label}</span>}
//                   </div>

//                   {sidebarOpen && (
//                     <FaChevronDown
//                       className={`transition-transform ${
//                         openMenus[item.label] ? "rotate-180" : ""
//                       }`}
//                       size={12}
//                     />
//                   )}
//                 </div>

//                 {/* Dropdown Items */}
//                 {openMenus[item.label] && sidebarOpen && (
//                   <div className="ml-4 mt-1 flex flex-col gap-1">
//                     {item.children.map((child) => {
//                       const DropDownIcon = child.icon;
//                       if (DropDownIcon) {
//                         return (
//                           <NavLink
//                             key={child.path}
//                             to={child.path}
//                             className={({ isActive }) =>
//                               `px-4 select-none flex items-center gap-2  py-1 rounded text-sm
//                           ${isActive ? "bg-gray-400" : "hover:bg-white/20"}`
//                             }
//                           >
//                             <DropDownIcon size={20} />
//                             {child.label}
//                           </NavLink>
//                         );
//                       }
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </nav>
//       </aside>
//     </div>
//   );
// };

// export default Drawer;
// import { sidebarLinks } from "@/adapters/sidebar/sidebarLinks";
// import { useStore } from "@/store/store";
// import React, { useState } from "react";
// import { FaChevronDown } from "react-icons/fa";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// import { NavLink } from "react-router-dom";

// const Drawer = () => {
//   const { sidebarOpen, setSidebarOpen } = useStore();
//   const [openMenus, setOpenMenus] = useState({});

//   const toggleMenu = (label) => {
//     setOpenMenus((prev) => ({
//       ...prev,
//       [label]: !prev[label],
//     }));
//   };

//   return (
//     <aside
//       className={`
//         fixed top-0 left-0 z-50 h-screen transition-all duration-300
//         ${sidebarOpen ? "w-[350px]" : "w-20"}
//         bg-gradient-to-br from-[#012169] via-[#012169] to-[#0659ED]
//         overflow-y-auto
//       `}
//     >
//       {/* Scrollbar Styling */}
//       <style>
//         {`
//           aside::-webkit-scrollbar {
//             width: 8px;
//           }
//           aside::-webkit-scrollbar-thumb {
//             background: linear-gradient(55deg, #012169 40%, #0659ED 100%);
//             border-radius: 10px;
//           }
//           aside::-webkit-scrollbar-track {
//             box-shadow: inset 0 0 3px grey;
//           }
//         `}
//       </style>

//       {/* Header */}
//       <div className="flex items-center justify-between p-4">
//         {sidebarOpen && (
//           <h2 className="text-white font-bold text-2xl select-none">DADSS</h2>
//         )}

//         <div
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="cursor-pointer"
//         >
//           {sidebarOpen ? (
//             <MenuFoldOutlined className="bg-white p-3 rounded-full" />
//           ) : (
//             <MenuUnfoldOutlined className="bg-white p-3 rounded-full" />
//           )}
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex flex-col gap-1 px-2 pb-24">
//         {sidebarLinks.map((item) => {
//           const Icon = item.icon;
//           const isDropdown = !!item.children;

//           // 🔹 Normal Link
//           if (!isDropdown) {
//             return (
//               <NavLink
//                 key={item.label}
//                 to={item.path}
//                 end
//                 className={({ isActive }) =>
//                   `
//                     flex items-center gap-3 px-3 py-2 rounded-md text-white
//                     transition-all duration-200 select-none
//                     ${isActive ? "bg-black/30" : "hover:bg-white/20"}
//                   `
//                 }
//               >
//                 <Icon size={20} />
//                 {sidebarOpen && <span>{item.label}</span>}
//               </NavLink>
//             );
//           }

//           // 🔹 Dropdown
//           return (
//             <div key={item.label}>
//               <div
//                 onClick={() => toggleMenu(item.label)}
//                 className="
//                   flex items-center justify-between px-3 py-2
//                   cursor-pointer rounded-md text-white
//                   hover:bg-white/20 transition-all duration-200 select-none
//                 "
//               >
//                 <div className="flex items-center gap-3">
//                   <Icon size={20} />
//                   {sidebarOpen && <span>{item.label}</span>}
//                 </div>

//                 {sidebarOpen && (
//                   <FaChevronDown
//                     size={12}
//                     className={`transition-transform duration-200 ${
//                       openMenus[item.label] ? "rotate-180" : ""
//                     }`}
//                   />
//                 )}
//               </div>

//               {/* Dropdown Items */}
//               {openMenus[item.label] && sidebarOpen && (
//                 <div className="ml-6 mt-1 flex flex-col gap-1">
//                   {item.children.map((child) => {
//                     const DropDownIcon = child.icon;
//                     return (
//                       <NavLink
//                         key={child.path}
//                         to={child.path}
//                         className={({ isActive }) =>
//                           `
//                             flex items-center gap-2 px-3 py-1 rounded text-sm text-white
//                             transition-all duration-200 select-none
//                             ${isActive ? "bg-black/30" : "hover:bg-white/20"}
//                           `
//                         }
//                       >
//                         {DropDownIcon && <DropDownIcon size={18} />}
//                         {child.label}
//                       </NavLink>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

// export default Drawer;
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
        <nav className="px-2 pr-2 mt-3 h-[calc(100vh-140px)] overflow-y-auto ">
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
