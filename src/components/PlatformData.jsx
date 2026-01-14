// import { useRef, useState } from "react";
// import DataTable from "@/components/table/DataTable";
// import { platformService } from "@/services/platformData.service";
// import { useFetch } from "@/hooks/useFetch";
// import { useMutate } from "@/hooks/useMutate";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import PageHeaderStyled from "./pageHeader/pageHeader";

// export default function Platform() {
//   const [search, setSearch] = useState("");
//   const [searchData, setSearchData] = useState("");
//   const [showInputs, setShowInputs] = useState(false);
//   const [platformKey, setPlatformKey] = useState("");
//   const [selectedType, setSelectedType] = useState(null); // Added selectedType state
//   const [selectedSquadron, setSelectedSquadron] = useState(null);
//   const [filteredDataSource, setFilteredDataSource] = useState(null);
//   const componentRef = useRef();
//   //   const viewPermission = hasPermission("view_platforms");
//   //   const addPermission = hasPermission("add_platforms");
//   //   const editPermission = hasPermission("change_platforms");
//   const { data: platforms = [], isLoading } = useFetch({
//     queryKey: ["platforms", search],
//     queryFn: () => platformService.getPlatforms({ search }),
//   });
//   const form = useForm({
//     defaultValues: {
//       pf_id: "",
//       pf_name: "",
//       pf_type: "",
//       pf_squadron: "",
//       pf_status: "",
//       pf_co: "",
//       pf_fuelcap: "",
//       pf_watercap: "",
//       pf_info: "",
//     },
//   });

//   const createPlatform = useMutate({
//     mutationFn: platformService.createPlatform,
//     invalidateKey: ["platforms"],
//   });

//   const updatePlatform = useMutate({
//     mutationFn: (payload) =>
//       platformService.updatePlatform({
//         id: payload.pf_key,
//         payload,
//       }),
//     invalidateKey: ["platforms"],
//   });
//   const reset = () => {
//     setPlatformKey("");
//     setSelectedType(null);
//     setSelectedSquadron(null);
//     form.reset();
//   };
//   const handleUpdate = (rowData) => {
//     updatePlatform.mutate(rowData, {
//       onSuccess: () => toast.success("Platform updated!"),
//       onError: () => toast.error("Failed"),
//     });
//   };
//   const handleShowInput = () => {
//     setShowInputs(true);
//     reset();
//   };

//   //   const columns = [
//   //     {
//   //       title: "Platform ID",
//   //       dataIndex: "pf_id",
//   //       key: "pf_id",
//   //       filtertype: "search",
//   //     //   renderInput: (value, onChange) => (
//   //     //     <Input
//   //     //       value={value}
//   //     //       placeholder="Platform ID"
//   //     //       onChange={(e) => onChange(e.target.value)}
//   //     //       className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//   //     //     />
//   //     //   ),
//   //       render: (text, record, index) => {
//   //         if ((showInputs && index === 0) | isPlatformEditing(index)) {
//   //           return (
//   //             <StyledInput>
//   //               <InputBox
//   //                 style={{ width: 150 }}
//   //                 placeholder="Platform ID"
//   //                 name="pf_id"
//   //                 minLength={1}
//   //                 maxLength={50}
//   //                 rules={[
//   //                   req_rule,

//   //                 ]}
//   //               />
//   //             </StyledInput>
//   //           );
//   //         } else {
//   //           return text;
//   //         }
//   //       },
//   //     },
//   //     {
//   //       title: "Full Name",
//   //       dataIndex: "pf_name",
//   //       key: "pf_name",
//   //       filtertype: "search",
//   //       renderInput: (value, onChange) => (
//   //         <Input
//   //           value={value}
//   //           placeholder="Full Name"
//   //           onChange={(e) => onChange(e.target.value)}
//   //           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//   //         />
//   //       ),
//   //     },
//   //     {
//   //       title: "Type",
//   //       dataIndex: "pf_type",
//   //       key: "pf_type",
//   //       filtertype: "unique",
//   //       renderInput: (value, onChange) => (
//   //         <div className="relative w-36">
//   //           <Select value={value} onValueChange={onChange} className="relative">
//   //             <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//   //               <SelectValue placeholder="Select Type" />
//   //             </SelectTrigger>
//   //             <SelectContent className="z-50 absolute top-10 left-1 w-full">
//   //               <SelectItem value="Aircraft">Aircraft</SelectItem>
//   //               <SelectItem value="Ship">Ship</SelectItem>
//   //               <SelectItem value="Others">Others</SelectItem>
//   //             </SelectContent>
//   //           </Select>
//   //         </div>
//   //       ),
//   //     },
//   //     {
//   //       title: "Squadron",
//   //       dataIndex: "pf_squadron",
//   //       key: "pf_squadron",
//   //       filtertype: "unique",
//   //       renderInput: (value, onChange) => (
//   //         <div className="relative w-36">
//   //           <Select value={value} onValueChange={onChange} className="">
//   //             <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//   //               <SelectValue
//   //                 placeholder="Select Squadron"
//   //                 className="placeholer:text-gray-300"
//   //               />
//   //             </SelectTrigger>
//   //             <SelectContent className="z-50 absolute top-10 w-full">
//   //               <SelectItem value="Vessel A">Vessel A</SelectItem>
//   //               <SelectItem value="Vessel B">Vessel B</SelectItem>
//   //               <SelectItem value="Others">Others</SelectItem>
//   //             </SelectContent>
//   //           </Select>
//   //         </div>
//   //       ),
//   //     },
//   //     {
//   //       title: "Status",
//   //       dataIndex: "pf_status",
//   //       key: "pf_status",
//   //       filtertype: "unique",
//   //       renderInput: (value, onChange) => (
//   //         <div className="relative w-36">
//   //           <Select value={value} onValueChange={onChange} className="">
//   //             <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//   //               <SelectValue placeholder="Select Status" />
//   //             </SelectTrigger>
//   //             <SelectContent className="z-50 absolute top-10  w-full">
//   //               <SelectItem value="OPS">OPS</SelectItem>
//   //               <SelectItem value="Non-OPS">Non-OPS</SelectItem>
//   //             </SelectContent>
//   //           </Select>
//   //         </div>
//   //       ),
//   //     },
//   //     {
//   //       title: "CO",
//   //       dataIndex: "pf_co",
//   //       key: "pf_co",
//   //       renderInput: (value, onChange) => (
//   //         <Input
//   //           value={value}
//   //           placeholder="CO"
//   //           onChange={(e) => onChange(e.target.value)}
//   //           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//   //         />
//   //       ),
//   //     },
//   //     {
//   //       title: "Fuel Capacity",
//   //       dataIndex: "pf_fuelcap",
//   //       key: "pf_fuelcap",
//   //       renderInput: (value, onChange) => (
//   //         <Input
//   //           value={value}
//   //           placeholder="Fuel Capacity"
//   //           onChange={(e) => onChange(e.target.value)}
//   //           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//   //         />
//   //       ),
//   //     },
//   //     {
//   //       title: "Fresh Water Capacity",
//   //       dataIndex: "pf_watercap",
//   //       key: "pf_watercap",
//   //       renderInput: (value, onChange) => (
//   //         <Input
//   //           value={value}
//   //           placeholder="Fresh Water Capacity"
//   //           onChange={(e) => onChange(e.target.value)}
//   //           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//   //         />
//   //       ),
//   //     },
//   //     {
//   //       title: "Other Info",
//   //       dataIndex: "pf_info",
//   //       key: "pf_info",
//   //       renderInput: (value, onChange) => (
//   //         <Input
//   //           value={value}
//   //           placeholder="Other Info"
//   //           onChange={(e) => onChange(e.target.value)}
//   //           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//   //         />
//   //       ),
//   //     },
//   //   ];
//   const columns = [
//     {
//       title: "Platform ID",
//       dataIndex: "pf_id",
//       key: "pf_id",
//       filtertype: "search",
//       render: (text, record, index) =>
//         (showInputs && index === 0) || isPlatformEditing(index) ? (
//           <Input
//             value={record.pf_id}
//             placeholder="Platform ID"
//             onChange={(e) => handleChange("pf_id", e.target.value)}
//             className="w-36 border rounded-md px-2 py-1"
//           />
//         ) : (
//           text
//         ),
//     },
//     {
//       title: "Full Name",
//       dataIndex: "pf_name",
//       key: "pf_name",
//       filtertype: "search",
//       render: (text, record, index) =>
//         (showInputs && index === 0) || isPlatformEditing(index) ? (
//           <Input
//             value={record.pf_name}
//             placeholder="Full Name"
//             onChange={(e) => handleChange("pf_name", e.target.value)}
//             className="w-36 border rounded-md px-2 py-1"
//           />
//         ) : (
//           text
//         ),
//     },
//     {
//       title: "Type",
//       dataIndex: "pf_type",
//       key: "pf_type",
//       filtertype: "unique",
//       render: (text, record, index) =>
//         (showInputs && index === 0) || isPlatformEditing(index) ? (
//           <div className="w-36">
//             <Select
//               value={record.pf_type}
//               onValueChange={(val) => handleChange("pf_type", val)}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Aircraft">Aircraft</SelectItem>
//                 <SelectItem value="Ship">Ship</SelectItem>
//                 <SelectItem value="Others">Others</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         ) : (
//           text
//         ),
//     },
//     {
//       title: "Squadron",
//       dataIndex: "pf_squadron",
//       key: "pf_squadron",
//       filtertype: "unique",
//       render: (text, record, index) =>
//         (showInputs && index === 0) || isPlatformEditing(index) ? (
//           <div className="w-36">
//             <Select
//               value={record.pf_squadron}
//               onValueChange={(val) => handleChange("pf_squadron", val)}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Squadron" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Vessel A">Vessel A</SelectItem>
//                 <SelectItem value="Vessel B">Vessel B</SelectItem>
//                 <SelectItem value="Others">Others</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         ) : (
//           text
//         ),
//     },
//     {
//       title: "Status",
//       dataIndex: "pf_status",
//       key: "pf_status",
//       filtertype: "unique",
//       render: (text, record, index) =>
//         (showInputs && index === 0) || isPlatformEditing(index) ? (
//           <div className="w-36">
//             <Select
//               value={record.pf_status}
//               onValueChange={(val) => handleChange("pf_status", val)}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="OPS">OPS</SelectItem>
//                 <SelectItem value="Non-OPS">Non-OPS</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         ) : (
//           text
//         ),
//     },
//     {
//       title: "CO",
//       dataIndex: "pf_co",
//       key: "pf_co",
//       render: (text, record, index) =>
//         (showInputs && index === 0) || isPlatformEditing(index) ? (
//           <Input
//             value={record.pf_co}
//             placeholder="CO"
//             onChange={(e) => handleChange("pf_co", e.target.value)}
//             className="w-36 border rounded-md px-2 py-1"
//           />
//         ) : (
//           text
//         ),
//     },
//     {
//       title: "Fuel Capacity",
//       dataIndex: "pf_fuelcap",
//       key: "pf_fuelcap",
//       render: (text, record, index) =>
//         (showInputs && index === 0) || isPlatformEditing(index) ? (
//           <Input
//             value={record.pf_fuelcap}
//             placeholder="Fuel Capacity"
//             onChange={(e) => handleChange("pf_fuelcap", e.target.value)}
//             className="w-36 border rounded-md px-2 py-1"
//           />
//         ) : (
//           text
//         ),
//     },
//     {
//       title: "Fresh Water Capacity",
//       dataIndex: "pf_watercap",
//       key: "pf_watercap",
//       render: (text, record, index) =>
//         (showInputs && index === 0) || isPlatformEditing(index) ? (
//           <Input
//             value={record.pf_watercap}
//             placeholder="Fresh Water Capacity"
//             onChange={(e) => handleChange("pf_watercap", e.target.value)}
//             className="w-36 border rounded-md px-2 py-1"
//           />
//         ) : (
//           text
//         ),
//     },
//     {
//       title: "Other Info",
//       dataIndex: "pf_info",
//       key: "pf_info",
//       render: (text, record, index) =>
//         (showInputs && index === 0) || isPlatformEditing(index) ? (
//           <Input
//             value={record.pf_info}
//             placeholder="Other Info"
//             onChange={(e) => handleChange("pf_info", e.target.value)}
//             className="w-36 border rounded-md px-2 py-1"
//           />
//         ) : (
//           text
//         ),
//     },
//   ];

//   return (
//     <div className="p-6 space-y-4">
//       <div className="">
//         <PageHeaderStyled
//           hover="Rapid access to platform data"
//           title="Platform Data"
//           btnTitle={"Add Platform"} // Render the button only if access is not denied
//           btnTitleMedia="+"
//           onSearchChange={setSearchData}
//           onNavigate={handleShowInput}
//           placeholder="Search by Platform ID / Full Name "
//           showButton={true}
//           //   currentData={viewPermission ? filteredDataSource : null}
//           //   componentRef={viewPermission ? componentRef : null}
//         />
//       </div>
//       <div className="flex gap-2 mb-4">
//         <Input
//           placeholder="Search platform"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border rounded-md px-2 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>
//      <DataTable
//         data={
//           showInputs
//             ? [
//                 {
//                   pf_id: "",
//                   pf_name: "",
//                   pf_co: "",
//                   pf_info: "",
//                   pf_status: null,
//                   pf_rdt: null,
//                   pf_type: "",
//                   pf_squadron: "",
//                 },
//                 ...(Array.isArray(platforms) ? platforms : []),
//               ]
//             : Array.isArray(platforms)
//             ? platforms
//             : []
//         }
//         columns={columns}
//         onUpdate={handleUpdate}
//       />
//     </div>
//   );
// }
// import { useRef, useState } from "react";
// import DataTable from "@/components/table/DataTable";
// import { platformService } from "@/services/platformData.service";
// import { useFetch } from "@/hooks/useFetch";
// import { useMutate } from "@/hooks/useMutate";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import PageHeaderStyled from "./pageHeader/pageHeader";

// export default function Platform() {
//   const [search, setSearch] = useState("");
//   const [showAddRow, setShowAddRow] = useState(false);
//   const [tempRowData, setTempRowData] = useState({
//     pf_id: "",
//     pf_name: "",
//     pf_type: "",
//     pf_squadron: "",
//     pf_status: "",
//     pf_co: "",
//     pf_fuelcap: "",
//     pf_watercap: "",
//     pf_info: "",
//   });
//   const [editingRowKey, setEditingRowKey] = useState(null);
//   const componentRef = useRef();

//   const { data: platforms = [], isLoading, refetch } = useFetch({
//     queryKey: ["platforms", search],
//     queryFn: () => platformService.getPlatforms({ search }),
//   });

//   const createPlatform = useMutate({
//     mutationFn: platformService.createPlatform,
//     invalidateKey: ["platforms"],
//     onSuccess: () => {
//       toast.success("Platform created successfully!");
//       setShowAddRow(false);
//       setTempRowData({
//         pf_id: "",
//         pf_name: "",
//         pf_type: "",
//         pf_squadron: "",
//         pf_status: "",
//         pf_co: "",
//         pf_fuelcap: "",
//         pf_watercap: "",
//         pf_info: "",
//       });
//     },
//     onError: (error) => {
//       toast.error(`Failed to create platform: ${error.message}`);
//     },
//   });

//   const updatePlatform = useMutate({
//     mutationFn: (payload) =>
//       platformService.updatePlatform({
//         id: payload.pf_key,
//         payload,
//       }),
//     invalidateKey: ["platforms"],
//     onSuccess: () => {
//       toast.success("Platform updated successfully!");
//       setEditingRowKey(null);
//     },
//     onError: (error) => {
//       toast.error(`Failed to update platform: ${error.message}`);
//     },
//   });

//   const handleAddRow = () => {
//     setShowAddRow(true);
//     setEditingRowKey(null);
//   };

//   const handleCancelAdd = () => {
//     setShowAddRow(false);
//     setTempRowData({
//       pf_id: "",
//       pf_name: "",
//       pf_type: "",
//       pf_squadron: "",
//       pf_status: "",
//       pf_co: "",
//       pf_fuelcap: "",
//       pf_watercap: "",
//       pf_info: "",
//     });
//   };

//   const handleSaveAdd = () => {
//     // Validate required fields
//     if (!tempRowData.pf_id || !tempRowData.pf_name) {
//       toast.error("Platform ID and Full Name are required");
//       return;
//     }

//     createPlatform.mutate(tempRowData);
//   };

//   const handleUpdate = (rowData) => {
//     updatePlatform.mutate(rowData);
//   };

//   const handleTempFieldChange = (field, value) => {
//     setTempRowData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const isEditing = (row) => {
//     return row.pf_key === editingRowKey;
//   };

//   const columns = [
//     {
//       title: "Platform ID",
//       dataIndex: "pf_id",
//       key: "pf_id",
//       filtertype: "search",
//       render: (text, record, index) => {
//         if (showAddRow && index === 0) {
//           return (
//             <Input
//               value={tempRowData.pf_id}
//               placeholder="Platform ID"
//               onChange={(e) => handleTempFieldChange("pf_id", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing(record)) {
//           return (
//             <Input
//               value={record.pf_id}
//               placeholder="Platform ID"
//               onChange={(e) => handleUpdateField(record.pf_key, "pf_id", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Full Name",
//       dataIndex: "pf_name",
//       key: "pf_name",
//       filtertype: "search",
//       render: (text, record, index) => {
//         if (showAddRow && index === 0) {
//           return (
//             <Input
//               value={tempRowData.pf_name}
//               placeholder="Full Name"
//               onChange={(e) => handleTempFieldChange("pf_name", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing(record)) {
//           return (
//             <Input
//               value={record.pf_name}
//               placeholder="Full Name"
//               onChange={(e) => handleUpdateField(record.pf_key, "pf_name", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
// {
//   title: "Type",
//   dataIndex: "pf_type",
//   key: "pf_type",
//   filtertype: "unique",
//   render: (text, record, index) => {
//     if (showAddRow && index === 0) {
//       return (
//         <div className="relative w-36">
//           <Select
//             value={tempRowData.pf_type}
//             onValueChange={(val) => handleTempFieldChange("pf_type", val)}
//             className="relative"
//           >
//             <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//               <SelectValue placeholder="Select Type" />
//             </SelectTrigger>
//             <SelectContent className="z-50 absolute top-10 left-1 w-full">
//               <SelectItem value="Aircraft">Aircraft</SelectItem>
//               <SelectItem value="Ship">Ship</SelectItem>
//               <SelectItem value="Others">Others</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       );
//     } else if (isEditing(record)) {
//       return (
//         <div className="relative w-36">
//           <Select
//             value={record.pf_type}
//             onValueChange={(val) => handleUpdateField(record.pf_key, "pf_type", val)}
//             className="relative"
//           >
//             <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//               <SelectValue placeholder="Select Type" />
//             </SelectTrigger>
//             <SelectContent className="z-50 absolute top-10 left-1 w-full">
//               <SelectItem value="Aircraft">Aircraft</SelectItem>
//               <SelectItem value="Ship">Ship</SelectItem>
//               <SelectItem value="Others">Others</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       );
//     } else {
//       return text;
//     }
//   },
// },
// {
//   title: "Squadron",
//   dataIndex: "pf_squadron",
//   key: "pf_squadron",
//   filtertype: "unique",
//   render: (text, record, index) => {
//     if (showAddRow && index === 0) {
//       return (
//         <div className="relative w-36">
//           <Select
//             value={tempRowData.pf_squadron}
//             onValueChange={(val) => handleTempFieldChange("pf_squadron", val)}
//             className=""
//           >
//             <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//               <SelectValue
//                 placeholder="Select Squadron"
//                 className="placeholer:text-gray-300"
//               />
//             </SelectTrigger>
//             <SelectContent className="z-50 absolute top-10 w-full">
//               <SelectItem value="Vessel A">Vessel A</SelectItem>
//               <SelectItem value="Vessel B">Vessel B</SelectItem>
//               <SelectItem value="Others">Others</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       );
//     } else if (isEditing(record)) {
//       return (
//         <div className="relative w-36">
//           <Select
//             value={record.pf_squadron}
//             onValueChange={(val) => handleUpdateField(record.pf_key, "pf_squadron", val)}
//             className=""
//           >
//             <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//               <SelectValue
//                 placeholder="Select Squadron"
//                 className="placeholer:text-gray-300"
//               />
//             </SelectTrigger>
//             <SelectContent className="z-50 absolute top-10 w-full">
//               <SelectItem value="Vessel A">Vessel A</SelectItem>
//               <SelectItem value="Vessel B">Vessel B</SelectItem>
//               <SelectItem value="Others">Others</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       );
//     } else {
//       return text;
//     }
//   },
// },
// {
//   title: "Status",
//   dataIndex: "pf_status",
//   key: "pf_status",
//   filtertype: "unique",
//   render: (text, record, index) => {
//     if (showAddRow && index === 0) {
//       return (
//         <div className="relative w-36">
//           <Select
//             value={tempRowData.pf_status}
//             onValueChange={(val) => handleTempFieldChange("pf_status", val)}
//             className=""
//           >
//             <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//               <SelectValue placeholder="Select Status" />
//             </SelectTrigger>
//             <SelectContent className="z-50 absolute top-10 w-full">
//               <SelectItem value="OPS">OPS</SelectItem>
//               <SelectItem value="Non-OPS">Non-OPS</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       );
//     } else if (isEditing(record)) {
//       return (
//         <div className="relative w-36">
//           <Select
//             value={record.pf_status}
//             onValueChange={(val) => handleUpdateField(record.pf_key, "pf_status", val)}
//             className=""
//           >
//             <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//               <SelectValue placeholder="Select Status" />
//             </SelectTrigger>
//             <SelectContent className="z-50 absolute top-10 w-full">
//               <SelectItem value="OPS">OPS</SelectItem>
//               <SelectItem value="Non-OPS">Non-OPS</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       );
//     } else {
//       return text;
//     }
//   },
// },
// {
//   title: "CO",
//   dataIndex: "pf_co",
//   key: "pf_co",
//   render: (text, record, index) => {
//     if (showAddRow && index === 0) {
//       return (
//         <Input
//           value={tempRowData.pf_co}
//           placeholder="CO"
//           onChange={(e) => handleTempFieldChange("pf_co", e.target.value)}
//           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       );
//     } else if (isEditing(record)) {
//       return (
//         <Input
//           value={record.pf_co}
//           placeholder="CO"
//           onChange={(e) => handleUpdateField(record.pf_key, "pf_co", e.target.value)}
//           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       );
//     } else {
//       return text;
//     }
//   },
// },
// {
//   title: "Fuel Capacity",
//   dataIndex: "pf_fuelcap",
//   key: "pf_fuelcap",
//   render: (text, record, index) => {
//     if (showAddRow && index === 0) {
//       return (
//         <Input
//           value={tempRowData.pf_fuelcap}
//           placeholder="Fuel Capacity"
//           onChange={(e) => handleTempFieldChange("pf_fuelcap", e.target.value)}
//           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       );
//     } else if (isEditing(record)) {
//       return (
//         <Input
//           value={record.pf_fuelcap}
//           placeholder="Fuel Capacity"
//           onChange={(e) => handleUpdateField(record.pf_key, "pf_fuelcap", e.target.value)}
//           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       );
//     } else {
//       return text;
//     }
//   },
// },
// {
//   title: "Fresh Water Capacity",
//   dataIndex: "pf_watercap",
//   key: "pf_watercap",
//   render: (text, record, index) => {
//     if (showAddRow && index === 0) {
//       return (
//         <Input
//           value={tempRowData.pf_watercap}
//           placeholder="Fresh Water Capacity"
//           onChange={(e) => handleTempFieldChange("pf_watercap", e.target.value)}
//           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       );
//     } else if (isEditing(record)) {
//       return (
//         <Input
//           value={record.pf_watercap}
//           placeholder="Fresh Water Capacity"
//           onChange={(e) => handleUpdateField(record.pf_key, "pf_watercap", e.target.value)}
//           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       );
//     } else {
//       return text;
//     }
//   },
// },
// {
//   title: "Other Info",
//   dataIndex: "pf_info",
//   key: "pf_info",
//   render: (text, record, index) => {
//     if (showAddRow && index === 0) {
//       return (
//         <Input
//           value={tempRowData.pf_info}
//           placeholder="Other Info"
//           onChange={(e) => handleTempFieldChange("pf_info", e.target.value)}
//           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       );
//     } else if (isEditing(record)) {
//       return (
//         <Input
//           value={record.pf_info}
//           placeholder="Other Info"
//           onChange={(e) => handleUpdateField(record.pf_key, "pf_info", e.target.value)}
//           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       );
//     } else {
//       return text;
//     }
//   },
// },
//   ];

//   // Create data for table
//   const tableData = showAddRow
//     ? [{ isTemp: true, ...tempRowData }, ...(platforms || [])]
//     : platforms || [];

//   return (
//     <div className="p-6 space-y-4">
//       <div className="">
//         <PageHeaderStyled
//           hover="Rapid access to platform data"
//           title="Platform Data"
//           btnTitle="Add Platform"
//           btnTitleMedia="+"
//           onSearchChange={setSearch}
//           onNavigate={handleAddRow}
//           placeholder="Search by Platform ID / Full Name"
//           showButton={true}
//           searchBox={true}
//           componentRef={componentRef}
//           currentData={platforms}
//         />
//       </div>

//       <DataTable
//         data={tableData}
//         columns={columns}
//         onUpdate={handleUpdate}
//         onAdd={handleSaveAdd}
//         onCancelAdd={handleCancelAdd}
//         isAdding={showAddRow}
//         onStartEdit={(row) => setEditingRowKey(row.pf_key)}
//         onCancelEdit={() => setEditingRowKey(null)}
//       />
//     </div>
//   );
// }

// import { useRef, useState } from "react";
// import DataTable from "@/components/table/DataTable";
// import { platformService } from "@/services/platformData.service";
// import { useFetch } from "@/hooks/useFetch";
// import { useMutate } from "@/hooks/useMutate";
// import { toast } from "react-toastify";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import PageHeaderStyled from "./pageHeader/pageHeader";
// import { useStore } from "@/store/store"; // Update path accordingly

// export default function Platform() {
//   const [search, setSearch] = useState("");
//   const [showAddRow, setShowAddRow] = useState(false);
//   const [editingRowKey, setEditingRowKey] = useState(null);
//   const componentRef = useRef();

//   // Use store for state management
//   const {
//     platforms,
//     tempRows,
//     editingRow,
//     setPlatforms,
//     addTempRow,
//     removeTempRow,
//     updateTempRow,
//     updateRow,
//     clearTempRows,
//     setEditingRow,
//     clearEditingRow
//   } = useStore();

//   const { data: platformsData = [], isLoading, refetch } = useFetch({
//     queryKey: ["platforms", search],
//     queryFn: () => platformService.getPlatforms({ search }),
//     onSuccess: (data) => {
//     console.log("API Response Data:", platformsData);
//       setPlatforms( );
//     },
//   });

//   const createPlatform = useMutate({
//     mutationFn: platformService.createPlatform,
//     invalidateKey: ["platforms"],
//     onSuccess: () => {
//       toast.success("Platform created successfully");
//       setShowAddRow(false);
//       clearTempRows();
//       refetch();
//     },
//     onError: (error) => {
//       toast.error(`Error during creating platform: ${error.message}`);
//     },
//   });

//   const updatePlatform = useMutate({
//     mutationFn: ({ id, payload }) =>
//       platformService.updatePlatform({ id, payload }),
//     invalidateKey: ["platforms"],
//     onSuccess: () => {
//       toast.success("Platform updated successfully");
//       clearEditingRow();
//       setEditingRowKey(null);
//       refetch();
//     },
//     onError: (error) => {
//       toast.error(`Error during updating platform: ${error.message}`);
//     },
//   });

//   const handleAddRow = () => {
//     const tempId = Date.now().toString();
//     addTempRow(tempId);
//     setShowAddRow(true);
//     setEditingRowKey(null);
//     clearEditingRow();
//   };

//   const handleCancelAdd = (tempId) => {
//     removeTempRow(tempId);
//     if (tempRows.length <= 1) {
//       setShowAddRow(false);
//     }
//   };

//   const handleSaveAdd = (tempRowData) => {
//     // Validate required fields
//     if (!tempRowData.pf_id || !tempRowData.pf_name) {
//       toast.error("Platform ID aur Full Name are required");
//       return;
//     }

//     createPlatform.mutate(tempRowData);
//   };

//   const handleUpdate = (rowData) => {
//     updatePlatform.mutate({
//       id: rowData.pf_key,
//       payload: rowData
//     });
//   };

//   const handleTempFieldChange = (tempId, field, value) => {
//     updateTempRow(tempId, field, value);
//   };

//   const handleUpdateField = (pf_key, field, value) => {
//     updateRow(pf_key, field, value);
//   };

//   const isEditing = (row) => {
//     return row.pf_key === editingRowKey || editingRow?.pf_key === row.pf_key;
//   };

//   const columns = [
//     {
//       title: "Platform ID",
//       dataIndex: "pf_id",
//       key: "pf_id",
//       filtertype: "search",
//       description: "Platform unique id ",
//       render: (text, record, index, isEditing, isAddingRow) => {
//         if (isAddingRow) {
//           return (
//             <Input
//               value={record.pf_id || ""}
//               placeholder="Platform ID"
//               onChange={(e) => handleTempFieldChange(record.tempId, "pf_id", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing) {
//           return (
//             <Input
//               value={record.pf_id || ""}
//               placeholder="Platform ID"
//               onChange={(e) => handleUpdateField(record.pf_key, "pf_id", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Full Name",
//       dataIndex: "pf_name",
//       key: "pf_name",
//       filtertype: "search",
//       description: "Platform Full Name",
//       render: (text, record, index, isEditing, isAddingRow) => {
//         if (isAddingRow) {
//           return (
//             <Input
//               value={record.pf_name || ""}
//               placeholder="Full Name"
//               onChange={(e) => handleTempFieldChange(record.tempId, "pf_name", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing) {
//           return (
//             <Input
//               value={record.pf_name || ""}
//               placeholder="Full Name"
//               onChange={(e) => handleUpdateField(record.pf_key, "pf_name", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//      {
//       title: "Type",
//       dataIndex: "pf_type",
//       key: "pf_type",
//       filtertype: "unique",
//       render: (text, record, index) => {
//         if (showAddRow && index === 0) {
//           return (
//             <div className="relative w-36">
//               <Select
//                 value={tempRowData.pf_type}
//                 onValueChange={(val) => handleTempFieldChange("pf_type", val)}
//                 className="relative"
//               >
//                 <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//                   <SelectValue placeholder="Select Type" />
//                 </SelectTrigger>
//                 <SelectContent className="z-50 absolute top-10 left-1 w-full">
//                   <SelectItem value="Aircraft">Aircraft</SelectItem>
//                   <SelectItem value="Ship">Ship</SelectItem>
//                   <SelectItem value="Others">Others</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           );
//         } else if (isEditing(record)) {
//           return (
//             <div className="relative w-36">
//               <Select
//                 value={record.pf_type}
//                 onValueChange={(val) => handleUpdateField(record.pf_key, "pf_type", val)}
//                 className="relative"
//               >
//                 <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//                   <SelectValue placeholder="Select Type" />
//                 </SelectTrigger>
//                 <SelectContent className="z-50 absolute top-10 left-1 w-full">
//                   <SelectItem value="Aircraft">Aircraft</SelectItem>
//                   <SelectItem value="Ship">Ship</SelectItem>
//                   <SelectItem value="Others">Others</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Squadron",
//       dataIndex: "pf_squadron",
//       key: "pf_squadron",
//       filtertype: "unique",
//       render: (text, record, index) => {
//         if (showAddRow && index === 0) {
//           return (
//             <div className="relative w-36">
//               <Select
//                 value={tempRowData.pf_squadron}
//                 onValueChange={(val) => handleTempFieldChange("pf_squadron", val)}
//                 className=""
//               >
//                 <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//                   <SelectValue
//                     placeholder="Select Squadron"
//                     className="placeholer:text-gray-300"
//                   />
//                 </SelectTrigger>
//                 <SelectContent className="z-50 absolute top-10 w-full">
//                   <SelectItem value="Vessel A">Vessel A</SelectItem>
//                   <SelectItem value="Vessel B">Vessel B</SelectItem>
//                   <SelectItem value="Others">Others</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           );
//         } else if (isEditing(record)) {
//           return (
//             <div className="relative w-36">
//               <Select
//                 value={record.pf_squadron}
//                 onValueChange={(val) => handleUpdateField(record.pf_key, "pf_squadron", val)}
//                 className=""
//               >
//                 <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//                   <SelectValue
//                     placeholder="Select Squadron"
//                     className="placeholer:text-gray-300"
//                   />
//                 </SelectTrigger>
//                 <SelectContent className="z-50 absolute top-10 w-full">
//                   <SelectItem value="Vessel A">Vessel A</SelectItem>
//                   <SelectItem value="Vessel B">Vessel B</SelectItem>
//                   <SelectItem value="Others">Others</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Status",
//       dataIndex: "pf_status",
//       key: "pf_status",
//       filtertype: "unique",
//       render: (text, record, index) => {
//         if (showAddRow && index === 0) {
//           return (
//             <div className="relative w-36">
//               <Select
//                 value={tempRowData.pf_status}
//                 onValueChange={(val) => handleTempFieldChange("pf_status", val)}
//                 className=""
//               >
//                 <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//                   <SelectValue placeholder="Select Status" />
//                 </SelectTrigger>
//                 <SelectContent className="z-50 absolute top-10 w-full">
//                   <SelectItem value="OPS">OPS</SelectItem>
//                   <SelectItem value="Non-OPS">Non-OPS</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           );
//         } else if (isEditing(record)) {
//           return (
//             <div className="relative w-36">
//               <Select
//                 value={record.pf_status}
//                 onValueChange={(val) => handleUpdateField(record.pf_key, "pf_status", val)}
//                 className=""
//               >
//                 <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//                   <SelectValue placeholder="Select Status" />
//                 </SelectTrigger>
//                 <SelectContent className="z-50 absolute top-10 w-full">
//                   <SelectItem value="OPS">OPS</SelectItem>
//                   <SelectItem value="Non-OPS">Non-OPS</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "CO",
//       dataIndex: "pf_co",
//       key: "pf_co",
//       render: (text, record, index) => {
//         if (showAddRow && index === 0) {
//           return (
//             <Input
//               value={tempRowData.pf_co}
//               placeholder="CO"
//               onChange={(e) => handleTempFieldChange("pf_co", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing(record)) {
//           return (
//             <Input
//               value={record.pf_co}
//               placeholder="CO"
//               onChange={(e) => handleUpdateField(record.pf_key, "pf_co", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Fuel Capacity",
//       dataIndex: "pf_fuelcap",
//       key: "pf_fuelcap",
//       render: (text, record, index) => {
//         if (showAddRow && index === 0) {
//           return (
//             <Input
//               value={tempRowData.pf_fuelcap}
//               placeholder="Fuel Capacity"
//               onChange={(e) => handleTempFieldChange("pf_fuelcap", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing(record)) {
//           return (
//             <Input
//               value={record.pf_fuelcap}
//               placeholder="Fuel Capacity"
//               onChange={(e) => handleUpdateField(record.pf_key, "pf_fuelcap", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Fresh Water Capacity",
//       dataIndex: "pf_watercap",
//       key: "pf_watercap",
//       render: (text, record, index) => {
//         if (showAddRow && index === 0) {
//           return (
//             <Input
//               value={tempRowData.pf_watercap}
//               placeholder="Fresh Water Capacity"
//               onChange={(e) => handleTempFieldChange("pf_watercap", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing(record)) {
//           return (
//             <Input
//               value={record.pf_watercap}
//               placeholder="Fresh Water Capacity"
//               onChange={(e) => handleUpdateField(record.pf_key, "pf_watercap", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Other Info",
//       dataIndex: "pf_info",
//       key: "pf_info",
//       render: (text, record, index) => {
//         if (showAddRow && index === 0) {
//           return (
//             <Input
//               value={tempRowData.pf_info}
//               placeholder="Other Info"
//               onChange={(e) => handleTempFieldChange("pf_info", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing(record)) {
//           return (
//             <Input
//               value={record.pf_info}
//               placeholder="Other Info"
//               onChange={(e) => handleUpdateField(record.pf_key, "pf_info", e.target.value)}
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//   ];

//   // Create data for table
//   const tableData = [...tempRows, ...(platforms || [])];

//   return (
//     <div className="p-6 space-y-4" ref={componentRef}>
//       <div className="">
//         <PageHeaderStyled
//           hover="Rapid access to platform data"
//           title="Platform Data"
//           btnTitle="Add Platform"
//           btnTitleMedia="+"
//           onSearchChange={setSearch}
//           onNavigate={handleAddRow}
//           placeholder="Platform ID / Full Name search karein"
//           showButton={true}
//           searchBox={true}
//           componentRef={componentRef}
//           currentData={platforms}
//         />
//       </div>

//       <DataTable
//         data={tableData}
//         columns={columns}
//         onUpdate={handleUpdate}
//         onAdd={handleSaveAdd}
//         onCancelAdd={handleCancelAdd}
//         isAdding={showAddRow}
//         onStartEdit={(row) => {
//           setEditingRowKey(row.pf_key);
//           setEditingRow(row);
//         }}
//         onCancelEdit={() => {
//           setEditingRowKey(null);
//           clearEditingRow();
//         }}
//       />
//     </div>
//   );
// }

// import { useEffect, useRef, useState } from "react";
// import DataTable from "@/components/table/DataTable";
// import { platformService } from "@/services/platformData.service";
// import { useFetch } from "@/hooks/useFetch";
// import { useMutate } from "@/hooks/useMutate";
// import { toast } from "react-toastify";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import PageHeaderStyled from "./pageHeader/pageHeader";
// import { useStore } from "@/store/store";

// export default function Platform() {
//   const [search, setSearch] = useState("");
//   const [showAddRow, setShowAddRow] = useState(false);
//   const componentRef = useRef();

//   // Use store for state management
//   const {
//     platforms,
//     tempRows,
//     editingRow,
//     setPlatforms,
//     addTempRow,
//     removeTempRow,
//     updateTempRow,
//     updateRow,
//     clearTempRows,
//     setEditingRow,
//     clearEditingRow,
//   } = useStore();

//   const {
//     data: platformsData = [],
//     isLoading,
//     refetch,
//   } = useFetch({
//     queryKey: ["platforms", search],
//     queryFn: () => platformService.getPlatforms({ search }),
//   });

//   const createPlatform = useMutate({
//     mutationFn: platformService.createPlatform,
//     invalidateKey: ["platforms"],
//     onSuccess: () => {
//       toast.success("Platform created successfully");
//       setShowAddRow(false);
//       clearTempRows();
//       refetch();
//     },
//     onError: (error) => {
//       toast.error(`Error during creating platform: ${error.message}`);
//     },
//   });

//   const updatePlatform = useMutate({
//     mutationFn: ({ id, payload }) =>
//       platformService.updatePlatform({ id, payload }),
//     invalidateKey: ["platforms"],
//     onSuccess: () => {
//       toast.success("Platform updated successfully");
//       clearEditingRow();
//       refetch();
//     },
//     onError: (error) => {
//       toast.error(`Error during updating platform: ${error.message}`);
//     },
//   });

//   const handleAddRow = () => {
//     const tempId = Date.now().toString();
//     addTempRow(tempId);
//     setShowAddRow(true);
//     clearEditingRow();
//   };

//   const handleCancelAdd = (tempId) => {
//     removeTempRow(tempId);
//     if (tempRows.length <= 1) {
//       setShowAddRow(false);
//     }
//   };

//   const handleSaveAdd = (tempRowData) => {
//     // Validate required fields
//     if (!tempRowData.pf_id || !tempRowData.pf_name) {
//       toast.error("Platform ID and Full Name are required");
//       return;
//     }

//     createPlatform.mutate(tempRowData);
//   };

//   const handleUpdate = (rowData) => {
//     updatePlatform.mutate({
//       id: rowData.pf_key,
//       payload: rowData,
//     });
//   };

//   const handleTempFieldChange = (tempId, field, value) => {
//     updateTempRow(tempId, field, value);
//   };

//   const handleUpdateField = (pf_key, field, value) => {
//     updateRow(pf_key, field, value);
//   };

//   const isEditing = (row) => {
//     return editingRow?.pf_key === row.pf_key;
//   };

//   const columns = [
//     {
//       title: "Platform ID",
//       dataIndex: "pf_id",
//       key: "pf_id",
//       filtertype: "search",
//       description: "Platform unique id",
//       render: (text, record, index, isEditing, isAddingRow) => {
//         if (isAddingRow) {
//           return (
//             <Input
//               value={record.pf_id || ""}
//               placeholder="Platform ID"
//               onChange={(e) =>
//                 handleTempFieldChange(record.tempId, "pf_id", e.target.value)
//               }
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing) {
//           return (
//             <Input
//               value={record.pf_id || ""}
//               placeholder="Platform ID"
//               onChange={(e) =>
//                 handleUpdateField(record.pf_key, "pf_id", e.target.value)
//               }
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Full Name",
//       dataIndex: "pf_name",
//       key: "pf_name",
//       filtertype: "search",
//       description: "Platform Full Name",
//       render: (text, record, index, isEditing, isAddingRow) => {
//         if (isAddingRow) {
//           return (
//             <Input
//               value={record.pf_name || ""}
//               placeholder="Full Name"
//               onChange={(e) =>
//                 handleTempFieldChange(record.tempId, "pf_name", e.target.value)
//               }
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing) {
//           return (
//             <Input
//               value={record.pf_name || ""}
//               placeholder="Full Name"
//               onChange={(e) =>
//                 handleUpdateField(record.pf_key, "pf_name", e.target.value)
//               }
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Type",
//       dataIndex: "pf_type",
//       key: "pf_type",
//       filtertype: "unique",
//       render: (text, record, index, isEditing, isAddingRow) => {
//         if (isAddingRow) {
//           return (
//             <div className="relative w-36">
//               <Select
//                 value={record.pf_type || ""}
//                 onValueChange={(val) =>
//                   handleTempFieldChange(record.tempId, "pf_type", val)
//                 }
//                 className="relative"
//               >
//                 <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//                   <SelectValue placeholder="Select Type" />
//                 </SelectTrigger>
//                 <SelectContent className="z-50 bg-white">
//                   <SelectItem value="Aircraft">Aircraft</SelectItem>
//                   <SelectItem value="Ship">Ship</SelectItem>
//                   <SelectItem value="Others">Others</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           );
//         } else if (isEditing) {
//           return (
//             <div className="relative w-36">
//               <Select
//                 value={record.pf_type || ""}
//                 onValueChange={(val) =>
//                   handleUpdateField(record.pf_key, "pf_type", val)
//                 }
//                 className="relative"
//               >
//                 <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//                   <SelectValue placeholder="Select Type" />
//                 </SelectTrigger>
//                 <SelectContent className="z-50 bg-white">
//                   <SelectItem value="Aircraft">Aircraft</SelectItem>
//                   <SelectItem value="Ship">Ship</SelectItem>
//                   <SelectItem value="Others">Others</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Squadron",
//       dataIndex: "pf_squadron",
//       key: "pf_squadron",
//       filtertype: "unique",
//       render: (text, record, index, isEditing, isAddingRow) => {
//         if (isAddingRow) {
//           return (
//             <div className="relative w-36">
//               <Select
//                 value={record.pf_squadron || ""}
//                 onValueChange={(val) =>
//                   handleTempFieldChange(record.tempId, "pf_squadron", val)
//                 }
//                 className=""
//               >
//                 <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//                   <SelectValue placeholder="Select Squadron" />
//                 </SelectTrigger>
//                 <SelectContent className="z-50 bg-white">
//                   <SelectItem value="Vessel A">Vessel A</SelectItem>
//                   <SelectItem value="Vessel B">Vessel B</SelectItem>
//                   <SelectItem value="Others">Others</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           );
//         } else if (isEditing) {
//           return (
//             <div className="relative w-36">
//               <Select
//                 value={record.pf_squadron || ""}
//                 onValueChange={(val) =>
//                   handleUpdateField(record.pf_key, "pf_squadron", val)
//                 }
//                 className=""
//               >
//                 <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//                   <SelectValue placeholder="Select Squadron" />
//                 </SelectTrigger>
//                 <SelectContent className="z-50 bg-white">
//                   <SelectItem value="Vessel A">Vessel A</SelectItem>
//                   <SelectItem value="Vessel B">Vessel B</SelectItem>
//                   <SelectItem value="Others">Others</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Status",
//       dataIndex: "pf_status",
//       key: "pf_status",
//       filtertype: "unique",
//       render: (text, record, index, isEditing, isAddingRow) => {
//         if (isAddingRow) {
//           return (
//             <div className="relative w-36">
//               <Select
//                 value={record.pf_status || ""}
//                 onValueChange={(val) =>
//                   handleTempFieldChange(record.tempId, "pf_status", val)
//                 }
//                 className=""
//               >
//                 <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//                   <SelectValue placeholder="Select Status" />
//                 </SelectTrigger>
//                 <SelectContent className="z-50 bg-white">
//                   <SelectItem value="OPS">OPS</SelectItem>
//                   <SelectItem value="Non-OPS">Non-OPS</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           );
//         } else if (isEditing) {
//           return (
//             <div className="relative w-36">
//               <Select
//                 value={record.pf_status || ""}
//                 onValueChange={(val) =>
//                   handleUpdateField(record.pf_key, "pf_status", val)
//                 }
//                 className=""
//               >
//                 <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
//                   <SelectValue placeholder="Select Status" />
//                 </SelectTrigger>
//                 <SelectContent className="z-50 bg-white">
//                   <SelectItem value="OPS">OPS</SelectItem>
//                   <SelectItem value="Non-OPS">Non-OPS</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "CO",
//       dataIndex: "pf_co",
//       key: "pf_co",
//       render: (text, record, index, isEditing, isAddingRow) => {
//         if (isAddingRow) {
//           return (
//             <Input
//               value={record.pf_co || ""}
//               placeholder="CO"
//               onChange={(e) =>
//                 handleTempFieldChange(record.tempId, "pf_co", e.target.value)
//               }
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing) {
//           return (
//             <Input
//               value={record.pf_co || ""}
//               placeholder="CO"
//               onChange={(e) =>
//                 handleUpdateField(record.pf_key, "pf_co", e.target.value)
//               }
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Fuel Capacity",
//       dataIndex: "pf_fuelcap",
//       key: "pf_fuelcap",
//       render: (text, record, index, isEditing, isAddingRow) => {
//         if (isAddingRow) {
//           return (
//             <Input
//               value={record.pf_fuelcap || ""}
//               placeholder="Fuel Capacity"
//               onChange={(e) =>
//                 handleTempFieldChange(
//                   record.tempId,
//                   "pf_fuelcap",
//                   e.target.value
//                 )
//               }
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing) {
//           return (
//             <Input
//               value={record.pf_fuelcap || ""}
//               placeholder="Fuel Capacity"
//               onChange={(e) =>
//                 handleUpdateField(record.pf_key, "pf_fuelcap", e.target.value)
//               }
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Fresh Water Capacity",
//       dataIndex: "pf_watercap",
//       key: "pf_watercap",
//       render: (text, record, index, isEditing, isAddingRow) => {
//         if (isAddingRow) {
//           return (
//             <Input
//               value={record.pf_watercap || ""}
//               placeholder="Fresh Water Capacity"
//               onChange={(e) =>
//                 handleTempFieldChange(
//                   record.tempId,
//                   "pf_watercap",
//                   e.target.value
//                 )
//               }
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing) {
//           return (
//             <Input
//               value={record.pf_watercap || ""}
//               placeholder="Fresh Water Capacity"
//               onChange={(e) =>
//                 handleUpdateField(record.pf_key, "pf_watercap", e.target.value)
//               }
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//     {
//       title: "Other Info",
//       dataIndex: "pf_info",
//       key: "pf_info",
//       render: (text, record, index, isEditing, isAddingRow) => {
//         if (isAddingRow) {
//           return (
//             <Input
//               value={record.pf_info || ""}
//               placeholder="Other Info"
//               onChange={(e) =>
//                 handleTempFieldChange(record.tempId, "pf_info", e.target.value)
//               }
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else if (isEditing) {
//           return (
//             <Input
//               value={record.pf_info || ""}
//               placeholder="Other Info"
//               onChange={(e) =>
//                 handleUpdateField(record.pf_key, "pf_info", e.target.value)
//               }
//               className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           );
//         } else {
//           return text;
//         }
//       },
//     },
//   ];

//   const tableData = [...tempRows, ...(platforms || [])];
//   useEffect(() => {
//     if (platformsData && platformsData.length > 0) {
//       setPlatforms(platformsData);
//     }
//   }, [platformsData, setPlatforms]);

//   return (
//     <div className="p-6 space-y-4" ref={componentRef}>
//       <div className="">
//         <PageHeaderStyled
//           hover="Rapid access to platform data"
//           title="Platform Data"
//           btnTitle="Add Platform"
//           btnTitleMedia="+"
//           onSearchChange={setSearch}
//           onNavigate={handleAddRow}
//           placeholder="Search Platform ID / Full Name"
//           showButton={true}
//           searchBox={true}
//           componentRef={componentRef}
//           currentData={platforms}
//         />
//       </div>

//       {isLoading ? (
//         <div className="text-center py-8">Loading platforms...</div>
//       ) : (
//         <DataTable
//           data={tableData}
//           columns={columns}
//           onUpdate={handleUpdate}
//           onAdd={handleSaveAdd}
//           onCancelAdd={handleCancelAdd}
//           isAdding={showAddRow}
//           onStartEdit={(row) => {
//             setEditingRow(row);
//           }}
//           onCancelEdit={() => {
//             clearEditingRow();
//             refetch();
//           }}
//           isLoading={isLoading}
//         />
//       )}
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import DataTable from "@/components/table/DataTable";
import { platformService } from "@/services/platformData.service";
import { useFetch } from "@/hooks/useFetch";
import { useMutate } from "@/hooks/useMutate";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import PageHeaderStyled from "./pageHeader/pageHeader";
import { useStore } from "@/store/store";

export default function Platform() {
  const [search, setSearch] = useState("");
  const [showAddRow, setShowAddRow] = useState(false);
  const componentRef = useRef();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      pf_id: "",
      pf_name: "",
      pf_type: "",
      pf_squadron: "",
      pf_status: "",
      pf_co: "",
      pf_fuelcap: "",
      pf_watercap: "",
      pf_info: "",
    },
    mode: "onChange",
  });

  // Use store for state management
  const {
    platforms,
    tempRows,
    editingRow,
    setPlatforms,
    addTempRow,
    removeTempRow,
    updateTempRow,
    updateRow,
    clearTempRows,
    setEditingRow,
    clearEditingRow,
  } = useStore();

  const {
    data: platformsData = [],
    isLoading,
    refetch,
  } = useFetch({
    queryKey: ["platforms", search],
    queryFn: () => platformService.getPlatforms({ search }),
  });

  const createPlatform = useMutate({
    mutationFn: platformService.createPlatform,
    invalidateKey: ["platforms"],
    onSuccess: () => {
      toast.success("Platform created successfully");
      setShowAddRow(false);
      clearTempRows();
      reset(); // Reset form
      refetch();
    },
    onError: (error) => {
      toast.error(`Error during creating platform: ${error.message}`);
    },
  });

  const updatePlatform = useMutate({
    mutationFn: ({ id, payload }) =>
      platformService.updatePlatform({ id, payload }),
    invalidateKey: ["platforms"],
    onSuccess: () => {
      toast.success("Platform updated successfully");
      clearEditingRow();
      reset(); // Reset form
      refetch();
    },
    onError: (error) => {
      toast.error(`Error during updating platform: ${error.message}`);
    },
  });

  const handleAddRow = () => {
    const tempId = Date.now().toString();
    addTempRow(tempId);
    setShowAddRow(true);
    clearEditingRow();
    reset(); // Clear form when adding new row
  };

  const handleCancelAdd = (tempId) => {
    removeTempRow(tempId);
    reset(); // Reset form
    if (tempRows.length <= 1) {
      setShowAddRow(false);
    }
  };

  // Updated handleSaveAdd with validation
  const handleSaveAdd = async (tempRowData) => {
    // Validate all required fields using react-hook-form
    const isValid = await trigger([
      "pf_id",
      "pf_name",
      "pf_type",
      "pf_squadron",
      "pf_status",
      "pf_co",
    ]);

    if (!isValid) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    // Prepare data with form values
    const formData = watch();
    const platformData = {
      ...tempRowData,
      ...formData,
      // Convert numeric fields
      pf_fuelcap: formData.pf_fuelcap ? Number(formData.pf_fuelcap) : null,
      pf_watercap: formData.pf_watercap ? Number(formData.pf_watercap) : null,
    };
    // if (tempRows.length <= 1) {
    //   setShowAddRow(false);
    // }
    createPlatform.mutate(platformData);
  };

  const handleUpdate = (rowData) => {
    // Validate before update
    const requiredFields = [
      "pf_id",
      "pf_name",
      "pf_type",
      "pf_squadron",
      "pf_status",
      "pf_co",
    ];
    const missingFields = requiredFields.filter((field) => !rowData[field]);

    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    updatePlatform.mutate({
      id: rowData.pf_key,
      payload: rowData,
    });
  };

  const handleTempFieldChange = (tempId, field, value) => {
    updateTempRow(tempId, field, value);
    setValue(field, value, { shouldValidate: true });
  };

  const handleUpdateField = (pf_key, field, value) => {
    updateRow(pf_key, field, value);
  };

  const isEditing = (row) => {
    return editingRow?.pf_key === row.pf_key;
  };

  // Validation schema for required fields
  const requiredFieldValidation = {
    required: "Required",
  };

  const columns = [
    {
      title: "Platform ID",
      dataIndex: "pf_id",
      key: "pf_id",
      filtertype: "search",
      description: "Platform unique id",
      render: (text, record, index, isEditing, isAddingRow) => {
        if (isAddingRow) {
          return (
            <div className="relative">
              <Input
                {...register("pf_id", requiredFieldValidation)}
                value={record.pf_id || ""}
                placeholder="Platform ID"
                onChange={(e) => {
                  handleTempFieldChange(record.tempId, "pf_id", e.target.value);
                }}
                className={`w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.pf_id ? "border-red-500" : ""
                }`}
              />
              {errors.pf_id && (
                <p className="absolute text-xs text-red-500 mt-1">
                  {errors.pf_id.message}
                </p>
              )}
            </div>
          );
        } else if (isEditing) {
          return (
            <div className="relative">
              <Input
                value={record.pf_id || ""}
                placeholder="Platform ID"
                onChange={(e) =>
                  handleUpdateField(record.pf_key, "pf_id", e.target.value)
                }
                className={`w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  !record.pf_id ? "border-red-500" : ""
                }`}
              />
              {!record.pf_id && (
                <p className="absolute text-xs text-red-500 mt-1">
                  Platform ID is required
                </p>
              )}
            </div>
          );
        } else {
          return text;
        }
      },
    },
    {
      title: "Full Name",
      dataIndex: "pf_name",
      key: "pf_name",
      filtertype: "search",
      description: "Platform Full Name",
      render: (text, record, index, isEditing, isAddingRow) => {
        if (isAddingRow) {
          return (
            <div className="relative">
              <Input
                {...register("pf_name", requiredFieldValidation)}
                value={record.pf_name || ""}
                placeholder="Full Name"
                onChange={(e) =>
                  handleTempFieldChange(
                    record.tempId,
                    "pf_name",
                    e.target.value
                  )
                }
                className={`w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.pf_name ? "border-red-500" : ""
                }`}
              />
              {errors.pf_name && (
                <p className="absolute text-xs text-red-500 mt-1">
                  {errors.pf_name.message}
                </p>
              )}
            </div>
          );
        } else if (isEditing) {
          return (
            <div className="relative">
              <Input
                value={record.pf_name || ""}
                placeholder="Full Name"
                onChange={(e) =>
                  handleUpdateField(record.pf_key, "pf_name", e.target.value)
                }
                className={`w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  !record.pf_name ? "border-red-500" : ""
                }`}
              />
              {!record.pf_name && (
                <p className="absolute text-xs text-red-500 mt-1">
                  Full Name is required
                </p>
              )}
            </div>
          );
        } else {
          return text;
        }
      },
    },
    {
      title: "Type",
      dataIndex: "pf_type",
      key: "pf_type",
      filtertype: "unique",
      render: (text, record, index, isEditing, isAddingRow) => {
        if (isAddingRow) {
          return (
            <div className="relative w-36">
              <Select
                {...register("pf_type", requiredFieldValidation)}
                value={record.pf_type || ""}
                onValueChange={(val) =>
                  handleTempFieldChange(record.tempId, "pf_type", val)
                }
                className="relative"
              >
                <SelectTrigger
                  className={`w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 ${
                    errors.pf_type ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectItem value="Aircraft">Aircraft</SelectItem>
                  <SelectItem value="Ship">Ship</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
              {errors.pf_type && (
                <p className="absolute text-xs text-red-500 mt-1">
                  {errors.pf_type.message}
                </p>
              )}
            </div>
          );
        } else if (isEditing) {
          return (
            <div className="relative w-36">
              <Select
                value={record.pf_type || ""}
                onValueChange={(val) =>
                  handleUpdateField(record.pf_key, "pf_type", val)
                }
                className="relative"
              >
                <SelectTrigger
                  className={`w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 ${
                    !record.pf_type ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectItem value="Aircraft">Aircraft</SelectItem>
                  <SelectItem value="Ship">Ship</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
              {!record.pf_type && (
                <p className="absolute text-xs text-red-500 mt-1">
                  Type is required
                </p>
              )}
            </div>
          );
        } else {
          return text;
        }
      },
    },
    {
      title: "Squadron",
      dataIndex: "pf_squadron",
      key: "pf_squadron",
      filtertype: "unique",
      render: (text, record, index, isEditing, isAddingRow) => {
        if (isAddingRow) {
          return (
            <div className="relative w-36">
              <Select
                {...register("pf_squadron", requiredFieldValidation)}
                value={record.pf_squadron || ""}
                onValueChange={(val) =>
                  handleTempFieldChange(record.tempId, "pf_squadron", val)
                }
                className=""
              >
                <SelectTrigger
                  className={`w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 ${
                    errors.pf_squadron ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select Squadron" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectItem value="Vessel A">Vessel A</SelectItem>
                  <SelectItem value="Vessel B">Vessel B</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
              {errors.pf_squadron && (
                <p className="absolute text-xs text-red-500 mt-1">
                  {errors.pf_squadron.message}
                </p>
              )}
            </div>
          );
        } else if (isEditing) {
          return (
            <div className="relative w-36">
              <Select
                value={record.pf_squadron || ""}
                onValueChange={(val) =>
                  handleUpdateField(record.pf_key, "pf_squadron", val)
                }
                className=""
              >
                <SelectTrigger
                  className={`w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 ${
                    !record.pf_squadron ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select Squadron" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectItem value="Vessel A">Vessel A</SelectItem>
                  <SelectItem value="Vessel B">Vessel B</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
              {!record.pf_squadron && (
                <p className="absolute text-xs text-red-500 mt-1">
                  Squadron is required
                </p>
              )}
            </div>
          );
        } else {
          return text;
        }
      },
    },
    {
      title: "Status",
      dataIndex: "pf_status",
      key: "pf_status",
      filtertype: "unique",
      render: (text, record, index, isEditing, isAddingRow) => {
        if (isAddingRow) {
          return (
            <div className="relative w-36">
              <Select
                {...register("pf_status", requiredFieldValidation)}
                value={record.pf_status || ""}
                onValueChange={(val) =>
                  handleTempFieldChange(record.tempId, "pf_status", val)
                }
                className=""
              >
                <SelectTrigger
                  className={`w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 ${
                    errors.pf_status ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectItem value="OPS">OPS</SelectItem>
                  <SelectItem value="Non-OPS">Non-OPS</SelectItem>
                </SelectContent>
              </Select>
              {errors.pf_status && (
                <p className="absolute text-xs text-red-500 mt-1">
                  {errors.pf_status.message}
                </p>
              )}
            </div>
          );
        } else if (isEditing) {
          return (
            <div className="relative w-36">
              <Select
                value={record.pf_status || ""}
                onValueChange={(val) =>
                  handleUpdateField(record.pf_key, "pf_status", val)
                }
                className=""
              >
                <SelectTrigger
                  className={`w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 ${
                    !record.pf_status ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectItem value="OPS">OPS</SelectItem>
                  <SelectItem value="Non-OPS">Non-OPS</SelectItem>
                </SelectContent>
              </Select>
              {!record.pf_status && (
                <p className="absolute text-xs text-red-500 mt-1">
                  Status is required
                </p>
              )}
            </div>
          );
        } else {
          return text;
        }
      },
    },
    {
      title: "CO",
      dataIndex: "pf_co",
      key: "pf_co",
      render: (text, record, index, isEditing, isAddingRow) => {
        if (isAddingRow) {
          return (
            <div className="relative">
              <Input
                {...register("pf_co", requiredFieldValidation)}
                value={record.pf_co || ""}
                placeholder="CO"
                onChange={(e) =>
                  handleTempFieldChange(record.tempId, "pf_co", e.target.value)
                }
                className={`w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.pf_co ? "border-red-500" : ""
                }`}
              />
              {errors.pf_co && (
                <p className="absolute text-xs text-red-500 mt-1">
                  {errors.pf_co.message}
                </p>
              )}
            </div>
          );
        } else if (isEditing) {
          return (
            <div className="relative">
              <Input
                value={record.pf_co || ""}
                placeholder="CO"
                onChange={(e) =>
                  handleUpdateField(record.pf_key, "pf_co", e.target.value)
                }
                className={`w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  !record.pf_co ? "border-red-500" : ""
                }`}
              />
              {!record.pf_co && (
                <p className="absolute text-xs text-red-500 mt-1">
                  CO is required
                </p>
              )}
            </div>
          );
        } else {
          return text;
        }
      },
    },
    {
      title: "Fuel Capacity",
      dataIndex: "pf_fuelcap",
      key: "pf_fuelcap",
      render: (text, record, index, isEditing, isAddingRow) => {
        if (isAddingRow) {
          return (
            <Input
              {...register("pf_fuelcap")}
              value={record.pf_fuelcap || ""}
              placeholder="Fuel Capacity"
              onChange={(e) =>
                handleTempFieldChange(
                  record.tempId,
                  "pf_fuelcap",
                  e.target.value
                )
              }
              className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          );
        } else if (isEditing) {
          return (
            <Input
              value={record.pf_fuelcap || ""}
              placeholder="Fuel Capacity"
              onChange={(e) =>
                handleUpdateField(record.pf_key, "pf_fuelcap", e.target.value)
              }
              className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          );
        } else {
          return text;
        }
      },
    },
    {
      title: "Fresh Water Capacity",
      dataIndex: "pf_watercap",
      key: "pf_watercap",
      render: (text, record, index, isEditing, isAddingRow) => {
        if (isAddingRow) {
          return (
            <Input
              {...register("pf_watercap")}
              value={record.pf_watercap || ""}
              placeholder="Fresh Water Capacity"
              onChange={(e) =>
                handleTempFieldChange(
                  record.tempId,
                  "pf_watercap",
                  e.target.value
                )
              }
              className={`w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                hasValidationErrors && "my-4"
              }`}
            />
          );
        } else if (isEditing) {
          return (
            <Input
              value={record.pf_watercap || ""}
              placeholder="Fresh Water Capacity"
              onChange={(e) =>
                handleUpdateField(record.pf_key, "pf_watercap", e.target.value)
              }
              className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          );
        } else {
          return text;
        }
      },
    },
    {
      title: "Other Info",
      dataIndex: "pf_info",
      key: "pf_info",
      render: (text, record, index, isEditing, isAddingRow) => {
        if (isAddingRow) {
          return (
            <Input
              {...register("pf_info")}
              value={record.pf_info || ""}
              placeholder="Other Info"
              onChange={(e) =>
                handleTempFieldChange(record.tempId, "pf_info", e.target.value)
              }
              className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          );
        } else if (isEditing) {
          return (
            <Input
              value={record.pf_info || ""}
              placeholder="Other Info"
              onChange={(e) =>
                handleUpdateField(record.pf_key, "pf_info", e.target.value)
              }
              className="w-36 border rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          );
        } else {
          return text;
        }
      },
    },
  ];

  const tableData = [...tempRows, ...(platforms || [])];
  useEffect(() => {
    if (platformsData && platformsData.length > 0) {
      setPlatforms(platformsData);
    }
  }, [platformsData, setPlatforms]);

  // Add validation summary
  const hasValidationErrors = Object.keys(errors).length > 0;

  return (
    <div className="p-6 space-y-4" ref={componentRef}>
      {/* Validation Error Summary */}
      {/* {hasValidationErrors && showAddRow && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold mb-2">
            Please fix the following errors:
          </h3>
          <ul className="list-disc list-inside text-red-600 text-sm">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>
                {field.replace("pf_", "").toUpperCase()}: {error.message}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <div className="">
        <PageHeaderStyled
          hover="Rapid access to platform data"
          title="Platform Data"
          btnTitle="Add Platform"
          btnTitleMedia="+"
          onSearchChange={setSearch}
          onNavigate={handleAddRow}
          placeholder="Search Platform ID / Full Name"
          showButton={true}
          searchBox={true}
          componentRef={componentRef}
          currentData={platforms}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading platforms...</div>
      ) : (
        <DataTable
          data={tableData}
          columns={columns}
          onUpdate={handleUpdate}
          onAdd={handleSaveAdd}
          onCancelAdd={handleCancelAdd}
          isAdding={showAddRow}
          onStartEdit={(row) => {
            setEditingRow(row);
          }}
          onCancelEdit={() => {
            clearEditingRow();
            reset();
            refetch();
          }}
          isLoading={isLoading}
          // formErrors={errors}
        />
      )}
    </div>
  );
}
