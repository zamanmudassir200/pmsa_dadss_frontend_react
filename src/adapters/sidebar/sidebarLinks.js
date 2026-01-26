import { RiAdminLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { GiMedicalPack } from "react-icons/gi";
import { FaAnchor } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaLifeRing } from "react-icons/fa";

import { AiOutlineUser, AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { TbDatabase } from "react-icons/tb";
import { GiArtificialIntelligence, GiIronHulledWarship } from "react-icons/gi";
import { MdAppRegistration } from "react-icons/md";
import { SlGraph } from "react-icons/sl";

export const sidebarLinks = [
  {
    label: "Home",
    path: "dashboard",
    // icon: IoGridOutline,
    icon: RxDashboard,
  },
  {
    label: "Admin",
    icon: RiAdminLine,
    children: [
      { label: "Users", path: "user", icon: AiOutlineUser },
      { label: "User Roles", path: "user_groups", icon: AiOutlineUsergroupAdd },
    ],
  },
  {
    label: "Platform Data",
    icon: TbDatabase,
    path: "platform_data",
  },
  {
    label: "Jetty Data",
    icon: TbDatabase,
    path: "jetty_data",
  },
  {
    label: "Reports",
    icon: TbReportAnalytics,
    children: [
      {
        label: "SITREP By Ship",
        path: "general_report",
        icon: HiOutlineDocumentReport,
      },
      {
        label: "SITREP By Aircraft",
        path: "mission_report",
        icon: HiOutlineDocumentReport,
      },
      {
        label: "Fishing Special Report",
        path: "fishing_vessel",
        icon: TbDeviceDesktopAnalytics,
      },
      {
        label: "Merchant Special Report",
        path: "merchant_vessel",
        icon: TbDeviceDesktopAnalytics,
      },
    ],
  },
  {
    label: "Data Input Forms",
    icon: HiOutlineDocumentDuplicate,
    children: [
      {
        label: "Intel Data Input Form",
        path: "intel_report",
        icon: GiArtificialIntelligence,
      },
      {
        label: "Ship Breaking Data Input Form",
        path: "ship_breaking",
        icon: GiIronHulledWarship,
      },
      {
        label: "CSV Files Data Input ",
        path: "csv_files",
        icon: TbDeviceDesktopAnalytics,
      },
      {
        label: "Fishing Vessel Data Input Form",
        path: "registered_vessels",
        icon: MdAppRegistration,
      },
      {
        label: "Merchant Vessel Data Input Form",
        path: "registered_merchant_vessels",
        icon: MdAppRegistration,
      },
      {
        label: "Picket Data Input Form",
        path: "search_vessel",
        icon: MdAppRegistration,
      },
      {
        label: "SAR Data Input Form",
        path: "search_and_rescue",
        icon: FaLifeRing,
      },
      {
        label: "Medical Assistance Input Form",
        path: "medical_assistance",
        icon: GiMedicalPack,
      },
    ],
  },
  {
    label: "VIS Report",
    path: "vis_form",
    icon: FaAnchor,
  },
  {
    label: "Fishing Vessel Trip Details",
    path: "fishing_vessel_details",
    icon: TbDeviceDesktopAnalytics,
  },
  {
    label: "Merchant Vessel Trip Details",
    path: "merchant_vessel_details",
    icon: TbDeviceDesktopAnalytics,
  },
  {
    label: "Merchant Vessel Trips Summary",
    path: "activity_maps_and_trends/merchant_vessel_trends/mvs_trips",
    icon: SlGraph,
  },
  {
    label: "Data View",
    path: "table_display_api",
    icon: TbDeviceDesktopAnalytics,
  },
];
