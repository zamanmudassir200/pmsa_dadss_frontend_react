import React, { useState, useMemo } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdFilterAlt } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

const FilterModal = ({
  col,
  columnFilters,
  setColumnFilters,
  setCurrentPage,
  data,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const getUniqueValues = (key) => {
    const values = data
      .map((item) => item[key])
      .filter((value) => value !== null && value !== undefined && value !== "");
    return [...new Set(values)];
  };

  const uniqueValues = useMemo(() => getUniqueValues(col.key), [data]);

  const filteredValues = uniqueValues.filter((value) =>
    String(value).toLowerCase().includes(search.toLowerCase()),
  );

  const handleColumnFilterChange = (columnKey, value) => {
    setColumnFilters((prev) => ({
      ...prev,
      [columnKey]: value,
    }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    handleColumnFilterChange(col.key, []);
  };
  const hasActiveFilter = (columnFilters[col.key]?.length || 0) > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="primary"
          size="sm"
          className={`cursor-pointer  ${
            hasActiveFilter ? "text-[#0000ff]" : "text-white"
          }`}
        >
          <MdFilterAlt size={12} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        className="w-49.5 border-none p-3"
      >
        {/* <p className="text-sm font-semibold mb-2">Filter {col.title}</p> */}

        {/* Search Input */}

        <div className="relative py-2">
          <IoMdSearch
            className="absolute left-2 top-4.75 text-gray-400"
            size={17}
          />
          <Input
            placeholder="Search in filters"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2 text-md  px-7 focus:border-none border-gray-200 border "
          />
        </div>

        {/* Checkbox List */}
        <div className="space-y-2 max-h-60 ">
          {filteredValues.length > 0 ? (
            filteredValues.map((value) => {
              const isChecked =
                columnFilters[col.key]?.includes(value) || false;

              const toggleValue = () => {
                const currentFilters = columnFilters[col.key] || [];
                const newFilters = isChecked
                  ? currentFilters.filter((v) => v !== value)
                  : [...currentFilters, value];

                handleColumnFilterChange(col.key, newFilters);
              };

              return (
                <div
                  key={value}
                  onClick={toggleValue}
                  className={`flex items-center px-2 py-1 space-x-2 cursor-pointer rounded-md transition 
        hover:bg-gray-200 ${isChecked ? "bg-blue-100" : ""}`}
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={toggleValue}
                    className="bg-white cursor-pointer data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 border-gray-200"
                    id={`filter-${col.key}-${value}`}
                  />
                  <Label className="cursor-pointer select-none">{value}</Label>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-gray-400 text-center">Not found</p>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center gap-2 mt-3">
          <Button
            variant="primary"
            className={"cursor-pointer hover:text-blue-500"}
            size="sm"
            onClick={handleReset}
          >
            Reset
          </Button>

          <Button
            variant="primary"
            className={"cursor-pointer hover:text-blue-500"}
            size="sm"
            onClick={() => setOpen(false)}
          >
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterModal;
