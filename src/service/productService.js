import { BASE_URL } from '../api/api';

export const productsService = {
    getProducts: async (setLoading, setProducts) => {
        setLoading(true);
        const respProduct = await fetch(
            `${BASE_URL}/products/`,
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
