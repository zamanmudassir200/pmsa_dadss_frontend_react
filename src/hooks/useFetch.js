import { useQuery } from "@tanstack/react-query";

export const useFetch = ({
  queryKey,
  queryFn,
  enabled = true,
}) => {
  return useQuery({
    queryKey,
    queryFn,
    enabled,
  });
};


// const { data, isLoading } = useFetch({
//   queryKey: ["users"],
//   url: "/users",
// });

