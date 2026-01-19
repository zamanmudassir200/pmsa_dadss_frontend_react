import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  BsThreeDotsVertical,
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsSortDown,
  BsInfoCircle,
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
import { Tooltip } from "@/components/ui/tooltip";
import ReactDragListView from "react-drag-listview";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Pagination from "@/components/Pagination/Pagination";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import SearchModal from "../Modals/SearchModal";
import FilterModal from "../Modals/FilterModal";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";
import PlatformFields from "@/adapters/platformKeys";
import { toast } from "react-toastify";
import { toastError } from "@/utils/toast";

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

  const getSortIcon = (columnKey) => {
    const state = sortStates[columnKey];
    switch (state) {
      case "asc":
        return <BsSortAlphaDown className="ml-1 text-blue-600" />;
      case "desc":
        return <BsSortAlphaUp className="ml-1 text-blue-600" />;
      default:
        return <BsSortDown className="ml-1 text-gray-400" />;
    }
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
    return <div className="text-center py-8">Loading table data...</div>;
    // return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="overflow-x-auto relative" ref={tableRef}>
        <ReactDragListView.DragColumn {...dragProps}>
          <Table className="min-w-full border border-gray-300 rounded-xl">
            <TableHeader className="bg-[#063970] rounded-t-xl">
              <TableRow className={"hover:bg-[#063970]"}>
                {dragColumns.map(
                  (col) =>
                    visibleColumns.includes(col.key) && (
                      <TableHead
                        key={col.key}
                        className="text-white r-pointer px-4 py-2 text-left font-medium relative group"
                      >
                        <div className="flex relative items-center justify-between">
                          <div className="flex items-center">
                            <Tooltip content={col.description || col.title}>
                              <div className="flex items-center ">
                                <span>{col.title}</span>
                                <TooltipTrigger>
                                  {" "}
                                  <BsInfoCircle
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
                              variant="ghost"
                              size="sm"
                              className="ml-1 p-0 h-4 w-4 text-white cursor-pointer hover:bg-white/20"
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

                            {/* Filter Icon for unique columns */}
                            {(col.filtertype === "unique" ||
                              col.filtertype === "select") && (
                              <FilterModal
                                col={col}
                                columnFilters={columnFilters}
                                setColumnFilters={setColumnFilters}
                                setCurrentPage={setCurrentPage}
                                data={data}
                              />
                            )}
                          </div>
                        </div>
                      </TableHead>
                    ),
                )}
                <TableHead className="text-white px-4 py-2 text-center sticky right-0 bg-[#063970]">
                  <div className="relative">
                    <BsThreeDotsVertical
                      size={25}
                      className="cursor-pointer hover:bg-white/20 p-1 rounded"
                      onClick={() => setMenuOpen((prev) => !prev)}
                    />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumns.length + 1}
                    className="pl-100 py-8 text-gray-500"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
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
                      className={`hover:bg-gray-50 transition-colors duration-200 ${
                        isAddingRow ? "bg-blue-50" : ""
                      }`}
                    >
                      {dragColumns.map(
                        (col) =>
                          visibleColumns.includes(col.key) && (
                            <TableCell key={col.key}>
                              {renderCellContent(
                                col,
                                row,
                                isEditing,
                                isAddingRow,
                              )}
                            </TableCell>
                          ),
                      )}

                      <TableCell className="px-4 py-2 text-center sticky right-0 bg-white">
                        {isEditing ? (
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={cancelEditing}
                              className="flex items-center gap-1"
                            >
                              <MdCancel />
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={saveEditing}
                              className="flex items-center gap-1 bg-yellow-600 text-white cursor-pointer hover:bg-yellow-700"
                            >
                              <MdSave />
                              Update
                            </Button>
                          </div>
                        ) : isAddingRow ? (
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                onCancelAdd && onCancelAdd(row.tempId)
                              }
                              className="flex items-center gap-1"
                            >
                              <MdCancel />
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => onAdd && onAdd(row)}
                              className="flex items-center gap-1 bg-green-600 text-white hover:bg-green-700"
                            >
                              <MdSave />
                              Add Platform
                            </Button>
                          </div>
                        ) : (
                          <MdEdit
                            onClick={() => startEditing(row)}
                            size={38}
                            className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer transition-all duration-300"
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
        </ReactDragListView.DragColumn>

        {/* Column visibility modal */}
        {menuOpen && (
          <div className="fixed top-20 right-10 w-52 bg-white border rounded-md shadow-lg p-3 z-50">
            <h4 className="font-semibold mb-2 text-gray-700">
              Show/Hide Columns
            </h4>
            {dragColumns.map((col) => (
              <Label
                key={col.key}
                className="flex items-center gap-2 py-1 text-sm text-gray-800"
              >
                <Checkbox
                  className={"bg-gray-200 border-black"}
                  checked={visibleColumns.includes(col.key)}
                  onCheckedChange={() => handleColumnToggle(col.key)}
                />
                {col.title}
              </Label>
            ))}
            <Button
              className="mt-2 w-full text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Close
            </Button>
          </div>
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
