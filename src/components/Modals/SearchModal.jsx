import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BsSearch } from "react-icons/bs";


const SearchModal = ({ col, filterValues, setFilterValues,setCurrentPage }) => {
  const [searchModalOpen, setSearchModalOpen] = useState(null);
  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); 
  };
  return (
    <div>
      <Dialog
        open={searchModalOpen === col.key}
        onOpenChange={(open) => setSearchModalOpen(open ? col.key : null)}
      >
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className=" p-0 text-white cursor-pointer hover:bg-white/20"
          >
            <BsSearch size={10} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-100">
          <DialogHeader>
            <DialogTitle>{col.title} Search</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder={`Search ${col.title.toLowerCase()}...`}
              value={filterValues[col.key] || ""}
              onChange={(e) => handleFilterChange(col.key, e.target.value)}
              className="w-full"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  handleFilterChange(col.key, "");
                  setSearchModalOpen(null);
                }}
              >
                Clear
              </Button>
              <Button onClick={() => setSearchModalOpen(null)}>Apply</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchModal;
