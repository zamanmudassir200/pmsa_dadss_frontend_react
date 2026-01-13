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
  });
};


// const { mutate, isPending } = useMutate({
//   method: "post",
//   url: "/users",
//   invalidateKey: ["users"],
// });

// mutate({ name: "Ali", email: "ali@gmail.com" });
