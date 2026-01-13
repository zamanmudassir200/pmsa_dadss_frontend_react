import api from "@/lib/axios"

export const platformService = {
  // GET all platforms
  getPlatforms: async (params = {}) => {
    const res = await api.get("/platform", { params });
    return res.data;
  },

  // GET platform by id
  getPlatformById: async (id) => {
    const res = await api.get(`/platform/${id}`);
    return res.data;
  },

  // CREATE
  createPlatform: async (payload) => {
    const res = await api.post("/platform", payload);
    return res.data;
  },

  // UPDATE
  updatePlatform: async ({ id, payload }) => {
    const res = await api.put(`/platform/${id}`, payload);
    return res.data;
  },

  // DELETE
  deletePlatform: async (id) => {
    await api.delete(`/platform/${id}`);
    return id;
  },

  // GET platform types
  getPlatformTypes: async () => {
    const res = await api.get("/platform_type");
    return res.data;
  },

  // GET squadrons
  getPlatformSquadrons: async () => {
    const res = await api.get("/platform_squadron");
    return res.data;
  },
};
  