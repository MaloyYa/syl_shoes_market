import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    isAuth: true,
    setIsAuth: (value) => set({ isAuth: value }),
}));
