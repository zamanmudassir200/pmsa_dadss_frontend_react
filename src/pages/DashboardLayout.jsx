import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-70 bg-gray-300 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-6">DADSS</h2>

        <nav className="flex flex-col gap-2">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded ${
                isActive ? "bg-gray-400 " : "hover:bg-white/20"
              }`
            }
          >
            Home
          </NavLink>

          {/* <NavLink
            to="admin"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${
                isActive ? "bg-gray-400 " : "hover:bg-white/20"
              }`
            }
          >
            Admin
          </NavLink> */}

          <NavLink
            to="platformData"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${
                isActive ? "bg-gray-400 " : "hover:bg-white/20"
              }`
            }
          >
            Platform Data
          </NavLink>
        </nav>
      </aside>

      {/* Right Content */}
      <main className="flex-1 bg-gray-100 overflow-auto ">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
