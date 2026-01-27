import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

const SearchModal = ({
  col,
  filterValues,
  setFilterValues,
  setCurrentPage,
}) => {
  const [open, setOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };
  const hasActiveSearch = Boolean(filterValues[col.key]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="primary"
          className={`-ml-2 cursor-pointer ${
            hasActiveSearch ? "text-[#0000ff]" : "text-white"
          }`}
        >
          <FaSearch size={12} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        side="bottom"
        className="w-49.75 min-h-23.75 border-none"
      >
        {/* <p className="text-sm font-semibold mb-2">{col.title} Search</p> */}

        <Input
          className={"focus:border-none hover:border-blue-500 border "}
          placeholder={`Search`}
          value={filterValues[col.key] || ""}
          onChange={(e) => handleFilterChange(col.key, e.target.value)}
        />

        <div className="flex justify-between  items-center  gap-2 mt-3">
          <Button
            variant="outline"
            className={
              "cursor-pointer text-blue-500 hover:border-blue-500 hover:border border-gray-200 hover:text-blue-500 px-1.5 py-1 "
            }
            size="xs"
            onClick={() => {
              handleFilterChange(col.key, "");
              setOpen(false);
            }}
          >
            Reset
          </Button>

          <Button
            variant="outline"
            className={
              "cursor-pointer font-normal  hover:border-blue-500 hover:border border-gray-200 hover:text-blue-500 px-1.5 py-1 "
            }
            size="xs"
            onClick={() => setOpen(false)}
          >
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchModal;
