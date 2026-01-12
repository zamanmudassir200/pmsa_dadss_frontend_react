// src/components/ProductList.jsx
import { useProducts, useDeleteProduct } from "@/hooks/api/useProducts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductList = () => {
  const { data: products, isLoading, error } = useProducts();
  const deleteProductMutation = useDeleteProduct();

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-62.5" />
        <Skeleton className="h-4 w-62.5" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  const handleDelete = (productId) => {
    deleteProductMutation.mutate(productId, {
      onSuccess: () => {
        // Show success toast
      },
    });
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.name}
            <Button
              onClick={() => handleDelete(product.id)}
              disabled={deleteProductMutation.isPending}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
