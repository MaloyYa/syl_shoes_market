import { create } from 'zustand';

import { persist } from 'zustand/middleware';

const initialTokens = {
    access_token: null,
    refresh_token: null,
};

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuth: false,
            access_token: null,
            refresh_token: null,
            checked: false,

            setUser: (userData) => {
                const isObject =
                    userData !== null &&
                    typeof userData === 'object';

                const hasNoError =
                    isObject &&
                    !Object.keys(userData).includes(
                        'detail',
                    );

                const isValidUserData =
                    isObject && hasNoError;
                set({
                    user: isValidUserData ? userData : null,
                    isAuth: isValidUserData,
                });
            },

            setNewUserData: (newUserData) => {
                set((state) => {
                    return {
                        user: {
                            ...state.user,
                            ...newUserData,
                        },
                    };
                });
            },
            setNewAddress: (newAddress) => {
                set((state) => {
                    if (!state.user) return state;

                    if (!newAddress) {
                        return {
                            user: {
                                ...state.user,
                                addresses: [],
                            },
                        };
                    }

                    const currentFirstAddress =
                        state.user.addresses?.[0];

                    const updatedAddress = {
                        ...(currentFirstAddress || {}),
                        ...newAddress,
                    };

                    return {
                        user: {
                            ...state.user,
                            addresses: [updatedAddress],
                        },
                    };
                });
            },

            setTokens: (newTokens) => {
                const { access_token, refresh_token } =
                    newTokens;
                set({ access_token, refresh_token });
            },

            resetUser: () =>
                set({
                    user: null,
                    isAuth: false,
                    checked: false,
                }),
            resetTokens: () => set(initialTokens),
            logout: () => {
                set({
                    user: null,
                    isAuth: false,
                });
            },
        }),
        { name: 'auth-store' },
    ),
);
