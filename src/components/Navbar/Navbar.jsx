import React from "react";
import Heading from "../title/Heading";

const Navbar = ({ backgroundcolor, font, textColor }) => {
  const text = (
    <div className="text-[20px]">
      PAKISTAN MARITIME SECURITY AGENCY <br />
      DATA ANALYSIS DECISION SUPPORT SYSTEM (DADSS)
    </div>
  );

  return (
    <div
      className={`sticky z-100 top-0 ${backgroundcolor ? backgroundcolor : "bg-[#063970]"}  ${textColor ? textColor : "text-white"} flex items-center justify-center`}
    >
      <Heading
        level={""}
        text={text}
        className="text-center tracking-wide font-sans text-white mt-0 md:text-md sm:text-sm lg:text-lg xl:text-xl whitespace-nowrap p-0 "
      />
    </div>
  );
};

export default Navbar;
