import JettyDataFields from "@/adapters/jetty/jettyFields";
import { LoadingSpinner } from "@/components/loadingSpinner/LoadingSpinner";
import PageHeaderStyled from "@/components/pageHeader/pageHeader";
import DataTable from "@/components/table/DataTable";
import { createColumnsFromConfig } from "@/helper/createColumn";
import { usePlatforms } from "@/hooks/platform/usePlatform";
import { useStore } from "@/store/store";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const JettyData = () => {
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
    defaultValues: Object.keys(JettyDataFields).reduce((acc, key) => {
      const fieldKey = JettyDataFields[key].key;
      acc[fieldKey] = "";
      return acc;
    }, {}),
    mode: "onChange",
  });

  const { jettyData, setEditingRow, clearEditingRow } = useStore();

  const {
    refetch,
    platforms,
    tempRows,
    isLoading,
    handleAddRow,
    handleSaveAdd,
    handleUpdate,
    handleCancelAdd,
    handleTempFieldChange,
    handleUpdateField,
  } = usePlatforms({
    search,
    trigger,
    watch,
    reset,
    setShowAddRow,
    setValue,
    JettyDataFields,
  });

  const columns = createColumnsFromConfig(JettyDataFields, {
    register,
    errors,
    handleTempFieldChange,
    handleUpdateField,
  });

  const tableData = [...tempRows, ...(jettyData || [])];

  return (
    <div className="p-3" ref={componentRef}>
      <div className="my-4">
        <PageHeaderStyled
          hover="Rapid access to jetty data"
          title="Jetty Data"
          btnTitle="Add Jetty"
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
          btnTitle={"Add Jetty"}
        />
      )}
    </div>
  );
};

export default JettyData;
