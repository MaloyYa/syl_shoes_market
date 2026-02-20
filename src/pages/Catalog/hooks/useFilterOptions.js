import { useMemo } from 'react';

export const useFilterOptions = (allProducts) => {
    return useMemo(() => {
        if (!allProducts || allProducts.length === 0) {
            return {
                sizes: [],
                brands: [],
                categories: [],
                colors: [],
                minPrice: 0,
                maxPrice: 10000,
            };
        } else {
            const sizes = [
                ...new Set(
                    allProducts.map(
                        (product) => product.size,
                    ),
                ),
            ].sort((a, b) => Number(a) - Number(b));

            const brands = [
                ...new Set(
                    allProducts.map(
                        (product) => product.brand,
                    ),
                ),
            ];

            const categories = [
                ...new Set(
                    allProducts.map(
                        (product) => product.category,
                    ),
                ),
            ];

            const colors = [
                ...new Set(
                    allProducts.map(
                        (product) => product.color,
                    ),
                ),
            ];

            const prices = allProducts.map(
                (product) => product.price,
            );
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

            return {
                sizes,
                brands,
                categories,
                colors,
                minPrice,
                maxPrice,
            };
        }
    }, [allProducts]);
};
