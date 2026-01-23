import { useFetch } from "@/hooks/common/useFetch";
import { useMutate } from "@/hooks/common/useMutate";
import { platformService } from "../../services/platformData.service";
import { platformAdapter } from "../../adapters/platform/paltform.adapter";
import { useStore } from "@/store/store";
import { getApiErrorMessage } from "@/utils/errorApiMessage";
import { toastError, toastSuccess } from "@/utils/toast";

export const usePlatforms = ({
  search,
  trigger,
  watch,
  reset,
  setShowAddRow,
  setValue,
  PlatformFields,
}) => {
  const {
    platforms,
    tempRows,
    setPlatforms,
    addPlatform,
    saveEditedRow,
    addTempRow,
    removeTempRow,
    updateTempRow,
    updateRow,
    clearTempRows,
    clearEditingRow,
  } = useStore();

  const getPlatformsQuery = useFetch({
    queryKey: ["platforms", search],
    queryFn: async () => {
      const data = await platformService.getPlatforms({ search });
      const platforms = data.map(platformAdapter.toFrontend);
      setPlatforms(platforms);
      return platforms;
    },
  });

  const createPlatform = useMutate({
    mutationFn: async (payload) => {
      const adaptedPayload = platformAdapter.toBackend(payload);
      const response = await platformService.createPlatform(adaptedPayload);
      return platformAdapter.toFrontend(response);
    },
    invalidateKey: ["platforms"],
    onSuccess: (newPlatform) => {
      addPlatform(newPlatform);
    },
    onError: (err) => toastError(getApiErrorMessage(err)),
  });

  const updatePlatform = useMutate({
    mutationFn: async ({ id, payload }) => {
      const adaptedPayload = platformAdapter.toBackend(payload);
      const response = await platformService.updatePlatform({
        id,
        payload: adaptedPayload,
      });
      return platformAdapter.toFrontend(response);
    },
    invalidateKey: ["platforms"],
    onSuccess: (row) => {
      saveEditedRow(row);
    },
    onError: (err) => toastError(getApiErrorMessage(err)),
  });
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
      toastError("Please fill all required fields correctly");
      return;
    }

    const formData = watch();

    const platformData = {
      ...tempRowData,
      ...formData,
      pf_fuelcap: formData.pf_fuelcap ? Number(formData.pf_fuelcap) : null,
      pf_watercap: formData.pf_watercap ? Number(formData.pf_watercap) : null,
    };

    createPlatform.mutate(platformData, {
      onSuccess: () => {
        toastSuccess("Platform created successfully");
        clearTempRows();
        setShowAddRow(false);
        reset();
        getPlatformsQuery.refetch?.();
      },
    });
  };

  const handleUpdate = (rowData) => {
    updatePlatform.mutate(
      { id: rowData.pf_key, payload: rowData },
      {
        onSuccess: () => {
          toastSuccess("Platform updated successfully");
          clearEditingRow();
          reset();
          getPlatformsQuery.refetch?.();
        },
      },
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
    ...getPlatformsQuery,
    platforms,
    tempRows,
    handleAddRow,
    handleCancelAdd,
    handleSaveAdd,
    handleUpdate,
    handleTempFieldChange,
    handleUpdateField,
  };
};
