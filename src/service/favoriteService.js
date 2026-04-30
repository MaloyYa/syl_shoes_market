import { BASE_URL } from '../api/api';
import { refresh_tokens } from '../api/refresh_tokens';
import { useAuthStore } from '../modules/auth/useAuthStore';

export const favoriteService = {
    getFavorites: async () => {
        const request = `${BASE_URL}/favorites/`;
        try {
            const response = await fetch(request, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${
                        useAuthStore.getState().access_token
                    }`,
                },
            });
            if (response.status !== 200) {
                await refresh_tokens();
                return await favoriteService.getFavorites();
            }
            const { items } = await response.json();
            return items;
        } catch (error) {
            console.log(error);
        }
    },

    checkIsFavorite: async (product_id) => {
        const request = `${BASE_URL}/favorites/${product_id}/check`;
        try {
            const response = await fetch(request, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${
                        useAuthStore.getState().access_token
                    }`,
                },
            });
            if (response.status === 401) {
                await refresh_tokens();
                return await favoriteService.checkIsFavorite(
                    product_id,
                );
            }
            const { is_favorite } = await response.json();

            return is_favorite;
        } catch (error) {
            console.log(error.message);
        }
    },

    addToFavorite: async (product_id) => {
        const request = `${BASE_URL}/favorites/?product_id=${product_id}`;
        try {
            const response = await fetch(request, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${
                        useAuthStore.getState().access_token
                    }`,
                },
            });
            if (response.status === 401) {
                await refresh_tokens();
                return await favoriteService.addToFavorite(
                    product_id,
                );
            } 
            if (response.ok) {
                return {
                    success: true,
                    message: 'Товар добавлен в избранное',
                };
            }
        } catch (error) {
            console.log(error.message);
            return {
                success: false,
                message:
                    'Ошибка при добавлении товара в избранное',
            };
        }
    },
    deleteFromFavorite: async (product_id) => {
        const request = `${BASE_URL}/favorites/${product_id}`;
        try {
            const response = await fetch(request, {
                method: 'DELETE',
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${
                        useAuthStore.getState().access_token
                    }`,
                },
            });
            if (response.status === 401) {
                await refresh_tokens();
                return await favoriteService.deleteFromFavorite(
                    product_id,
                );
            }
            if (response.ok) {
                return {
                    success: true,
                    message: 'Товар удален из избранного',
                };
            }
        } catch {
            return {
                success: false,
                message:
                    'Произошла ошибка при удалении товара из избранного',
            };
        }
    },
};
