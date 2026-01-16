import { useFetch } from "@/hooks/common/useFetch";
import { useMutate } from "@/hooks/common/useMutate";
import { platformService } from "../../services/platformData.service";
import { platformAdapter } from "../../adapters/platform/paltform.adapter";
import { useStore } from "@/store/store";

export const usePlatforms = (search) => {
  const { setPlatforms} = useStore()
  const getPlatformsQuery = useFetch({
    queryKey: ["platforms", search],
    queryFn: async () => {
      const data = await platformService.getPlatforms({ search });
      console.log("data",data)
      // return platformAdapter.list(res);
      const platforms = data.map(platformAdapter.toFrontend())
      console.log("platforms",platforms) 
      setPlatforms(platforms)
    },
  });

  const createPlatform = useMutate({
    mutationFn: async (payload) => {
      // const adaptedPayload = platformAdapter.single(payload);
      const platform =  platformService.createPlatform(payload);
      console.log("platform createplatform",platform)
    },
    invalidateKey: ["platforms"],
  });

  const updatePlatform = useMutate({
    mutationFn: ({ id, payload }) => {
      const adaptedPayload = platformAdapter.single(payload);
      return platformService.updatePlatform({ id, payload: adaptedPayload });
    },
    invalidateKey: ["platforms"],
  });

  return {
    ...getPlatformsQuery,
    createPlatform,
    updatePlatform,
  };
};
