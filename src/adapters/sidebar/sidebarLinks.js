import { MdDashboard } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoGridOutline } from "react-icons/io5";
import { FiDatabase } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaRegCopy } from "react-icons/fa6";
import { GiArtificialIntelligence } from "react-icons/gi";
import { GiIronHulledWarship } from "react-icons/gi";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { GiMedicalPack } from "react-icons/gi";
import { PiChartLineUpBold } from "react-icons/pi";
import { FaAnchor } from "react-icons/fa";
import { SiRescuetime } from "react-icons/si";

export const sidebarLinks = [
  {
    label: "Home",
    path: "dashboard",
    icon: IoGridOutline,
  },
  {
    label: "Admin",
    icon: RiAdminLine,
    children: [
      { label: "Users", path: "user", icon: FaRegUser },
      { label: "User Roles", path: "user_groups", icon: AiOutlineUsergroupAdd },
    ],
  },
  {
    label: "Platform Data",
    icon: FiDatabase,
    path: "platform_data",
  },
  {
    label: "Jetty Data",
    icon: FiDatabase,
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
    icon: FaRegCopy,
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
        icon: MdFormatListBulletedAdd,
      },
      {
        label: "Merchant Vessel Data Input Form",
        path: "registered_merchant_vessels",
        icon: MdFormatListBulletedAdd,
      },
      {
        label: "Picket Data Input Form",
        path: "search_vessel",
        icon: MdFormatListBulletedAdd,
      },
      {
        label: "SAR Data Input Form",
        path: "search_and_rescue",
        icon: SiRescuetime,
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
    icon: PiChartLineUpBold,
  },
  {
    label: "Data View",
    path: "table_display_api",
    icon: TbDeviceDesktopAnalytics,
  },
];
