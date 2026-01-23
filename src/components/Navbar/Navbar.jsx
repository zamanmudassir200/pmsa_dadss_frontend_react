import React from "react";
import Heading from "../title/Heading";

const Navbar = ({ backgroundcolor, font, textColor }) => {
  const text = (
    <>
      PAKISTAN MARITIME SECURITY AGENCY <br />
      DATA ANALYSIS DECISION SUPPORT SYSTEM (DADSS)
    </>
  );

  return (
    <div
      className={`sticky z-100 top-0 ${backgroundcolor ? backgroundcolor : "bg-[#063970]"}  ${textColor ? textColor : "text-white"} flex items-center justify-center`}
    >
      <Heading
        level={4}
        text={text}
        className="text-center font-semibold py-1"
      />
    </div>
  );
};

export default Navbar;
