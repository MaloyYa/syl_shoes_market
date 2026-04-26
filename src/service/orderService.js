import { BASE_URL } from '../api/api';
import { refresh_tokens } from '../api/refresh_tokens';
import { useAuthStore } from '../modules/auth/useAuthStore';

export const orderService = {
    createOrderFromShoppingCart: async (address_id) => {
        const request = `${BASE_URL}/orders/`;
        try {
            const response = await fetch(request, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${
                        useAuthStore.getState().access_token
                    }`,
                },
                body: JSON.stringify({ address_id }),
            });
            if (response.status === 401) {
                await refresh_tokens();
                return await orderService.createOrderFromShoppingCart(
                    address_id,
                );
            }

            const { id } = await response.json();

            return { success: true, id };
        } catch {
            return { success: false };
        }
    },
};
