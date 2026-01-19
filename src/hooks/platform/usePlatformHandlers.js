import { toast } from "react-toastify";
import { useStore } from "@/store/store";
import { getApiErrorMessage } from "@/utils/utils";

export const usePlatformHandlers = ({
  trigger,
  watch,
  reset,
  refetch,
  createPlatform,
  updatePlatform,
  PlatformFields,
  setShowAddRow,
  setValue
}) => {
  const {
    tempRows,
    addTempRow,
    removeTempRow,
    updateTempRow,
    updateRow,
    clearTempRows,
    clearEditingRow,
  } = useStore();

  const handleAddRow = () => {
    const tempId = Date.now().toString();
    addTempRow(tempId);
    setShowAddRow(false);
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
    const requiredFields = Object.values(PlatformFields)
      .filter((f) => f.validation?.required)
      .map((f) => f.key);

    const isValid = await trigger(requiredFields);
    if (!isValid) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    const formData = watch();

    const platformData = {
      ...tempRowData,
      ...formData,
      pf_fuelcap: formData.pf_fuelcap
        ? Number(formData.pf_fuelcap)
        : null,
      pf_watercap: formData.pf_watercap
        ? Number(formData.pf_watercap)
        : null,
    };

    createPlatform.mutate(platformData, {
      onSuccess: () => {
        toast.success("Platform created successfully");
        clearTempRows();
        setShowAddRow(false);
        reset();
        refetch?.();
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err));
      },
    });
  };

  const handleUpdate = (rowData) => {
    updatePlatform.mutate(
      { id: rowData.pf_key, payload: rowData },
      {
        onSuccess: () => {
          toast.success("Platform updated successfully");
          clearEditingRow();
          reset();
          refetch?.();
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err));
        },
      }
    );
  };
  const handleTempFieldChange = (tempId, field, value) => {
    updateTempRow(tempId, field, value);
    setValue(field, value, { shouldValidate: true }); 
  };

  const handleUpdateField = (pf_key, field, value) => {
    updateRow(pf_key, field, value);
  };

  return {
    handleAddRow,
    handleCancelAdd,
    handleSaveAdd,
    handleUpdate,
    handleTempFieldChange,
    handleUpdateField,
  };
};
