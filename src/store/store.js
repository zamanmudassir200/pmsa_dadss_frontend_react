import { create } from "zustand";

export const useStore = create((set) => ({
  user: null,
  token: null,

  login: (user, token) => set({ user, token }),

  logout: () => set({ user: null, token: null }),

  // search: "",
  // editingKey: null,

  // setSearch: (search) => set({ search }),
  // setEditingKey: (key) => set({ editingKey: key }),
  // reset: () => set({ editingKey: null }),

  //  data: [],
  // isLoading: false,
  // error: null,

  // // ===== setters =====
  // setLoading: (isLoading) => set({ isLoading }),
  // setData: (data) => set({ data }),
  // setError: (error) => set({ error }),

  // // ===== add / remove row (Add Platform use case) =====
  // addTempRow: (row) =>
  //   set((state) => ({
  //     data: [row, ...state.data],
  //   })),

  // removeTempRow: (pf_key) =>
  //   set((state) => ({
  //     data: state.data.filter((item) => item.pf_key !== pf_key),
  //   })),

  // updateRow: (pf_key, field, value) =>
  //   set((state) => ({
  //     data: state.data.map((row) =>
  //       row.pf_key === pf_key ? { ...row, [field]: value } : row
  //     ),
  //   })),

  // reset: () =>
  //   set({
  //     data: [],
  //     isLoading: false,
  //     error: null,
  //   }),

  platforms: [], // Original data from API
  tempRows: [], // Temporary rows for adding new platforms
  editingRow: null, // Currently editing row (for existing rows)

  // Add new temporary row for adding platform
  addTempRow: (rowData) =>
    set((state) => ({
      tempRows: [...state.tempRows, { ...rowData, isTemp: true }],
    })),

  // Remove temporary row
  removeTempRow: (tempId) =>
    set((state) => ({
      tempRows: state.tempRows.filter((row) => row.tempId !== tempId),
    })),

  // Update temporary row data
  updateTempRow: (tempId, field, value) =>
    set((state) => ({
      tempRows: state.tempRows.map((row) =>
        row.tempId === tempId ? { ...row, [field]: value } : row
      ),
    })),

  // Clear all temporary rows
  clearTempRows: () => set({ tempRows: [] }),

  // Set platforms from API
  setPlatforms: (platforms) => set({ platforms }),

  // Set editing row
  setEditingRow: (row) => set({ editingRow: row }),

  // Clear editing row
  clearEditingRow: () => set({ editingRow: null }),
}));
