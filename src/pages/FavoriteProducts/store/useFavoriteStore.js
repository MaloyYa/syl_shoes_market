import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFavoriteStore = create(
    persist(
        (set, get) => ({
            favoriteProducts: [],
            isFavorite: (id) => {
                return get().favoriteProducts.some(
                    (item) => item.id === id,
                );
            },
            toggleFavorite: (product) => {
                if (get().isFavorite(product.id)) {
                    set((state) => ({
                        favoriteProducts:
                            state.favoriteProducts.filter(
                                (item) =>
                                    item.id !== product.id,
                            ),
                    }));
                } else {
                    set((state) => ({
                        favoriteProducts: [
                            ...state.favoriteProducts,
                            product,
                        ],
                    }));
                }
            },
            getSizeFavorite: () => {
                return get().favoriteProducts.length;
            },
            getFavorites: () => {
                return get().favoriteProducts;
            },
        }),
        { name: 'favoriteProducts-storage' },
    ),
);
