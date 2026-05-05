import { BASE_URL } from '../api/api';

export const productsService = {
    getProducts: async (
        setLoading,
        setProducts,
        filters = {},
    ) => {
        const queryParams = new URLSearchParams();
        if (filters?.selectedSizes?.length) {
            filters.selectedSizes.forEach((size) => {
                queryParams.append('size', size);
            });
        }

        if (filters?.price?.minPrice) {
            queryParams.append(
                'price_min',
                parseInt(filters.price.minPrice),
            );
        }

        if (filters?.price?.maxPrice) {
            queryParams.append(
                'price_max',
                parseInt(filters.price.maxPrice),
            );
        }

        if (filters?.selectedBrands?.length) {
            filters.selectedBrands.forEach((brand) => {
                queryParams.append('brand_name', brand);
            });
        }

        if (filters?.selectedCategories?.length) {
            filters.selectedCategories.forEach(
                (category) => {
                    queryParams.append(
                        'category',
                        category,
                    );
                },
            );
        }
        if (filters?.selectedColors?.length) {
            filters.selectedColors.forEach((color) => {
                queryParams.append('color', color);
            });
        }
        queryParams.append('page', 1)
        queryParams.append('limit', 50)

        setLoading(true);
        const respProduct = await fetch(
            `${BASE_URL}/products/?${queryParams.toString()}`,
            {
                headers: {
                    accept: 'application/json',
                },
            },
        ).then((resp) => resp.json());
        setProducts(respProduct);
        setLoading(false);
    },
};
