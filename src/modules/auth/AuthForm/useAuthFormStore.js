import { create } from 'zustand';

export const useAuthFormStore = create((set) => ({
    isVisibleForm: false,

    setVisibilityAuthForm: (value) => {
        set({ isVisibleForm: value });
    },
}));
