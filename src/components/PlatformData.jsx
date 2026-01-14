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
import { LoadingSpinner } from "./loadingSpinner/LoadingSpinner";

export default function Platform() {
  const [search, setSearch] = useState("");
  const [showAddRow, setShowAddRow] = useState(false);
  const componentRef = useRef();

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
    // const tempId = 123
    addTempRow(tempId);
    setShowAddRow(true);
    clearEditingRow();
    reset();
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
      pf_fuelcap: formData.pf_fuelcap ? Number(formData.pf_fuelcap) : null,
      pf_watercap: formData.pf_watercap ? Number(formData.pf_watercap) : null,
    };
    createPlatform.mutate(platformData);
    handleCancelAdd(platformData.tempId);
  };

  const handleUpdate = (rowData) => {
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
       <LoadingSpinner/>
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
