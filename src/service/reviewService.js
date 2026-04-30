import { BASE_URL } from '../api/api';
import { refresh_tokens } from '../api/refresh_tokens';
import { useAuthStore } from '../modules/auth/useAuthStore';

export const reviewService = {
    createReview: async (review) => {
        try {
            const request = `${BASE_URL}/reviews/`;
            const response = await fetch(request, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${
                        useAuthStore.getState().access_token
                    }`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });
            if (response.status === 401) {
                await refresh_tokens();
                return await reviewService.createReview(
                    review,
                );
            }
            if (response.ok) {
                return {
                    success: true,
                    message: 'Комментарий успешно создан',
                };
            }
        } catch {
            return {
                success: false,
                message:
                    'Произошла ошибка при выполнении запроса',
            };
        }
    },

    getReviews: async () => {
        const request = `${BASE_URL}/reviews/`;
        try {
            const response = await fetch(request, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            }).then((resp) => resp.json());
            return response;
        } catch (error) {
            console.error(error.message);
        }
    },
};
