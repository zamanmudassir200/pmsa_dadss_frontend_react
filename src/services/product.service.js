import { axiosClient } from "@/api/base/axiosClient";

export const productService = {
  // GET all products
  getProducts: async (filters = {}) => {
    const response = await axiosClient.get("/products", { params: filters });
    return response.data;
  },

  // GET single product
  getProductById: async (id) => {
    const response = await axiosClient.get(`/products/${id}`);
    return response.data;
  },

  // CREATE product
  createProduct: async (productData) => {
    const response = await axiosClient.post("/products", productData);
    return response.data;
  },

  // UPDATE product
  updateProduct: async (id, productData) => {
    const response = await axiosClient.put(`/products/${id}`, productData);
    return response.data;
  },

  // DELETE product
  deleteProduct: async (id) => {
    await axiosClient.delete(`/products/${id}`);
    return id;
  },
};
