import { useAuthStore } from '../modules/auth/useAuthStore';
import { BASE_URL } from './api';
export const refresh_tokens = async () => {
    const store = useAuthStore.getState();
    const responseRefresh = await fetch(
        `${BASE_URL}/refresh/`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${store.refresh_token}`,
                'Content-Type': 'application/json',
            },
        },
    ).then((resp) => resp.json());
    return responseRefresh;
};
