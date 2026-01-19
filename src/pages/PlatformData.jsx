import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import DataTable from "@/components/table/DataTable";
import PlatformFields from "@/adapters/columnsKeys";
import { createColumnsFromConfig } from "@/helper/createColumn";
import PageHeaderStyled from "../components/pageHeader/pageHeader";
import { useStore } from "@/store/store";
import { LoadingSpinner } from "../components/loadingSpinner/LoadingSpinner";
import { usePlatforms } from "../hooks/platform/usePlatform";
import { usePlatformHandlers } from "@/hooks/platform/usePlatformHandlers";

export default function PlatformData() {
  const [search, setSearch] = useState("");
  const [showAddRow, setShowAddRow] = useState(false);
  const componentRef = useRef();

  const {
    register,
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

  const { platforms, tempRows, setEditingRow, clearEditingRow } = useStore();

  const {
    isLoading,
    refetch,
    createPlatform,
    updatePlatform,
  } = usePlatforms(search);
  const {
    handleAddRow,
    handleCancelAdd,
    handleSaveAdd,
    handleUpdate,
    handleTempFieldChange,
    handleUpdateField,
  } = usePlatformHandlers({
    trigger,
    watch,
    reset,
    refetch,
    createPlatform,
    updatePlatform,
    PlatformFields,
    setShowAddRow,
    setValue,
  });

  const columns = createColumnsFromConfig(PlatformFields, {
    register,
    errors,
    handleTempFieldChange,
    handleUpdateField,
  });

  const tableData = [...tempRows, ...(platforms || [])];

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
