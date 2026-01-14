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
import ReactToPrint from "react-to-print";

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
    <div className="space-y-4">
      {apidata && (
        <div
          className="flex items-center space-x-2 mt-5 ml-5 cursor-pointer"
          onClick={handleBack}
        >
          <RxArrowLeft className="text-xl" />
          <span className="text-sm font-medium">Back</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-5">
        <div className="flex items-center space-x-1">
          <Tooltip>
            <div className="flex items-center">
              <Heading level={3} text={title} />
              <TooltipTrigger>
                <GrCircleInformation className="ml-1 text-gray-500" size={13} />
              </TooltipTrigger>
            </div>
            <TooltipContent>
              <p>{hover}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 md:mt-0 items-center">
          {searchBox && (
            <Input
              placeholder={placeholder || "Search"}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-64"
            />
          )}

          {customChildComponent}

          {/* {currentData && (
            <CSVLink
              filename={`${title}.csv`}
              data={currentData || []}
              className="no-underline"
            >
              <Button variant="secondary" className="flex items-center gap-2">
                <FaFileDownload />
                DOWNLOAD
              </Button>
            </CSVLink>
          )} */}

          {/* {componentRef && (
            <ReactToPrint
              trigger={() => (
                <Button variant="secondary" className="flex items-center gap-2">
                  <FaPrint />
                  PRINT
                </Button>
              )}
              content={() => componentRef.current}
            />
          )} */}

          {showButton && (
            <Button
              onClick={onNavigate}
              variant="outline"
              className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
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