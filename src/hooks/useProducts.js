import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { queryKeys } from "@/lib/react-query/queryKeys";

export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => productService.getProducts(filters),
    // Additional options
    enabled: !!filters.category, // Conditional fetching
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData) => productService.createProduct(productData),
    onSuccess: (newProduct) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });

      // OR update cache directly (optimistic update)
      queryClient.setQueryData(queryKeys.products.all, (oldProducts) => [
        ...oldProducts,
        newProduct,
      ]);
    },
    onError: (error) => {
      // Handle error (show toast, etc.)
      console.error("Error creating product:", error);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => productService.updateProduct(id, data),
    onSuccess: (updatedProduct) => {
      // Update specific product in cache
      queryClient.setQueryData(
        queryKeys.products.detail(updatedProduct.id),
        updatedProduct
      );

      // Invalidate list
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
};
