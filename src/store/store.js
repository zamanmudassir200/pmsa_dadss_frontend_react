import { create } from "zustand";
import PlatformFields from "@/adapters/platformKeys";
export const useStore = create((set) => ({
  // Authentication
  user: null,
  token: null,

  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),

  // Platform Data Management
  platforms: [],
  tempRows: [],
  editingRow: null,

  // Set platforms from API
  setPlatforms: (platforms) => set({ platforms }),

  // Temporary rows for adding
  addTempRow: (tempId) =>
    set(() => ({
      tempRows: [
        {
          tempId,
          isTemp: true,
          ...Object.keys(PlatformFields).reduce((acc, key) => {
            acc[PlatformFields[key].key] = "";
            return acc;
          }, {}),
        },
      ],
    })),
  removeTempRow: (tempId) =>
    set((state) => ({
      tempRows: state.tempRows.filter((row) => row.tempId !== tempId),
    })),

  updateTempRow: (tempId, field, value) =>
    set((state) => ({
      tempRows: state.tempRows.map((row) =>
        row.tempId === tempId ? { ...row, [field]: value } : row,
      ),
    })),

  clearTempRows: () => set({ tempRows: [] }),

  // Update existing row
  updateRow: (pf_key, field, value) =>
    set((state) => ({
      platforms: state.platforms.map((row) =>
        row.pf_key === pf_key ? { ...row, [field]: value } : row,
      ),
    })),

  // Edit row management
  setEditingRow: (row) => set({ editingRow: row }),
  clearEditingRow: () => set({ editingRow: null }),

  // Save editing changes to actual data
  saveEditedRow: (updatedRow) =>
    set((state) => ({
      platforms: state.platforms.map((row) =>
        row.pf_key === updatedRow.pf_key ? updatedRow : row,
      ),
      editingRow: null,
    })),

  // Add new platform to actual data
  addPlatform: (newPlatform) =>
    set((state) => ({
      platforms: [newPlatform, ...state.platforms],
      tempRows: state.tempRows.filter(
        (row) => row.tempId !== newPlatform.tempId,
      ),
    })),
}));
