// /store/filterStore.ts
import { create } from "zustand";

interface FilterStore {
  status: string[];
  week: string;
  toggleStatus: (value: string) => void;
  setWeek: (week: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  status: [],
  week: "",

  toggleStatus: (value) =>
    set((state) => ({
      status: state.status.includes(value)
        ? state.status.filter((s) => s !== value)
        : [...state.status, value],
    })),

  setWeek: (week) => set({ week }),

  resetFilters: () => set({ status: [], week: "" }),
}));
