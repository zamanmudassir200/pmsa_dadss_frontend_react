import React from "react";
import { RxArrowLeft } from "react-icons/rx";
import { VscAdd } from "react-icons/vsc";
import { FaFileDownload, FaPrint } from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Heading from "../title/Heading";
import { CSVLink } from "react-csv";

// Check if react-to-print is available
let ReactToPrint;
try {
  ReactToPrint = require("react-to-print");
  ReactToPrint = ReactToPrint.default || ReactToPrint;
} catch (error) {
  console.log("react-to-print not available");
}

function PageHeaderStyled(props) {
  const {
    title,
    onSearchChange,
    btnTitle,
    onNavigate,
    placeholder,
    showButton,
    searchBox = false,
    currentData,
    componentRef,
    hover,
    apidata,
    customChildComponent,
    localStorage,
  } = props;

  const handleBack = () => {
    if (typeof localStorage === "function") localStorage();
    window.history.back();
  };

  return (
    <div className="">
      {apidata && (
        <div
          className="flex items-center space-x-2 mt-5 ml-5 cursor-pointer"
          onClick={handleBack}
        >
          <RxArrowLeft className="text-xl" />
          <span className="text-sm font-medium">Back</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-1">
        <div className="flex items-center ">
          <Tooltip>
            <div className="flex items-center justify-center">
              <div className="ml-2 mb-4">
                <TooltipTrigger>
                  <Heading className="font-semibold " level={3} text={title} />
                </TooltipTrigger>
              </div>{" "}
              <div className="mt-2">
                <GrCircleInformation className="ml-1 text-gray-500" size={13} />
              </div>
            </div>
            <TooltipContent className={"z-1000"}>
              <p className="text-[15px]">{hover}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 md:mt-0 items-center">
          {customChildComponent}

          {currentData && (
            <CSVLink
              filename={`${title}.csv`}
              data={currentData || []}
              className="no-underline"
            >
              <Button
                variant="secondary"
                className=" w-[139.73px] px-3.75 py-1 h-8 bg-[#dea109] hover:bg-yellow-600 text-[14px] font-normal rounded-sm flex  gap-x-3 cursor-pointer items-center"
              >
                <FaFileDownload />
                <span> DOWNLOAD</span>
              </Button>
            </CSVLink>
          )}

          {componentRef && ReactToPrint ? (
            <button
              className="cursor-pointer text-white flex px-3.75 py-1 w-[97.23px] bg-[#555555]
 items-center gap-2"
            >
              <ReactToPrint
                trigger={() => (
                  <button
                    className="flex px-3.75 py-1 w-[97.23px] bg-[#555555]
 items-center gap-2"
                  >
                    <FaPrint />
                    PRINT
                  </button>
                )}
                content={() => componentRef.current}
              />
            </button>
          ) : (
            <Button
              variant="secondary"
              className="flex cursor-pointer bg-[#555555] text-white hover:bg-[#555555] items-center gap-2"
              onClick={() => window.print()}
            >
              <FaPrint />
              <span className="font-normal"> PRINT</span>{" "}
            </Button>
          )}

          {showButton && (
            <Button
              onClick={onNavigate}
              variant="secondary"
              className="flex items-center gap-2 bg-[#063970] cursor-pointer text-white hover:bg-[#063970]"
            >
              <VscAdd />
              {btnTitle || "Add"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
export default PageHeaderStyled;
