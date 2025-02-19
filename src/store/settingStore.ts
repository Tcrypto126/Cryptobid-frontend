import { create } from "zustand";

interface SettingState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useSettingStore = create<SettingState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}))