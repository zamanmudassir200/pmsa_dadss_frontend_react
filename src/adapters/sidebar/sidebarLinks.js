import { MdDashboard } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

export const sidebarLinks = [
  {
    label: "Home",
    path: "dashboard",
    icon: MdDashboard,
  },
  {
    label: "Admin",
    icon: MdDashboard,
    children: [
      { label: "Users", path: "user", icon: MdDashboard },
      { label: "User Roles", path: "user_groups", icon: MdDashboard },
    ],
  },
  {
    label: "Platform Data",
    icon: FaDatabase,
    path: "platform_data",
  },
  {
    label: "Jetty Data",
    icon: FaDatabase,
    path: "jetty_data",
  },
  {
    label: "Reports",
    icon: MdDashboard,
    children: [
      { label: "SITREP By Ship", path: "general_report", icon: MdDashboard },
      {
        label: "SITREP By Aircraft",
        path: "mission_report",
        icon: MdDashboard,
      },
      {
        label: "Fishing Special Report",
        path: "fishing_vessel",
        icon: MdDashboard,
      },
      {
        label: "Merchant Special Report",
        path: "merchant_vessel",
        icon: MdDashboard,
      },
    ],
  },
  {
    label: "Data Input Forms",
    icon: MdDashboard,
    children: [
      {
        label: "Intel Data Input Form",
        path: "intel_report",
        icon: MdDashboard,
      },
      {
        label: "Ship Breaking Data Input Form",
        path: "ship_breaking",
        icon: MdDashboard,
      },
      {
        label: "CSV Files Data Input ",
        path: "csv_files",
        icon: MdDashboard,
      },
      {
        label: "Fishing Vessel Data Input Form",
        path: "registered_vessels",
        icon: MdDashboard,
      },
      {
        label: "Merchant Vessel Data Input Form",
        path: "registered_merchant_vessels",
        icon: MdDashboard,
      },
      {
        label: "Picket Data Input Form",
        path: "search_vessel",
        icon: MdDashboard,
      },
      {
        label: "SAR Data Input Form",
        path: "search_and_rescue",
        icon: MdDashboard,
      },
      {
        label: "Medical Assistance Input Form",
        path: "medical_assistance",
        icon: MdDashboard,
      },
    ],
  },
  {
    label: "VIS Report",
    path: "vis_form",
    icon: MdDashboard,
  },
  {
    label: "Fishing Vessel Trip Details",
    path: "fishing_vessel_details",
    icon: MdDashboard,
  },
  {
    label: "Merchant Vessel Trip Details",
    path: "merchant_vessel_details",
    icon: MdDashboard,
  },
  {
    label: "Merchant Vessel Trips Summary",
    path: "activity_maps_and_trends/merchant_vessel_trends/mvs_trips",
    icon: MdDashboard,
  },
  {
    label: "Data View",
    path: "table_display_api",
    icon: MdDashboard,
  },
];
