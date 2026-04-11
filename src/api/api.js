import { useAuthStore } from '../modules/auth/useAuthStore';
import { refresh_tokens } from './refresh_tokens';

export const BASE_URL = import.meta.env.VITE_API_URL;
export const authApi = async (
    forAuth = false,
    method = 'GET',
    url = '',
    body = '',
) => {
    method = method.toUpperCase();

    const request = `${BASE_URL}${url}`;

    if (method.toUpperCase() === 'POST' && forAuth) {
        try {
            const response = await fetch(request, {
                method: method,
                body: body,
                headers: {
                    accept: 'application/json',
                    'Content-Type':
                        'application/x-www-form-urlencoded',
                },
            });

            /*
			используется только если пользователь зарегистирован

			и флаг forAuth === false (чтобы явно проверить используем для входа

			или получения новых токенов), но истек рефреш

			если не зарегистирован => 401
			*/
            if (response.status === 401 && !forAuth) {
                const respInterceptor =
                    await refresh_tokens();

                return respInterceptor;
            }

            //если пришел 200 то возвращаем токены
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    } else if (method === 'GET') {
        try {
            const userDataResponse = await fetch(
                `${BASE_URL}${url}`,
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${
                            useAuthStore.getState()
                                .access_token
                        }`,
                    },
                },
            ).then((resp) => resp.json());
            return userDataResponse;
        } catch (error) {
            console.error(error);
        }
    }
};
