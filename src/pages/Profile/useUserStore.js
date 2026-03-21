import { create } from 'zustand';

const initialUserState = {
    name: '',
    surname: '',
    patronomic: '',
    email: '',
    number: '',
    social_link: '',
    address: {
        region: '',
        city: '',
        street: '',
        house: '',
        entrance: '',
        apartment: '',
        postcode: '',
    },
};

export const useUserStore = create((set) => ({
    user: initialUserState,

    updateUserField: (nameField, valueField) => {
        set((state) => ({
            user: {
                ...state.user,
                [nameField]: valueField,
            },
        }));
        console.log(`${nameField}: ${valueField}`);
    },

    updateAddressField: (nameField, valueField) => {
        set((state) => ({
            user: {
                ...state.user,
                address: {
                    ...state.user.address,
                    [nameField]: valueField,
                },
            },
        }));
    },

    resetUser: () => {
        set({ user: initialUserState });
    },
}));
