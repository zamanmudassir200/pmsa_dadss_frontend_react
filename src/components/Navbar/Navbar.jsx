import React from "react";
import Heading from "../title/Heading";

const Navbar = () => {
  return (
    <div className="sticky z-100 top-0 bg-[#063970] text-white flex items-center justify-center ">
      <h1 className="text-center py-1">
        PAKISTAN MARITIME SECURITY AGENCY <br /> DATA ANALYSIS DECISION SUPPORT
        SYSTEM (DADSS)
      </h1>
      {/* <Heading
        level={6}
        text={`PAKISTAN MARITIME SECURITY AGENCY <br /> DATA ANALYSIS DECISION SUPPORT
        SYSTEM (DADSS)`}
      /> */}
    </div>
  );
};

export default Navbar;
