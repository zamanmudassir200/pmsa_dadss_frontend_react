import { useRef, useState } from "react";
import DataTable from "@/components/table/DataTable";
import { platformService } from "@/services/platformData.service";
import { useFetch } from "@/hooks/useFetch";
import { useMutate } from "@/hooks/useMutate";
import { useForm } from "react-hook-form";
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

export default function Platform() {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [platformKey, setPlatformKey] = useState("");
  const [selectedType, setSelectedType] = useState(null); // Added selectedType state
  const [selectedSquadron, setSelectedSquadron] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState(null);
  const componentRef = useRef();
  //   const viewPermission = hasPermission("view_platforms");
  //   const addPermission = hasPermission("add_platforms");
  //   const editPermission = hasPermission("change_platforms");
  const { data: platforms = [], isLoading } = useFetch({
    queryKey: ["platforms", search],
    queryFn: () => platformService.getPlatforms({ search }),
  });
  const form = useForm({
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
  });

  const createPlatform = useMutate({
    mutationFn: platformService.createPlatform,
    invalidateKey: ["platforms"],
  });

  const updatePlatform = useMutate({
    mutationFn: (payload) =>
      platformService.updatePlatform({
        id: payload.pf_key,
        payload,
      }),
    invalidateKey: ["platforms"],
  });
  const reset = () => {
    setPlatformKey("");
    setSelectedType(null);
    setSelectedSquadron(null);
    form.reset();
  };
  const handleUpdate = (rowData) => {
    updatePlatform.mutate(rowData, {
      onSuccess: () => toast.success("Platform updated!"),
      onError: () => toast.error("Failed"),
    });
  };
  const handleShowInput = () => {
    setShowInputs(true);
    reset();
  };

  //   const columns = [
  //     {
  //       title: "Platform ID",
  //       dataIndex: "pf_id",
  //       key: "pf_id",
  //       filtertype: "search",
  //     //   renderInput: (value, onChange) => (
  //     //     <Input
  //     //       value={value}
  //     //       placeholder="Platform ID"
  //     //       onChange={(e) => onChange(e.target.value)}
  //     //       className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //     //     />
  //     //   ),
  //       render: (text, record, index) => {
  //         if ((showInputs && index === 0) | isPlatformEditing(index)) {
  //           return (
  //             <StyledInput>
  //               <InputBox
  //                 style={{ width: 150 }}
  //                 placeholder="Platform ID"
  //                 name="pf_id"
  //                 minLength={1}
  //                 maxLength={50}
  //                 rules={[
  //                   req_rule,

  //                 ]}
  //               />
  //             </StyledInput>
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
  //       renderInput: (value, onChange) => (
  //         <Input
  //           value={value}
  //           placeholder="Full Name"
  //           onChange={(e) => onChange(e.target.value)}
  //           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         />
  //       ),
  //     },
  //     {
  //       title: "Type",
  //       dataIndex: "pf_type",
  //       key: "pf_type",
  //       filtertype: "unique",
  //       renderInput: (value, onChange) => (
  //         <div className="relative w-36">
  //           <Select value={value} onValueChange={onChange} className="relative">
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
  //       ),
  //     },
  //     {
  //       title: "Squadron",
  //       dataIndex: "pf_squadron",
  //       key: "pf_squadron",
  //       filtertype: "unique",
  //       renderInput: (value, onChange) => (
  //         <div className="relative w-36">
  //           <Select value={value} onValueChange={onChange} className="">
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
  //       ),
  //     },
  //     {
  //       title: "Status",
  //       dataIndex: "pf_status",
  //       key: "pf_status",
  //       filtertype: "unique",
  //       renderInput: (value, onChange) => (
  //         <div className="relative w-36">
  //           <Select value={value} onValueChange={onChange} className="">
  //             <SelectTrigger className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400">
  //               <SelectValue placeholder="Select Status" />
  //             </SelectTrigger>
  //             <SelectContent className="z-50 absolute top-10  w-full">
  //               <SelectItem value="OPS">OPS</SelectItem>
  //               <SelectItem value="Non-OPS">Non-OPS</SelectItem>
  //             </SelectContent>
  //           </Select>
  //         </div>
  //       ),
  //     },
  //     {
  //       title: "CO",
  //       dataIndex: "pf_co",
  //       key: "pf_co",
  //       renderInput: (value, onChange) => (
  //         <Input
  //           value={value}
  //           placeholder="CO"
  //           onChange={(e) => onChange(e.target.value)}
  //           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         />
  //       ),
  //     },
  //     {
  //       title: "Fuel Capacity",
  //       dataIndex: "pf_fuelcap",
  //       key: "pf_fuelcap",
  //       renderInput: (value, onChange) => (
  //         <Input
  //           value={value}
  //           placeholder="Fuel Capacity"
  //           onChange={(e) => onChange(e.target.value)}
  //           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         />
  //       ),
  //     },
  //     {
  //       title: "Fresh Water Capacity",
  //       dataIndex: "pf_watercap",
  //       key: "pf_watercap",
  //       renderInput: (value, onChange) => (
  //         <Input
  //           value={value}
  //           placeholder="Fresh Water Capacity"
  //           onChange={(e) => onChange(e.target.value)}
  //           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         />
  //       ),
  //     },
  //     {
  //       title: "Other Info",
  //       dataIndex: "pf_info",
  //       key: "pf_info",
  //       renderInput: (value, onChange) => (
  //         <Input
  //           value={value}
  //           placeholder="Other Info"
  //           onChange={(e) => onChange(e.target.value)}
  //           className="w-36 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         />
  //       ),
  //     },
  //   ];
  const columns = [
    {
      title: "Platform ID",
      dataIndex: "pf_id",
      key: "pf_id",
      filtertype: "search",
      render: (text, record, index) =>
        (showInputs && index === 0) || isPlatformEditing(index) ? (
          <Input
            value={record.pf_id}
            placeholder="Platform ID"
            onChange={(e) => handleChange("pf_id", e.target.value)}
            className="w-36 border rounded-md px-2 py-1"
          />
        ) : (
          text
        ),
    },
    {
      title: "Full Name",
      dataIndex: "pf_name",
      key: "pf_name",
      filtertype: "search",
      render: (text, record, index) =>
        (showInputs && index === 0) || isPlatformEditing(index) ? (
          <Input
            value={record.pf_name}
            placeholder="Full Name"
            onChange={(e) => handleChange("pf_name", e.target.value)}
            className="w-36 border rounded-md px-2 py-1"
          />
        ) : (
          text
        ),
    },
    {
      title: "Type",
      dataIndex: "pf_type",
      key: "pf_type",
      filtertype: "unique",
      render: (text, record, index) =>
        (showInputs && index === 0) || isPlatformEditing(index) ? (
          <div className="w-36">
            <Select
              value={record.pf_type}
              onValueChange={(val) => handleChange("pf_type", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aircraft">Aircraft</SelectItem>
                <SelectItem value="Ship">Ship</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          text
        ),
    },
    {
      title: "Squadron",
      dataIndex: "pf_squadron",
      key: "pf_squadron",
      filtertype: "unique",
      render: (text, record, index) =>
        (showInputs && index === 0) || isPlatformEditing(index) ? (
          <div className="w-36">
            <Select
              value={record.pf_squadron}
              onValueChange={(val) => handleChange("pf_squadron", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Squadron" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vessel A">Vessel A</SelectItem>
                <SelectItem value="Vessel B">Vessel B</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          text
        ),
    },
    {
      title: "Status",
      dataIndex: "pf_status",
      key: "pf_status",
      filtertype: "unique",
      render: (text, record, index) =>
        (showInputs && index === 0) || isPlatformEditing(index) ? (
          <div className="w-36">
            <Select
              value={record.pf_status}
              onValueChange={(val) => handleChange("pf_status", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OPS">OPS</SelectItem>
                <SelectItem value="Non-OPS">Non-OPS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          text
        ),
    },
    {
      title: "CO",
      dataIndex: "pf_co",
      key: "pf_co",
      render: (text, record, index) =>
        (showInputs && index === 0) || isPlatformEditing(index) ? (
          <Input
            value={record.pf_co}
            placeholder="CO"
            onChange={(e) => handleChange("pf_co", e.target.value)}
            className="w-36 border rounded-md px-2 py-1"
          />
        ) : (
          text
        ),
    },
    {
      title: "Fuel Capacity",
      dataIndex: "pf_fuelcap",
      key: "pf_fuelcap",
      render: (text, record, index) =>
        (showInputs && index === 0) || isPlatformEditing(index) ? (
          <Input
            value={record.pf_fuelcap}
            placeholder="Fuel Capacity"
            onChange={(e) => handleChange("pf_fuelcap", e.target.value)}
            className="w-36 border rounded-md px-2 py-1"
          />
        ) : (
          text
        ),
    },
    {
      title: "Fresh Water Capacity",
      dataIndex: "pf_watercap",
      key: "pf_watercap",
      render: (text, record, index) =>
        (showInputs && index === 0) || isPlatformEditing(index) ? (
          <Input
            value={record.pf_watercap}
            placeholder="Fresh Water Capacity"
            onChange={(e) => handleChange("pf_watercap", e.target.value)}
            className="w-36 border rounded-md px-2 py-1"
          />
        ) : (
          text
        ),
    },
    {
      title: "Other Info",
      dataIndex: "pf_info",
      key: "pf_info",
      render: (text, record, index) =>
        (showInputs && index === 0) || isPlatformEditing(index) ? (
          <Input
            value={record.pf_info}
            placeholder="Other Info"
            onChange={(e) => handleChange("pf_info", e.target.value)}
            className="w-36 border rounded-md px-2 py-1"
          />
        ) : (
          text
        ),
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="">
        <PageHeaderStyled
          hover="Rapid access to platform data"
          title="Platform Data"
          btnTitle={"Add Platform"} // Render the button only if access is not denied
          btnTitleMedia="+"
          onSearchChange={setSearchData}
          onNavigate={handleShowInput}
          placeholder="Search by Platform ID / Full Name "
          showButton={true}
          //   currentData={viewPermission ? filteredDataSource : null}
          //   componentRef={viewPermission ? componentRef : null}
        />
      </div>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search platform"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-2 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {/* <DataTable
        // data={platforms}
        data={
          showInputs
            ? [
                {
                  pf_id: "",
                  pf_name: "",
                  pf_co: "",
                  pf_info: "",
                  pf_status: null,
                  pf_rdt: null,
                  pf_type: "",
                  pf_squadron: "",
                },
                ...platforms,
              ]
            : platforms
        }
        columns={columns}
        editingKey={null}
        onUpdate={handleUpdate}
      /> */}
      <DataTable
        data={
          showInputs
            ? [
                {
                  pf_id: "",
                  pf_name: "",
                  pf_co: "",
                  pf_info: "",
                  pf_status: null,
                  pf_rdt: null,
                  pf_type: "",
                  pf_squadron: "",
                },
                ...(Array.isArray(platforms) ? platforms : []),
              ]
            : Array.isArray(platforms)
            ? platforms
            : []
        }
        columns={columns}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
