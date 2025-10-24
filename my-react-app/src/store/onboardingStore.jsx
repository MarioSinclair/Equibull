// src/store/onboardingStore.js
import { create } from "zustand";

// Default onboarding data structure
const defaultData = {
  profile: { firstName: "", lastName: "", email: "", state: "" },
  rent: { provider: "", months: 12, onTimePct: 0.9 },
  bank: { connected: false, monthlySavings: 500, monthlyDebt: 600 },
  credit: { utilization: 0.25, score: 680, consent: false },
};

// Load existing data from localStorage if available
const fromLocalStorage = () => {
  try {
    const saved = localStorage.getItem("pathwise_onboarding");
    return saved ? JSON.parse(saved) : defaultData;
  } catch {
    return defaultData;
  }
};

// Zustand store definition
export const useOnboarding = create((set, get) => ({
  data: fromLocalStorage(),

  setSection: (key, value) =>
    set((state) => {
      const updated = {
        ...state.data,
        [key]: { ...state.data[key], ...value },
      };
      localStorage.setItem("pathwise_onboarding", JSON.stringify(updated));
      return { data: updated };
    }),

  reset: () =>
    set(() => {
      localStorage.removeItem("pathwise_onboarding");
      return { data: defaultData };
    }),
}));
