// sidebar.config.js
import { MdDashboard } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

export const sidebarLinks = [
  {
    label: "Home",
    path: "",
    icon: MdDashboard,
  },
  {
    label: "Platform Data",
    icon: FaDatabase,
    children: [
      {
        label: "Platforms",
        path: "platformData",
      },
      {
        label: "Squadrons",
        path: "squadrons",
      },
    ],
  },
];
