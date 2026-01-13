// import React, { useState } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableHead,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select } from "@/components/ui/select";
// import { MdEdit } from "react-icons/md";

// export default function DataTable({ data = [], columns = [], onUpdate }) {
//   const [editRowKey, setEditRowKey] = useState(null);
//   const [rowData, setRowData] = useState({});

//   const startEditing = (row) => {
//     setEditRowKey(row.pf_key);
//     setRowData(row);
//   };

//   const cancelEditing = () => {
//     setEditRowKey(null);
//     setRowData({});
//   };

//   const saveEditing = () => {
//     onUpdate?.(rowData);
//     cancelEditing();
//   };

//   const handleChange = (dataIndex, value) => {
//     setRowData((prev) => ({ ...prev, [dataIndex]: value }));
//   };

//   return (
//     <div className="overflow-x-auto">
//       <Table className="min-w-full border rounded-full">
//         <TableHeader className="bg-[#063970]">
//           <TableRow>
//             {columns.map((col) => (
//               <TableHead className=" text-white" key={col.key}>{col.title}</TableHead>
//             ))}
//             <TableHead><BsThreeDotsVertical size={18} className="text-white"/></TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.map((row, index) => {
//             const isEditing = row.pf_key === editRowKey;

//             return (
//               <TableRow key={row.pf_key} className="hover:bg-gray-50">
//                 {columns.map((col) => (
//                   <TableCell key={col.key}>
//                     {isEditing ? (
//                       col.renderInput ? (
//                         col.renderInput(rowData[col.dataIndex], (val) =>
//                           handleChange(col.dataIndex, val)
//                         )
//                       ) : (
//                         <Input
//                           value={rowData[col.dataIndex]}
//                           onChange={(e) =>
//                             handleChange(col.dataIndex, e.target.value)
//                           }
//                           className="w-32"
//                         />
//                       )
//                     ) : (
//                       row[col.dataIndex]
//                     )}
//                   </TableCell>
//                 ))}

//                 <TableCell>
//                   {isEditing ? (
//                     <div className="flex gap-2">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={cancelEditing}
//                       >
//                         Cancel
//                       </Button>
//                       <Button size="sm" onClick={saveEditing}>
//                         Save
//                       </Button>
//                     </div>
//                   ) : (

//                       <MdEdit onClick={() => startEditing(row)} size={40    } className="hover:bg-gray-400 p-2 rounded-lg transition-all duration-300"/>

//                   )}
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { MdEdit } from "react-icons/md";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableHead,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select } from "@/components/ui/select";

// export default function DataTable({ data = [], columns = [], onUpdate }) {
//   const [editRowKey, setEditRowKey] = useState(null);
//   const [rowData, setRowData] = useState({});

//   const startEditing = (row) => {
//     setEditRowKey(row.pf_key);
//     setRowData(row);
//   };

//   const cancelEditing = () => {
//     setEditRowKey(null);
//     setRowData({});
//   };

//   const saveEditing = () => {
//     onUpdate?.(rowData);
//     cancelEditing();
//   };

//   const handleChange = (dataIndex, value) => {
//     setRowData((prev) => ({ ...prev, [dataIndex]: value }));
//   };

//   return (
//     <div className="overflow-x-auto">
//       <Table className="min-w-full border border-gray-300 rounded-xl">
//         <TableHeader className="bg-[#063970] rounded-t-xl">
//           <TableRow>
//             {columns.map((col) => (
//               <TableHead
//                 className="text-white px-4 py-2 text-left font-medium"
//                 key={col.key}
//               >
//                 {col.title}
//               </TableHead>
//             ))}
//             <TableHead className="text-white px-4 py-2">
//               <BsThreeDotsVertical size={18} />
//             </TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {data.map((row) => {
//             const isEditing = row.pf_key === editRowKey;

//             return (
//               <TableRow
//                 key={row.pf_key}
//                 className="hover:bg-gray-50 transition-colors duration-200"
//               >
//                 {columns.map((col) => (
//                   <TableCell
//                     key={col.key}
//                     className="px-4 py-2 text-gray-700"
//                   >
//                     {isEditing ? (
//                       col.renderInput ? (
//                         col.renderInput(rowData[col.dataIndex], (val) =>
//                           handleChange(col.dataIndex, val)
//                         )
//                       ) : (
//                         <Input
//                           value={rowData[col.dataIndex]}
//                           onChange={(e) =>
//                             handleChange(col.dataIndex, e.target.value)
//                           }
//                           className="w-32 px-2 py-1 border border-gray-300 rounded-md"
//                         />
//                       )
//                     ) : (
//                       row[col.dataIndex]
//                     )}
//                   </TableCell>
//                 ))}

//                 <TableCell className="px-4 py-2">
//                   {isEditing ? (
//                     <div className="flex gap-2">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={cancelEditing}
//                       >
//                         Cancel
//                       </Button>
//                       <Button size="sm" onClick={saveEditing}>
//                         Save
//                       </Button>
//                     </div>
//                   ) : (
//                     <MdEdit
//                       onClick={() => startEditing(row)}
//                       size={38}
//                       className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer transition-all duration-300"
//                     />
//                   )}
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
// ----------------------------------------------------------------------------
// import React, { useState, useEffect, useRef } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { MdEdit } from "react-icons/md";
// import { FaSearch } from "react-icons/fa";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableHead,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select } from "@/components/ui/select";
// import { Tooltip } from "@/components/ui/tooltip";
// import ReactDragListView from "react-drag-listview";

// export default function DataTable({ data = [], columns = [], onUpdate }) {
//   const [editRowKey, setEditRowKey] = useState(null);
//   const [rowData, setRowData] = useState({});
//   const [dragColumns, setDragColumns] = useState(columns);
//   const [visibleColumns, setVisibleColumns] = useState(
//     columns.map((col) => col.key)
//   );
//   const [filterValues, setFilterValues] = useState({});
//   const [filterMenuOpen, setFilterMenuOpen] = useState(false);

//   const tableRef = useRef();

//   // Column drag & drop props
//   const dragProps = {
//     onDragEnd(fromIndex, toIndex) {
//       const newColumns = [...dragColumns];
//       const [moved] = newColumns.splice(fromIndex, 1);
//       newColumns.splice(toIndex, 0, moved);
//       setDragColumns(newColumns);
//     },
//     nodeSelector: "th",
//   };

//   const startEditing = (row) => {
//     setEditRowKey(row.pf_key);
//     setRowData(row);
//   };

//   const cancelEditing = () => {
//     setEditRowKey(null);
//     setRowData({});
//   };

//   const saveEditing = () => {
//     onUpdate?.(rowData);
//     cancelEditing();
//   };

//   const handleChange = (dataIndex, value) => {
//     setRowData((prev) => ({ ...prev, [dataIndex]: value }));
//   };

//   const handleColumnToggle = (key) => {
//     if (visibleColumns.includes(key)) {
//       setVisibleColumns((prev) => prev.filter((k) => k !== key));
//     } else {
//       setVisibleColumns((prev) => [...prev, key]);
//     }
//   };

//   const handleFilterChange = (key, value) => {
//     setFilterValues((prev) => ({ ...prev, [key]: value }));
//   };

//   const filteredData = data.filter((row) => {
//     return Object.keys(filterValues).every((key) => {
//       if (!filterValues[key]) return true;
//       return String(row[key])
//         .toLowerCase()
//         .includes(String(filterValues[key]).toLowerCase());
//     });
//   });

//   return (
//     <div className="overflow-x-auto relative" ref={tableRef}>
//       {/* Column visibility dropdown */}
//       <div className="absolute top-2 right-2 z-10">
//         <div className="relative">
//           {/* <Button  className="p-2 rounded-md hover:bg-gray-200"> */}
//           {/* </Button> */}
//           {filterMenuOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg p-2 z-20">
//               {dragColumns.map((col) => (
//                 <label key={col.key} className="flex items-center gap-2 py-1">
//                   <Input
//                     type="checkbox"
//                     checked={visibleColumns.includes(col.key)}
//                     onChange={() => handleColumnToggle(col.key)}
//                   />
//                   {col.title}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <ReactDragListView.DragColumn {...dragProps}>
//         <Table className="min-w-full border border-gray-300 rounded-xl">
//           <TableHeader className="bg-[#063970] rounded-t-xl">
//             <TableRow>
//               {dragColumns.map(
//                 (col) =>
//                   visibleColumns.includes(col.key) && (
//                     <TableHead
//                       key={col.key}
//                       className="text-white px-4 py-2 text-left font-medium relative"
//                     >
//                       <Tooltip content={col.description || col.title}>
//                         <div className="flex items-center gap-1">
//                           {col.title}
//                           {col.filterable && (
//                             <Input
//                               placeholder="Search..."
//                               value={filterValues[col.key] || ""}
//                               onChange={(e) =>
//                                 handleFilterChange(col.key, e.target.value)
//                               }
//                               className="ml-2 w-24 px-1 py-0.5 text-sm rounded border border-gray-300"
//                             />
//                           )}
//                         </div>
//                       </Tooltip>
//                     </TableHead>
//                   )
//               )}
//               <TableHead className="text-white px-4 py-2">
//                 {" "}
//                 <BsThreeDotsVertical
//                   size={18}
//                   onClick={() => setFilterMenuOpen((prev) => !prev)}
//                 />
//               </TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {filteredData.map((row) => {
//               const isEditing = row.pf_key === editRowKey;
//               return (
//                 <TableRow
//                   key={row.pf_key}
//                   className="hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   {dragColumns.map(
//                     (col) =>
//                       visibleColumns.includes(col.key) && (
//                         <TableCell
//                           key={col.key}
//                           className="px-4 py-2 text-gray-700"
//                         >
//                           {isEditing ? (
//                             col.renderInput ? (
//                               col.renderInput(rowData[col.key], (val) =>
//                                 handleChange(col.key, val)
//                               )
//                             ) : (
//                               <Input
//                                 value={rowData[col.key]}
//                                 onChange={(e) =>
//                                   handleChange(col.key, e.target.value)
//                                 }
//                                 className="w-32 px-2 py-1 border border-gray-300 rounded-md"
//                               />
//                             )
//                           ) : (
//                             row[col.key]
//                           )}
//                         </TableCell>
//                       )
//                   )}

//                   <TableCell className="px-4 py-2">
//                     {isEditing ? (
//                       <div className="flex gap-2">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={cancelEditing}
//                         >
//                           Cancel
//                         </Button>
//                         <Button size="sm" onClick={saveEditing}>
//                           Save
//                         </Button>
//                       </div>
//                     ) : (
//                       <MdEdit
//                         onClick={() => startEditing(row)}
//                         size={38}
//                         className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer transition-all duration-300"
//                       />
//                     )}
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </ReactDragListView.DragColumn>
//     </div>
//   );
// }

// import { useState, useRef } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { MdEdit } from "react-icons/md";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableHead,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Tooltip } from "@/components/ui/tooltip";
// import ReactDragListView from "react-drag-listview";

// export default function DataTable({ data = [], columns = [], onUpdate }) {
//   const [editRowKey, setEditRowKey] = useState(null);
//   const [rowData, setRowData] = useState({});
//   const [dragColumns, setDragColumns] = useState(columns);
//   const [visibleColumns, setVisibleColumns] = useState(
//     columns.map((col) => col.key)
//   );
//   const [filterValues, setFilterValues] = useState({});
//   const [menuOpen, setMenuOpen] = useState(false);

//   const tableRef = useRef();
//   const menuRef = useRef();

//   const dragProps = {
//     onDragEnd(fromIndex, toIndex) {
//       const newColumns = [...dragColumns];
//       const [moved] = newColumns.splice(fromIndex, 1);
//       newColumns.splice(toIndex, 0, moved);
//       setDragColumns(newColumns);
//     },
//     nodeSelector: "th",
//   };

//   const startEditing = (row) => {
//     setEditRowKey(row.pf_key);
//     setRowData(row);
//   };

//   const cancelEditing = () => {
//     setEditRowKey(null);
//     setRowData({});
//   };

//   const saveEditing = () => {
//     onUpdate?.(rowData);
//     cancelEditing();
//   };

//   const handleChange = (key, value) => {
//     setRowData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleColumnToggle = (key) => {
//     if (visibleColumns.includes(key)) {
//       setVisibleColumns((prev) => prev.filter((k) => k !== key));
//     } else {
//       setVisibleColumns((prev) => [...prev, key]);
//     }
//   };

//   const handleFilterChange = (key, value) => {
//     setFilterValues((prev) => ({ ...prev, [key]: value }));
//   };

//   const filteredData = data.filter((row) =>
//     Object.keys(filterValues).every((key) => {
//       if (!filterValues[key]) return true;
//       return String(row[key])
//         .toLowerCase()
//         .includes(String(filterValues[key]).toLowerCase());
//     })
//   );

//   return (
//     <div className="overflow-x-auto relative" ref={tableRef}>
//       <ReactDragListView.DragColumn {...dragProps}>
//         <Table className="min-w-full border border-gray-300 rounded-xl">
//           <TableHeader className="bg-[#063970] rounded-t-xl">
//             <TableRow>
//               {dragColumns.map(
//                 (col) =>
//                   visibleColumns.includes(col.key) && (
//                     <TableHead
//                       key={col.key}
//                       className="text-white px-4 py-2 text-left font-medium relative"
//                     >
//                       <Tooltip content={col.description || col.title}>
//                         <div className="flex items-center gap-1">
//                           {col.title}
//                           {col.filterable && (
//                             <Input
//                               placeholder="Search..."
//                               value={filterValues[col.key] || ""}
//                               onChange={(e) =>
//                                 handleFilterChange(col.key, e.target.value)
//                               }
//                               className="ml-2 w-24 px-1 py-0.5 text-sm rounded border border-gray-300"
//                             />
//                           )}
//                         </div>
//                       </Tooltip>
//                     </TableHead>
//                   )
//               )}
//               {/* Actions column replaced with vertical 3-dots */}
//               <TableHead className="text-white px-4 py-2 text-center relative">
//                 <BsThreeDotsVertical
//                   size={20}
//                   className="cursor-pointer"
//                   onClick={() => setMenuOpen((prev) => !prev)}
//                 />
//               </TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {filteredData.map((row, index) => {
//               const isEditing = row.pf_key === editRowKey;
//               return (
//                 <TableRow
//                   key={index}
//                   className="hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   {dragColumns.map(
//                     (col) =>
//                       visibleColumns.includes(col.key) && (
//                         <TableCell
//                           key={col.key}
//                           className="px-4 py-2 text-gray-700"
//                         >
//                           {isEditing ? (
//                             col.renderInput ? (
//                               col.renderInput(rowData[col.key], (val) =>
//                                 handleChange(col.key, val)
//                               )
//                             ) : (
//                               <Input
//                                 value={rowData[col.key]}
//                                 onChange={(e) =>
//                                   handleChange(col.key, e.target.value)
//                                 }
//                                 className="w-32 px-2 py-1 border border-gray-300 rounded-md"
//                               />
//                             )
//                           ) : (
//                             row[col.key]
//                           )}
//                         </TableCell>
//                       )
//                   )}

//                   {/* Actions column replaced with edit icon */}
//                   <TableCell className="px-4 py-2 text-center">
//                     {isEditing ? (
//                       <div className="flex gap-2 justify-center">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={cancelEditing}
//                         >
//                           Cancel
//                         </Button>
//                         <Button size="sm" onClick={saveEditing}>
//                           Save
//                         </Button>
//                       </div>
//                     ) : (
//                       <MdEdit
//                         onClick={() => startEditing(row)}
//                         size={38}
//                         className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer transition-all duration-300"
//                       />
//                     )}
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </ReactDragListView.DragColumn>

//       {/* Column visibility modal outside table scroll */}
//       {menuOpen && (
//         <div className="fixed top-20 right-10 w-52 bg-white border rounded-md shadow-lg p-3 z-50">
//           <h4 className="font-semibold mb-2 text-gray-700">
//             Show/Hide Columns
//           </h4>
//           {dragColumns.map((col) => (
//             <label
//               key={col.key}
//               className="flex items-center gap-2 py-1 text-sm text-gray-800"
//             >
//               <input
//                 type="checkbox"
//                 checked={visibleColumns.includes(col.key)}
//                 onChange={() => handleColumnToggle(col.key)}
//               />
//               {col.title}
//             </label>
//           ))}
//           <Button
//             className="mt-2 w-full text-sm"
//             onClick={() => setMenuOpen(false)}
//           >
//             Close
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
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

export default function DataTable({
  data = [],
  columns = [],
  onUpdate,
  onAdd,
  onCancelAdd,
}) {
  const [editRowKey, setEditRowKey] = useState(null);
  const [rowData, setRowData] = useState({});
  const [dragColumns, setDragColumns] = useState(columns);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.key)
  );
  const [filterValues, setFilterValues] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const tableRef = useRef();
  const menuRef = useRef();

  // Initialize dragColumns when columns change
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

  // Start editing existing row
  const startEditing = (row) => {
    setEditRowKey(row.pf_key);
    setRowData({ ...row });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditRowKey(null);
    setRowData({});
  };

  // Save edited row
  const saveEditing = () => {
    if (onUpdate) {
      onUpdate(rowData);
    }
    cancelEditing();
  };

  // Handle field changes
  const handleChange = (key, value) => {
    setRowData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle column visibility
  const handleColumnToggle = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  // Check if row is temporary (for adding)
  const isTempRow = (row) => row.isTemp === true;

  // Filter data
  const filteredData = (Array.isArray(data) ? data : []).filter((row) =>
    Object.keys(filterValues).every((key) => {
      if (!filterValues[key]) return true;
      const rowValue = row[key];
      if (rowValue === null || rowValue === undefined) return false;
      return String(rowValue)
        .toLowerCase()
        .includes(String(filterValues[key]).toLowerCase());
    })
  );

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
                      className="text-white px-4 py-2 text-left font-medium relative"
                    >
                      <Tooltip content={col.description || col.title}>
                        <div className="flex items-center gap-1">
                          {col.title}
                          {col.filterable && (
                            <Input
                              placeholder="Search..."
                              value={filterValues[col.key] || ""}
                              onChange={(e) =>
                                handleFilterChange(col.key, e.target.value)
                              }
                              className="ml-2 w-24 px-1 py-0.5 text-sm rounded border border-gray-300"
                            />
                          )}
                        </div>
                      </Tooltip>
                    </TableHead>
                  )
              )}
              <TableHead className="text-white px-4 py-2 text-center relative">
                <BsThreeDotsVertical
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setMenuOpen((prev) => !prev)}
                />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((row, index) => {
              const isEditing = row.pf_key === editRowKey;
              const isAdding = isTempRow(row);

              return (
                <TableRow
                  key={isTempRow(row) ? `temp-${index}` : row.pf_key || index}
                  className={`hover:bg-gray-50 transition-colors duration-200 ${
                    isAdding ? "bg-blue-50" : ""
                  }`}
                >
                  {dragColumns.map(
                    (col) =>
                      visibleColumns.includes(col.key) && (
                        <TableCell
                          key={col.key}
                          className="px-4 py-2 text-gray-700"
                        >
                          {isEditing || isAdding ? (
                            col.renderInput ? (
                              col.renderInput(
                                rowData[col.key] || row[col.key] || "",
                                (val) => handleChange(col.key, val)
                              )
                            ) : (
                              <Input
                                value={rowData[col.key] || row[col.key] || ""}
                                onChange={(e) =>
                                  handleChange(col.key, e.target.value)
                                }
                                className="w-32 px-2 py-1 border border-gray-300 rounded-md"
                                placeholder={col.title}
                              />
                            )
                          ) : (
                            row[col.key] || ""
                          )}
                        </TableCell>
                      )
                  )}

                  {/* Actions Column */}
                  <TableCell className="px-4 py-2 text-center">
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
                          className="flex items-center gap-1"
                        >
                          <MdSave />
                          Save
                        </Button>
                      </div>
                    ) : isAdding ? (
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
                          onClick={() => onAdd && onAdd(rowData)}
                          className="flex items-center gap-1"
                        >
                          <MdSave />
                          Save
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
            })}
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
