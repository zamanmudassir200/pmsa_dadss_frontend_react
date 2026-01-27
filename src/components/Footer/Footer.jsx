import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#adadad] absolute bottom-0 w-full text-center">
      Copyright <span className="font-bold">Dadss</span> ©{" "}
      {new Date().getFullYear()} All Rights Reserved
    </div>
  );
};

export default Footer;
