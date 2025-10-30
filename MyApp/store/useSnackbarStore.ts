import { create } from 'zustand';

type SnackbarState = {
  visible: boolean;
  message: string;
  show: (message: string) => void;
  hide: () => void;
};

export const useSnackbarStore = create<SnackbarState>((set) => ({
  visible: false,
  message: '',
  show: (message) => set({ visible: true, message }),
  hide: () => set({ visible: false, message: '' }),
}));
