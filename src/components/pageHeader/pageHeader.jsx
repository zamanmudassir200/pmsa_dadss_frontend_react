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
import { SearchOutlined } from "@ant-design/icons";

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

      <div className="flex flex-col h-10  w-full  md:flex-row md:justify-between items-start md:items-center mt-1 py-3">
        <div className="flex items-center ">
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center justify-center">
                <div className="ml-2 mb-1">
                  <Heading className="font-semibold " level={3} text={title} />
                </div>{" "}
                <div className="mt-1">
                  <GrCircleInformation className="ml-1 " size={13} />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className={"z-1000"}>
              <p className="text-[15px]">{hover}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* <div className="flex flex-wrap min-w-102.5 h-11 border-2 gap-1 mt-3 md:mt-0 "> */}
        <div className=" flex items-center  gap-px mr-2 mt-1 mb-2 pl-3    ">
          {searchBox && (
            <Input
              size="medium"
              allowClear
              prefix={<SearchOutlined />}
              className="search-input custom-css-pageheaderSearch mb-2 mr-px"
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholder}
            />
          )}
          {customChildComponent}

          {currentData && (
            <Button
              variant="primary"
              className="rounded bg-[#dea109] h-8 mt-1.25 text-black mr-1 font-normal  custom-css-pageheaderButton py-1 px-3.75 mb-1"
            >
              <CSVLink
                filename={title + ".csv"}
                data={currentData ? currentData : []}
              >
                <div className="flex items-center gap-x-3">
                  <FaFileDownload />
                  DOWNLOAD
                </div>
              </CSVLink>
            </Button>
            // <CSVLink
            //   filename={`${title}.csv`}
            //   data={currentData || []}
            //   className="no-underline"
            // >
            //   <Button
            //     variant="secondary"
            //     className=" w-[139.73px] px-3.75 py-1 h-8 bg-[#dea109] hover:bg-yellow-600 text-[14px] font-normal rounded-sm flex  gap-x-3 cursor-pointer items-center"
            //   >
            //     <FaFileDownload />
            //     <span> DOWNLOAD</span>
            //   </Button>
            // </CSVLink>
          )}

          {componentRef && ReactToPrint ? (
            <button
              //               className="cursor-pointer text-white flex px-3.75 py-1 w-[97.23px] bg-[#555555]
              //  items-center gap-2"
              className="rounded flex min-w-[97.23px] px-4 items-center h8 py-1  justify-center border-darkgray bg-darkgray text-white mr-1 custom-css-pageheaderButton mb-1"
            >
              <ReactToPrint
                trigger={() => (
                  <button
                    className="flex  min-w-[97.23px] px-4  py-1 w-[97.23px] bg-[#555555]
 items-center gap-2"
                  >
                    <FaPrint className="text-xs" size={12} />
                    PRINT
                  </button>
                )}
                content={() => componentRef.current}
              />
            </button>
          ) : (
            <Button
              variant="secondary"
              className="flex cursor-pointer bg-[#555555] py-1 mr-0.5 min-w-[97.23px] px-4   h-8 text-white text-sm hover:bg-[#555555] items-center gap-2.5"
              onClick={() => window.print()}
            >
              <FaPrint className="p-px" size={12} />
              <span className="font-normal"> PRINT</span>{" "}
            </Button>
          )}

          {/* {showButton && (
            <Button
              onClick={onNavigate}
              variant="secondary"
              className="flex items-center gap-2 bg-[#063970] cursor-pointer text-white hover:bg-[#063970]"
            >
              <VscAdd />
              {btnTitle || "Add"}
            </Button>
          )} */}
          {showButton && (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={onNavigate}
                className="rounded border-[#063970] min-w-[144.17px] h-8 py-1 px-4 bg-[#063970] text-white cursor-pointer mr-1 inline-flex items-center "
              >
                <div className="flex items-center gap-x-3 ">
                  <VscAdd color="white"></VscAdd>
                  {btnTitle ? btnTitle : "Add"}
                </div>
                {/* <VscAdd color="white"></VscAdd>
                  {btnTitle ? btnTitle : "Add"} */}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default PageHeaderStyled;
