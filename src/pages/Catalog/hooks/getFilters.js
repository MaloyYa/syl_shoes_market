// api/filters.js
import { BASE_URL } from '../../../api/api';

export const getFilters = async () => {
    try {
        const [
            sizesRes,
            brandsRes,
            categoriesRes,
            colorsRes,
        ] = await Promise.all([
            fetch(`${BASE_URL}/streams/filters/sizes/`, {
                headers: { accept: 'application/json' },
            }),
            fetch(`${BASE_URL}/brands/`, {
                headers: { accept: 'application/json' },
            }),
            fetch(`${BASE_URL}/streams/filters/category/`, {
                headers: { accept: 'application/json' },
            }),
            fetch(`${BASE_URL}/streams/filters/color/`, {
                headers: { accept: 'application/json' },
            }),
        ]);

        if (
            !sizesRes.ok ||
            !brandsRes.ok ||
            !categoriesRes.ok ||
            !colorsRes.ok
        ) {
            throw new Error('Failed to fetch filters');
        }

        const [
            availableSizes,
            brandsResponse,
            categories,
            colors,
        ] = await Promise.all([
            sizesRes.json(),
            brandsRes.json(),
            categoriesRes.json(),
            colorsRes.json(),
        ]);

        const brands = brandsResponse.map(
            (item) => item.brand_name,
        );

        return {
            availableSizes,
            brands,
            categories,
            colors,
        };
    } catch (error) {
        console.error('Error fetching filters:', error);
        throw error;
    }
};
