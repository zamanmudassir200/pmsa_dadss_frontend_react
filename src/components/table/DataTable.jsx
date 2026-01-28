import { PiLineVerticalLight } from "react-icons/pi";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { RxCross1 } from "react-icons/rx";
import { VscInbox } from "react-icons/vsc";

import {
  BsThreeDotsVertical,
  BsSortAlphaDown,
  BsChevronExpand,
  BsSortAlphaUp,
  BsSortDown,
  BsInfoCircle,
  BsChevronLeft,
  BsChevronRight,
  BsChevronUp,
  BsChevronDown,
} from "react-icons/bs";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import ReactDragListView from "react-drag-listview";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Pagination from "@/components/Pagination/Pagination";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import SearchModal from "../Modals/SearchModal";
import FilterModal from "../Modals/FilterModal";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";
import PlatformFields from "@/adapters/platform/platformKeys";
import { toast } from "react-toastify";
import { toastError } from "@/utils/toast";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { GoTriangleUp, GoTriangleDown, GoInbox } from "react-icons/go";
import { InfoCircleOutlined } from "@ant-design/icons";

export default function DataTable({
  data = [],
  columns = [],
  onUpdate,
  onAdd,
  onCancelAdd,
  isAdding = false,
  onStartEdit,
  onCancelEdit,
  isLoading = false,
  register,
  errors,
  showPagination = true, // New prop to enable/disable pagination
  itemsPerPage: initialItemsPerPage = 10, // New prop for items per page
  backgroundColor,
  btnTitle,
}) {
  const [editRowKey, setEditRowKey] = useState(null);
  const [rowData, setRowData] = useState({});
  const [dragColumns, setDragColumns] = useState(columns);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.key),
  );
  const [filterValues, setFilterValues] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortStates, setSortStates] = useState({});
  const [columnFilters, setColumnFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const tableRef = useRef();

  useEffect(() => {
    setDragColumns(columns);
  }, [columns]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newColumns = [...dragColumns];
      const [moved] = newColumns.splice(fromIndex, 1);
      newColumns.splice(toIndex, 0, moved);
      setDragColumns(newColumns);
    },
    nodeSelector: "th",
  };

  const startEditing = useCallback(
    (row) => {
      const rowId = row.pf_key || row.tempId;
      setEditRowKey(rowId);
      const rowCopy = JSON.parse(JSON.stringify(row));
      setRowData(rowCopy);

      if (onStartEdit) onStartEdit(rowCopy);
    },
    [onStartEdit],
  );

  const cancelEditing = useCallback(() => {
    setEditRowKey(null);
    setRowData({});
    if (onCancelEdit) onCancelEdit();
  }, [onCancelEdit]);

  const saveEditing = useCallback(() => {
    if (!editRowKey) return;
    const requiredFields = Object.values(PlatformFields)
      .filter((field) => field.validation?.required)
      .map((field) => field.key);

    const missingFields = requiredFields.filter((field) => !rowData[field]);
    if (missingFields.length > 0) {
      toastError(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }
    if (onUpdate) {
      onUpdate({ ...rowData, key: editRowKey });
    }
    cancelEditing();
  }, [editRowKey, rowData, onUpdate, cancelEditing]);

  const handleFieldChange = useCallback((field, value) => {
    // setRowData((prev) => ({ ...prev, [field]: value }));
    // setRowData((prev) => {
    //   const updated = { ...prev, [field]: value };
    //   console.log("Field updated:", field, value, "New rowData:", updated);
    //   return updated;
    // });
    setRowData((prev) => {
      if (!prev || Object.keys(prev).length === 0) {
        return prev;
      }

      const updated = { ...prev, [field]: value };
      return updated;
    });
  }, []);

  const handleColumnToggle = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };
  const handleSortClick = (columnKey) => {
    const currentState = sortStates[columnKey];
    let nextState;

    if (!currentState) {
      nextState = "asc";
    } else if (currentState === "asc") {
      nextState = "desc";
    } else {
      nextState = null;
    }

    setSortStates({
      ...sortStates,
      [columnKey]: nextState,
    });
    setCurrentPage(1); // Reset to page 1 when sorting
  };

  // const getSortIcon = (columnKey) => {
  //   const state = sortStates[columnKey];
  //   switch (state) {
  //     case "asc":
  //       // return <BsSortAlphaDown className="ml-1 text-blue-600" />;
  //       return <TbTriangleInvertedFilled className="ml-1 text-blue-600" />;

  //     case "desc":
  //       return <TbTriangleFilled className="ml-1 text-blue-600" />;
  //     default:
  //       // return <BsChevronExpand className="ml-1 text-gray-400" />;
  //       return (
  //         <div className="">
  //           <TbTriangleFilled />
  //           <TbTriangleInvertedFilled />
  //         </div>
  //       );
  //   }
  // };

  const getSortIcon = (columnKey) => {
    const state = sortStates[columnKey];

    return (
      <div className="flex flex-col ml-1 leading-none">
        <GoTriangleUp
          size={1}
          className={` ${state === "desc" ? "text-blue-600" : "text-white"} -mb-2 `}
        />
        <GoTriangleDown
          size={1}
          className={`${state === "asc" ? "text-blue-600" : "text-white"} `}
        />
      </div>
    );
  };

  const isTempRow = (row) => row.isTemp === true || row.tempId !== undefined;
  // Filter data based on search filters
  const filteredData = useMemo(() => {
    return (Array.isArray(data) ? data : [])
      .filter((row) =>
        Object.keys(filterValues).every((key) => {
          if (!filterValues[key]) return true;
          const rowValue = row[key];
          if (rowValue === null || rowValue === undefined) return false;
          return String(rowValue)
            .toLowerCase()
            .includes(String(filterValues[key]).toLowerCase());
        }),
      )
      .filter((row) =>
        Object.keys(columnFilters).every((key) => {
          const filterValue = columnFilters[key];
          if (!filterValue || filterValue.length === 0) return true;
          const rowValue = row[key];
          return filterValue.includes(rowValue);
        }),
      );
  }, [data, filterValues, columnFilters]);

  // Sort data based on sort states
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      for (const [columnKey, sortState] of Object.entries(sortStates)) {
        if (sortState) {
          const aVal = a[columnKey] || "";
          const bVal = b[columnKey] || "";

          if (sortState === "asc") {
            return String(aVal).localeCompare(String(bVal));
          } else if (sortState === "desc") {
            return String(bVal).localeCompare(String(aVal));
          }
        }
      }
      return 0;
    });
  }, [filteredData, sortStates]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage, showPagination]);

  const handlePageChange = (page, newItemsPerPage = itemsPerPage) => {
    setCurrentPage(page);
    if (newItemsPerPage !== itemsPerPage) {
      setItemsPerPage(newItemsPerPage);
    }
  };
  const renderCellContent = useCallback(
    (col, row, isEditing, isAddingRow) => {
      const isCurrentRowEditing =
        (row.pf_key === editRowKey || row.tempId === editRowKey) && isEditing;
      const cellValue = isCurrentRowEditing ? rowData[col.key] : row[col.key];

      if (col.render) {
        return col.render(
          cellValue,
          row,
          row.pf_key || row.tempId,
          isCurrentRowEditing,
          isAddingRow,
          handleFieldChange,
          register,
          errors,
        );
      }

      if (isCurrentRowEditing) {
        return (
          <Input
            value={cellValue ?? ""}
            onChange={(e) => handleFieldChange(col.key, e.target.value)}
          />
        );
      }

      return cellValue ?? "";
    },
    [editRowKey, rowData, handleFieldChange, register, errors],
  );

  if (isLoading) {
    return <div className="text-center py-2">Loading table data...</div>;
    // return <LoadingSpinner />;
  }
  let bgColor = !backgroundColor ? "bg-[#063970]" : backgroundColor;
  return (
    <div>
      <div className="overflow-x-auto  mb-1 relative" ref={tableRef}>
        <ReactDragListView.DragColumn {...dragProps}>
          <div className="rounded-xl overflow-hidden ">
            <Table
              style={{ borderRadius: "100" }}
              className="min-w-full border h-14.25 border-gray-300 rounded-full"
            >
              <TableHeader className={`${bgColor}  rounded-full`}>
                <TableRow
                  className={`hover:${bgColor} cursor-pointer rounded-4xl`}
                >
                  {dragColumns.map(
                    (col) =>
                      visibleColumns.includes(col.key) && (
                        <TableHead
                          onMouseEnter={() => setHoveredColumn(col.key)}
                          onMouseLeave={() => setHoveredColumn(null)}
                          key={col.key}
                          className="text-white r-pointer px-3 py-2 text-left font-medium relative group"
                        >
                          <div className="flex relative items-center justify-between">
                            <div className="flex items-center">
                              <Tooltip content={col.description || col.title}>
                                <div className="flex items-center ">
                                  <span>{col.title}</span>
                                  <TooltipTrigger>
                                    {" "}
                                    <InfoCircleOutlined
                                      className="ml-1 cursor-pointer text-white/80"
                                      size={12}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-black text-white px-2 py-1 rounded-xl z-100 ">
                                    <p>{col.title}</p>
                                  </TooltipContent>
                                </div>
                              </Tooltip>
                              {/* Sort Icon */}
                              <Button
                                variant="primary"
                                size="sm"
                                className=" h-2 w-2  text-white cursor-pointer"
                                onClick={() => handleSortClick(col.key)}
                              >
                                {getSortIcon(col.key)}
                              </Button>
                              {/* Search Icon */}
                              {col.filtertype === "search" && (
                                <SearchModal
                                  col={col}
                                  filterValues={filterValues}
                                  setFilterValues={setFilterValues}
                                  setCurrentPage={setCurrentPage}
                                />
                              )}
                              {col.filtertype === "none" && null}
                              {/* Filter Icon for unique columns */}
                              {col.filtertype &&
                                col.filtertype === "filter" && (
                                  <FilterModal
                                    col={col}
                                    columnFilters={columnFilters}
                                    setColumnFilters={setColumnFilters}
                                    setCurrentPage={setCurrentPage}
                                    data={data}
                                  />
                                )}
                            </div>
                            <PiLineVerticalLight
                              size={30}
                              className={`transition-all duration-200 ease-in-out ${
                                hoveredColumn === col.key
                                  ? "opacity-0"
                                  : "opacity-100"
                              }`}
                            />
                          </div>
                        </TableHead>
                      ),
                  )}
                  <TableHead className={`text-white px-4 py-2 text-start  `}>
                    <div className="relative">
                      <BsThreeDotsVertical
                        size={25}
                        className="cursor-pointer p-1 rounded"
                        onClick={() => setMenuOpen((prev) => !prev)}
                      />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className={"bg-white"}>
                {paginatedData.length === 0 ? (
                  // <TableRow className={"bg-white"}>
                  //   <TableCell
                  //     colSpan={visibleColumns.length + 1}
                  //     className=" py-20 flex flex-col bg-white items-center w-full justify-center "
                  //   >
                  //     <div className="absolute  left-200 top-150">
                  //       <VscInbox className="text-gray-200" size={50} />{" "}
                  //       <span className="text-gray-400">No data</span>
                  //     </div>
                  //   </TableCell>
                  // </TableRow>
                  <TableRow className="bg-white">
                    <TableCell
                      colSpan={visibleColumns.length + 1}
                      className="py-20 bg-white relative"
                    >
                      <div className="absolute inset-0 flex pl-125 flex-col justify-center  pointer-events-none">
                        <GoInbox
                          className="text-gray-300 mb-2 font-light"
                          size={60}
                        />
                        <span className="text-gray-400 ">No data</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  // </TableRow>
                  paginatedData.map((row, index) => {
                    const isEditing =
                      row.pf_key === editRowKey || row.tempId === editRowKey;
                    const isAddingRow = isTempRow(row);
                    return (
                      <TableRow
                        key={
                          isTempRow(row)
                            ? `temp-${row.tempId}`
                            : row.pf_key || index
                        }
                        className={` border hover:bg-gray-300 border-gray-100  transition-colors duration-200 ${
                          isAddingRow ? "bg-blue-50" : ""
                        }`}
                      >
                        {dragColumns.map(
                          (col) =>
                            visibleColumns.includes(col.key) && (
                              <TableCell
                                className={" border-none  bg-white "}
                                key={col.key}
                              >
                                {renderCellContent(
                                  col,
                                  row,
                                  isEditing,
                                  isAddingRow,
                                )}
                              </TableCell>
                            ),
                        )}

                        <TableCell className="px-4 py-2 bg-white  ">
                          {isEditing ? (
                            <div className="flex items-center gap-2 ">
                              <Button
                                variant="outline"
                                onClick={cancelEditing}
                                className="bg-white hover:text-blue-500 hover:border-blue-500 cursor-pointer font-bold border-gray-300 text-black rounded-full"
                              >
                                {/* <MdCancel /> */}
                                Cancel
                              </Button>
                              <Button
                                variant="outline"
                                onClick={saveEditing}
                                className="bg-[#ffbf00] hover:bg-[#ffbf00] text-white cursor-pointer rounded-full  hover:text-white font-bold hover:border-blue-500 "
                              >
                                {/* <MdSave /> */}
                                Edit
                              </Button>
                            </div>
                          ) : isAddingRow ? (
                            <div className="flex items-center gap-2">
                              <Button
                                // size="sm"
                                variant="primary"
                                onClick={() =>
                                  onCancelAdd && onCancelAdd(row.tempId)
                                }
                                className="flex font-bold cursor-pointer rounded-full hover:text-blue-500 hover:border-blue-500 border-2 border-gray-300 items-center gap-1"
                              >
                                {/* <MdCancel /> */}
                                Cancel
                              </Button>
                              <Button
                                // size="sm"
                                variant="primary"
                                onClick={() => onAdd && onAdd(row)}
                                className="cursor-pointer rounded-full hover:border-blue-500 hover:border border-transparent border bg-[#51ae3b] font-bold text-white "
                              >
                                {/* <MdSave /> */}
                                Save
                              </Button>
                            </div>
                          ) : (
                            <MdEdit
                              onClick={() => startEditing(row)}
                              size={31}
                              className=" text-[#28387e] p-2 bg-gray-200 rounded-full  cursor-pointer transition-all duration-300"
                              title="Edit Row"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </ReactDragListView.DragColumn>
        {/* Column visibility modal */}
        {menuOpen && (
          <Tooltip>
            <div className="fixed top-20 right-10 w-52 bg-white  rounded-md shadow-lg p-3 z-50">
              {/* Header */}
              <div className="flex justify-end mb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <RxCross1
                      className="cursor-pointer rounded-lg bg-[#555555] text-white p-1 hover:border-blue-500 border transition"
                      size={19}
                      onClick={() => setMenuOpen(false)}
                    />
                  </TooltipTrigger>

                  <TooltipContent
                    side="top"
                    className="bg-black text-white text-md px-2 py-1 rounded"
                  >
                    Cancel
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Columns */}
              {dragColumns.map((col) => (
                <Label
                  key={col.key}
                  className="flex hover:bg-gray-200 items-center cursor-pointer gap-2 py-1 text-sm text-gray-800"
                >
                  <Checkbox
                    checked={visibleColumns.includes(col.key)}
                    onCheckedChange={() => handleColumnToggle(col.key)}
                    className="
    cursor-pointer bg-white  hover:border-2 data-[state=checked]:bg-[#549e97] data-[state=checked]:border-black data-[state=checked]:text-white data-[state=checked]:hover:bg-blue-500 data-[state=checked]:hover:border-blue-500
  "
                  />
                  {col.title}
                </Label>
              ))}
            </div>
          </Tooltip>
        )}
      </div>

      {/* Pagination */}
      {showPagination && sortedData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={sortedData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          className="mt-6"
        />
      )}
    </div>
  );
}
