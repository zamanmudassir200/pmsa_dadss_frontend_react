import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutate = ({
  mutationFn,
  invalidateKey,
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
    },
    onError:(error)=>{
      return error
    }
  });
};

