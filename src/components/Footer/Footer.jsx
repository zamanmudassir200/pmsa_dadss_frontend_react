import React from "react";

const Footer = () => {
  return (
    <div className="bg-red-600 absolute bottom-0 w-full">
      Copyright <span className="font-bold">Dadss</span> ©{" "}
      {new Date().getFullYear()} All Rights Reserved
    </div>
  );
};

export default Footer;
