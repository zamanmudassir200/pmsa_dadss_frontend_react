import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MdFilterAlt } from "react-icons/md";

const FilterModal = ({
  col,
  columnFilters,
  setColumnFilters,
  setCurrentPage,
  data,
}) => {
  const [filterModalOpen, setFilterModalOpen] = useState(null);
  const getUniqueValues = (key) => {
    const values = data
      .map((item) => item[key])
      .filter((value) => value !== null && value !== undefined && value !== "");
    return [...new Set(values)];
  };
  const handleColumnFilterChange = (columnKey, value) => {
    setColumnFilters((prev) => ({
      ...prev,
      [columnKey]: value,
    }));
    setCurrentPage(1);
  };
  return (
    <div>
      <Dialog
        open={filterModalOpen === col.key}
        onOpenChange={(open) => setFilterModalOpen(open ? col.key : null)}
      >
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className=" cursor-pointer text-white hover:bg-white/20"
          >
            <MdFilterAlt size={12} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-100">
          <DialogHeader>
            <DialogTitle>Filter {col.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {getUniqueValues(col.key).map((value) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  className={"bg-gray-200 border-black"}
                  id={`filter-${col.key}-${value}`}
                  checked={columnFilters[col.key]?.includes(value) || false}
                  onCheckedChange={(checked) => {
                    const currentFilters = columnFilters[col.key] || [];
                    let newFilters;
                    if (checked) {
                      newFilters = [...currentFilters, value];
                    } else {
                      newFilters = currentFilters.filter((v) => v !== value);
                    }
                    handleColumnFilterChange(col.key, newFilters);
                  }}
                />
                <Label htmlFor={`filter-${col.key}-${value}`}>{value}</Label>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                handleColumnFilterChange(col.key, []);
                setFilterModalOpen(null);
              }}
            >
              Clear All
            </Button>
            <Button onClick={() => setFilterModalOpen(null)}>
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterModal;
