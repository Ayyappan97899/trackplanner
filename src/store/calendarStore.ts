import { create } from "zustand";
import { addMonths, subMonths } from "date-fns";

interface CalendarState {
  currentDate: Date;
  search: string;
  setSearch: (value: string) => void;
  setCurrentDate: (date: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  resetToday: () => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: new Date(),

  setCurrentDate: (date) => set({ currentDate: date }),

  nextMonth: () => set({ currentDate: addMonths(get().currentDate, 1) }),

  prevMonth: () => set({ currentDate: subMonths(get().currentDate, 1) }),

  resetToday: () => set({ currentDate: new Date() }),
  search: "",
  setSearch: (value) => set({ search: value }),
}));
