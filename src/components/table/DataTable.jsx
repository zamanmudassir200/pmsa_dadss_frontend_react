import { useState, useRef, useEffect } from "react";
import { 
  BsThreeDotsVertical, 
  BsSearch,
  BsFilter,
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsSortDown,
  BsInfoCircle 
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
  
}) {
  const [editRowKey, setEditRowKey] = useState(null);
  const [rowData, setRowData] = useState({});
  const [dragColumns, setDragColumns] = useState(columns);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.key)
  );
  const [filterValues, setFilterValues] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(null);
  const [filterModalOpen, setFilterModalOpen] = useState(null);
  const [sortStates, setSortStates] = useState({});
  const [columnFilters, setColumnFilters] = useState({});

  const tableRef = useRef();
  const menuRef = useRef();

  useEffect(() => {
    setDragColumns(columns);
  }, [columns]);

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newColumns = [...dragColumns];
      const [moved] = newColumns.splice(fromIndex, 1);
      newColumns.splice(toIndex, 0, moved);
      setDragColumns(newColumns);
    },
    nodeSelector: "th",
  };

  const startEditing = (row) => {
    setEditRowKey(row.pf_key || row.tempId);
    setRowData({ ...row });
    if (onStartEdit) onStartEdit(row);
  };
  const cancelEditing = () => {
    setEditRowKey(null);
    setRowData({});
    if (onCancelEdit) onCancelEdit();
  };

  const saveEditing = () => {
    if (onUpdate) {
      onUpdate(rowData);
    }
    cancelEditing();
  };

  const handleFieldChange = (field, value) => {
    setRowData((prev) => ({ ...prev, [field]: value }));
  };

  const handleColumnToggle = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleColumnFilterChange = (columnKey, value) => {
    setColumnFilters((prev) => ({
      ...prev,
      [columnKey]: value
    }));
  };

  const handleSortClick = (columnKey) => {
    const currentState = sortStates[columnKey];
    let nextState;
    
    if (!currentState) {
      nextState = 'asc';
    } else if (currentState === 'asc') {
      nextState = 'desc';
    } else {
      nextState = null;
    }
    
    setSortStates({
      ...sortStates,
      [columnKey]: nextState
    });
  };

  const getSortIcon = (columnKey) => {
    const state = sortStates[columnKey];
    switch (state) {
      case 'asc':
        return <BsSortAlphaDown className="ml-1 text-blue-600" />;
      case 'desc':
        return <BsSortAlphaUp className="ml-1 text-blue-600" />;
      default:
        return <BsSortDown className="ml-1 text-gray-400" />;
    }
  };

  const isTempRow = (row) => row.isTemp === true || row.tempId !== undefined;

  // Filter data based on search filters
  const filteredData = (Array.isArray(data) ? data : []).filter((row) =>
    Object.keys(filterValues).every((key) => {
      if (!filterValues[key]) return true;
      const rowValue = row[key];
      if (rowValue === null || rowValue === undefined) return false;
      return String(rowValue)
        .toLowerCase()
        .includes(String(filterValues[key]).toLowerCase());
    })
  ).filter((row) =>
    Object.keys(columnFilters).every((key) => {
      const filterValue = columnFilters[key];
      if (!filterValue || filterValue.length === 0) return true;
      const rowValue = row[key];
      return filterValue.includes(rowValue);
    })
  );

  // Sort data based on sort states
  const sortedData = [...filteredData].sort((a, b) => {
    for (const [columnKey, sortState] of Object.entries(sortStates)) {
      if (sortState) {
        const aVal = a[columnKey] || '';
        const bVal = b[columnKey] || '';
        
        if (sortState === 'asc') {
          return String(aVal).localeCompare(String(bVal));
        } else if (sortState === 'desc') {
          return String(bVal).localeCompare(String(aVal));
        }
      }
    }
    return 0;
  });

  const getUniqueValues = (key) => {
    const values = data
      .map(item => item[key])
      .filter(value => value !== null && value !== undefined && value !== '');
    return [...new Set(values)];
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading table data...</div>;
  }

  return (
    <div className="overflow-x-auto relative" ref={tableRef}>
      <ReactDragListView.DragColumn {...dragProps}>
        <Table className="min-w-full border border-gray-300 rounded-xl">
          <TableHeader className="bg-[#063970] rounded-t-xl">
            <TableRow>
              {dragColumns.map(
                (col) =>
                  visibleColumns.includes(col.key) && (
                    <TableHead
                      key={col.key}
                      className="text-white px-4 py-2 text-left font-medium relative group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Tooltip content={col.description || col.title}>
                            <div className="flex items-center cursor-help">
                              <span>{col.title}</span>
                              <BsInfoCircle className="ml-1 text-white/80" size={12} />
                            </div>
                          </Tooltip>
                          
                          {/* Sort Icon */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 p-0 h-4 w-4 text-white hover:bg-white/20"
                            onClick={() => handleSortClick(col.key)}
                          >
                            {getSortIcon(col.key)}
                          </Button>
                          
                          {/* Search Icon */}
                          {col.filtertype === "search" && (
                            <Dialog open={searchModalOpen === col.key} onOpenChange={(open) => setSearchModalOpen(open ? col.key : null)}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-1 p-0 h-4 w-4 text-white hover:bg-white/20"
                                >
                                  <BsSearch size={12} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[400px]">
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
                                    <Button onClick={() => setSearchModalOpen(null)}>
                                      Apply
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          
                          {/* Filter Icon for unique columns */}
                          {(col.filtertype === "unique" || col.filtertype === "select") && (
                            <Dialog open={filterModalOpen === col.key} onOpenChange={(open) => setFilterModalOpen(open ? col.key : null)}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-1 p-0 h-4 w-4 text-white hover:bg-white/20"
                                >
                                  <BsFilter size={12} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[400px]">
                                <DialogHeader>
                                  <DialogTitle>Filter {col.title}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                  {getUniqueValues(col.key).map((value) => (
                                    <div key={value} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`filter-${col.key}-${value}`}
                                        checked={columnFilters[col.key]?.includes(value) || false}
                                        onCheckedChange={(checked) => {
                                          const currentFilters = columnFilters[col.key] || [];
                                          let newFilters;
                                          if (checked) {
                                            newFilters = [...currentFilters, value];
                                          } else {
                                            newFilters = currentFilters.filter(v => v !== value);
                                          }
                                          handleColumnFilterChange(col.key, newFilters);
                                        }}
                                      />
                                      <Label htmlFor={`filter-${col.key}-${value}`}>
                                        {value}
                                      </Label>
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
                          )}
                        </div>
                      </div>
                    </TableHead>
                  )
              )}
              <TableHead className="text-white px-4 py-2 text-center sticky right-0 bg-[#063970]">
                <div className="relative">
                  <BsThreeDotsVertical
                    size={20}
                    className="cursor-pointer hover:bg-white/20 p-1 rounded"
                    onClick={() => setMenuOpen((prev) => !prev)}
                  />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={visibleColumns.length + 1} 
                  className="text-center py-8 text-gray-500"
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row, index) => {
                const isEditing = row.pf_key === editRowKey || row.tempId === editRowKey;
                const isAddingRow = isTempRow(row);

                return (
                  <TableRow
                    key={isTempRow(row) ? `temp-${row.tempId}` : row.pf_key || index}
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      isAddingRow ? "bg-blue-50" : ""
                    }`}
                  >
                    {dragColumns.map(
                      (col) =>
                        visibleColumns.includes(col.key) && (
                          <TableCell
                            key={col.key}
                            className="px-4 py-2 text-gray-700"
                          >
                            {col.render ? col.render(
                              row[col.key] || "",
                              row,
                              index,
                              isEditing,
                              isAddingRow
                            ) : (
                              isEditing || isAddingRow ? (
                                <Input
                                  value={isEditing ? rowData[col.key] || "" : row[col.key] || ""}
                                  onChange={(e) => {
                                    if (isEditing) {
                                      handleFieldChange(col.key, e.target.value);
                                    }
                                  }}
                                  className="w-32 px-2 py-1 border border-gray-300 rounded-md"
                                  placeholder={col.title}
                                />
                              ) : (
                                row[col.key] || ""
                              )
                            )}
                          </TableCell>
                        )
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
                            className="flex items-center gap-1 bg-green-600 text-white hover:bg-green-700"
                          >
                            <MdSave />
                            Save
                          </Button>
                        </div>
                      ) : isAddingRow ? (
                        <div className="flex gap-2 justify-center">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onCancelAdd && onCancelAdd(row.tempId)}
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
            <label
              key={col.key}
              className="flex items-center gap-2 py-1 text-sm text-gray-800"
            >
              <input
                type="checkbox"
                checked={visibleColumns.includes(col.key)}
                onChange={() => handleColumnToggle(col.key)}
              />
              {col.title}
            </label>
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
  );
}