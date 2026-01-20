import Home from "@/pages/Home";
import PlatformData from "@/pages/PlatformData";
import JettyData from "@/pages/JettyData";
import User from "@/pages/Admin/User";
import UserGroups from "@/pages/Admin/UserGroups";

import SITREPByShip from "@/pages/Reports/SITREPByShip";
import SITREPByAircraft from "@/pages/Reports/SITREPByAircraft";
import FishingSpecialReport from "@/pages/Reports/FishingSpecialReport";
import MerchantSpecialReport from "@/pages/Reports/MerchantSpecialReport";
import IntelDataInputForm from "@/pages/DataInputForms/IntelDataInputForm";
import ShipBreakingDataInputForm from "@/pages/DataInputForms/ShipBreakingDataInputForm";
import CSVFilesDataInput from "@/pages/DataInputForms/CSVFilesDataInput";
import FishingVesselDataInputForm from "@/pages/DataInputForms/FishingVesselDataInputForm";
import MerchantVesselDataInputForm from "@/pages/DataInputForms/MerchantVesselDataInputForm";
import PicketDataInputForm from "@/pages/DataInputForms/PicketDataInputForm";
import SARDataInputForm from "@/pages/DataInputForms/SARDataInputForm";
import MedicalAssistanceInputForm from "@/pages/DataInputForms/MedicalAssistanceInputForm";
import Login from "@/pages/Login";
import VISReport from "@/pages/VISReport";
import FishingVesselTripDetails from "@/pages/FishingVesselTripDetails";
import MerchantVesselTripDetails from "@/pages/MerchantVesselTripDetails";
import MerchantVesselTripsSummary from "@/pages/MerchantVesselTripsSummary";
import DataView from "@/pages/DataView";

export const pagesMap = {
  dashboard: <Home />,

  user: <User />,
  user_groups: <UserGroups />,

  platform_data: <PlatformData />,
  jetty_data: <JettyData />,

  general_report: <SITREPByShip />,
  mission_report: <SITREPByAircraft />,
  fishing_vessel: <FishingSpecialReport />,
  merchant_vessel: <MerchantSpecialReport />,

  intel_report: <IntelDataInputForm />,
  ship_breaking: <ShipBreakingDataInputForm />,
  csv_files: <CSVFilesDataInput />,
  registered_vessels: <FishingVesselDataInputForm />,
  registered_merchant_vessels: <MerchantVesselDataInputForm />,
  search_vessel: <PicketDataInputForm />,
  search_and_rescue: <SARDataInputForm />,
  medical_assistance: <MedicalAssistanceInputForm />,
  vis_form: <VISReport />,
  fishing_vessel_details: <FishingVesselTripDetails />,
  merchant_vessel_details: <MerchantVesselTripDetails />,
  "activity_maps_and_trends/merchant_vessel_trends/mvs_trips": (
    <MerchantVesselTripsSummary />
  ),
  table_display_api: <DataView />,
};
