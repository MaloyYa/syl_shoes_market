import { useMemo } from 'react';

export const useFilterOptions = (products) => {
    return useMemo(() => {
        if (!products || products.length === 0) {
            return {
                availableSizes: [],
                brands: [],
                categories: [],
                colors: [],
                minPrice: 0,
                maxPrice: 10000,
            };
        } else {
            const availableSizes = [
                ...new Set(
                    products.flatMap(
                        (product) => product.availableSizes,
                    ),
                ),
            ].sort((a, b) => Number(a) - Number(b));

            const brands = [
                ...new Set(
                    products.map(
                        (product) => product.brand,
                    ),
                ),
            ];

            const categories = [
                ...new Set(
                    products.map(
                        (product) => product.category,
                    ),
                ),
            ];

            const colors = [
                ...new Set(
                    products.map(
                        (product) => product.color,
                    ),
                ),
            ];

            const prices = products.map(
                (product) => product.price,
            );
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

            return {
                availableSizes,
                brands,
                categories,
                colors,
                minPrice,
                maxPrice,
            };
        }
    }, [products]);
};
