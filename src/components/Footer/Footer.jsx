import React from "react";

const Footer = () => {
  return (
    <div>
      Copyright <span className="font-bold">Dadss</span> ©{" "}
      {new Date().getFullYear()} All Rights Reserved
    </div>
  );
};

export default Footer;
