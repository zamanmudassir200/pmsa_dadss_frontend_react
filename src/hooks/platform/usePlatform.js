import { useFetch } from "@/hooks/common/useFetch";
import { useMutate } from "@/hooks/common/useMutate";
import { platformService } from "../../services/platformData.service";
import { platformAdapter } from "../../adapters/platform/paltform.adapter";
import { useStore } from "@/store/store";

export const usePlatforms = (search) => {
  const { setPlatforms, addPlatform, saveEditedRow } = useStore();
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
    onSuccess: (updatedRow) => {
      saveEditedRow(updatedRow);
    },
  });

  return {
    ...getPlatformsQuery,
    createPlatform,
    updatePlatform,
  };
};
