import { useStore } from "@/store/store";
import React from "react";
import { FaPowerOff } from "react-icons/fa";

const Logout = ({ handleLogout }) => {
  const { sidebarOpen } = useStore();
  return (
    <div className="absolute bottom-20 bg-[#808080] w-full px-4 cursor-pointer">
      <div className="flex items-center justify-between gap-3  p-2 rounded-md">
        {sidebarOpen ? (
          <>
            <div className="w-5 h-5 overflow-cover">
              <img
                className="w-full h-full overflow-hidden "
                src="./user.png"
                alt=""
              />
            </div>
            <span className="" onClick={handleLogout}>
              <FaPowerOff />
            </span>
          </>
        ) : (
          <span className="hover:bg-white/20" onClick={handleLogout}>
            <FaPowerOff />
          </span>
        )}
      </div>
    </div>
  );
};

export default Logout;
