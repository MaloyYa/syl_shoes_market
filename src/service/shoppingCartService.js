import { BASE_URL } from '../api/api';
import { refresh_tokens } from '../api/refresh_tokens';
import { useAuthStore } from '../modules/auth/useAuthStore';

export const shoppingCartService = {
    getShoppingCart: async () => {
        const request = `${BASE_URL}/carts/`;
        try {
            const response = await fetch(request, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${
                        useAuthStore.getState().access_token
                    }`,
                },
            });
            if (response.status === 401) {
                await refresh_tokens();
                return await shoppingCartService.getShoppingCart();
            }
            const shoppingCartData = await response.json();
            return shoppingCartData;
        } catch (error) {
            console.log(error);
        }
    },
    addToCart: async (size_id) => {
        const request = `${BASE_URL}/carts/items`;
        try {
            const response = await fetch(request, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${
                        useAuthStore.getState().access_token
                    }`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    size_id: size_id,
                    quantity: 1,
                }),
            });

            if (response.status === 401) {
                await refresh_tokens();
                return await shoppingCartService.addToCart(
                    size_id,
                );
            }
            if (response.ok) {
                return {
                    isSuccess: true,
                    message: 'Товар добавлен в корзину',
                };
            }
        } catch {
            return {
                isSuccess: false,
                message:
                    'Ошибка при добавлении товара в корзину',
            };
        }
    },
    deleteFromCart: async (item_id) => {
        const request = `${BASE_URL}/carts/items/${item_id}`;
        try {
            const response = await fetch(request, {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${
                        useAuthStore.getState().access_token
                    }`,
                },
            });

            if (response.status === 401) {
                await refresh_tokens();
                return await shoppingCartService.deleteFromCart(
                    item_id,
                );
            }
            if (response.ok) {
                return {
                    isSuccess: true,
                    message: 'Удаляем товар из корзины...',
                };
            }
        } catch {
            return {
                isSuccess: false,
                message:
                    'Ошибка при удалении товара из корзины',
            };
        }
    },

    changeQuantityItem: async (item_id, quantity) => {
        const request = `${BASE_URL}/carts/items/${item_id}`;

        try {
            const response = await fetch(request, {
                method: 'PATCH',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${
                        useAuthStore.getState().access_token
                    }`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            });

            if (response.status === 401) {
                await refresh_tokens();
                return await shoppingCartService.changeQuantityItem(
                    item_id,
                    quantity,
                );
            }

            const isSuccess = !!response.ok;

            const { quantity: count } =
                await response.json();
            return { isSuccess, count };
        } catch (error) {
            console.log(error);
        }
    },
};
