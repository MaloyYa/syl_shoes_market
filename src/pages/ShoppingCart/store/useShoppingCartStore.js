import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useShoppingCartStore = create(
    persist(
        (set) => ({
            shoppingCart: [],

            clearShoppingCart: () => {
                set({
                    shoppingCart: [],
                });
            },

            addToCart: (product) => {
                set((state) => {
                    const itemIndex =
                        state.shoppingCart.findIndex(
                            (item) =>
                                item.id === product.id &&
                                item.size === product.size,
                        );

                    if (itemIndex !== -1) {
                        const updatedCart = [
                            ...state.shoppingCart,
                        ];

                        updatedCart[itemIndex] = {
                            ...updatedCart[itemIndex],
                            quantity:
                                updatedCart[itemIndex]
                                    .quantity + 1,
                        };

                        return {
                            shoppingCart: updatedCart,
                        };
                    }

                    return {
                        shoppingCart: [
                            ...state.shoppingCart,
                            { ...product, quantity: 1 },
                        ],
                    };
                });
            },

            decreaseQuantity: (product) => {
                set((state) => {
                    const index =
                        state.shoppingCart.findIndex(
                            (item) =>
                                item.id === product.id &&
                                item.size === product.size,
                        );

                    if (index === -1) return state;

                    const item = state.shoppingCart[index];

                    if (item.quantity === 1) {
                        return {
                            shoppingCart:
                                state.shoppingCart.filter(
                                    (_, i) => i !== index,
                                ),
                        };
                    }

                    const updatedCart = [
                        ...state.shoppingCart,
                    ];

                    updatedCart[index] = {
                        ...item,
                        quantity: item.quantity - 1,
                    };

                    return {
                        shoppingCart: updatedCart,
                    };
                });
            },
            removeFromShoppingCart: (product) => {
                set((state) => {
                    const index =
                        state.shoppingCart.findIndex(
                            (item) =>
                                item.id === product.id &&
                                item.size === product.size,
                        );
                    if (index === -1) {
                        return state;
                    }

                    return {
                        shoppingCart:
                            state.shoppingCart.filter(
                                (_, i) => i !== index,
                            ),
                    };
                });
            },
        }),
        { name: 'shoppingCart-storage' },
    ),
);
