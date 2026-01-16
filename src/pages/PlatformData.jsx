import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import DataTable from "@/components/table/DataTable";
import { platformService } from "@/services/platformData.service";
import { useFetch } from "@/hooks/useFetch";
import { useMutate } from "@/hooks/useMutate";
import { toast } from "react-toastify";
import PlatformFields from "@/adapters/columnsKeys";
import { createColumnsFromConfig } from "@/helper/createColumn";
import PageHeaderStyled from "../components/pageHeader/pageHeader";
import { useStore } from "@/store/store";
import { LoadingSpinner } from "../components/loadingSpinner/LoadingSpinner";

export default function PlatformData() {
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
    defaultValues: Object.keys(PlatformFields).reduce((acc, key) => {
      const fieldKey = PlatformFields[key].key;
      acc[fieldKey] = "";
      return acc;
    }, {}),
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
      reset();
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
      reset();
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
    reset();
  };

  const handleCancelAdd = (tempId) => {
    removeTempRow(tempId);
    reset();
    if (tempRows.length <= 1) {
      setShowAddRow(false);
    }
  };

  const handleSaveAdd = async (tempRowData) => {
    // Get required fields from PlatformFields
    const requiredFields = Object.values(PlatformFields)
      .filter((field) => field.validation?.required)
      .map((field) => field.key);
    // Validate required fields
    const isValid = await trigger(requiredFields);

    if (!isValid) {
      toast.error("Please fill all required fields correctly");
      return;
    }

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



  const columns = createColumnsFromConfig(PlatformFields, {
    register,
    errors,
    handleTempFieldChange,
    handleUpdateField,
  });

  const tableData = [...tempRows, ...(platforms || [])];
  useEffect(() => {
    if (platformsData && platformsData.length > 0) {
      setPlatforms(platformsData);
    }
  }, [platformsData, setPlatforms]);

  return (
    <div className="p-3 space-y-1" ref={componentRef}>
      <div className="my-4">
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
        <LoadingSpinner />
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
        />
      )}
    </div>
  );
}
