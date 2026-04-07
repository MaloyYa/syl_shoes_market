import { authApi, BASE_URL } from '../api/api';
import { useAuthStore } from '../modules/auth/useAuthStore';

export const userService = {
    login: async (email, password) => {
        const queryParams = new URLSearchParams();

        const store = useAuthStore.getState();

        queryParams.append('username', email);
        queryParams.append('password', password);

        const request = '/auth/login/';

        const response = await authApi(
            true,
            'POST',
            request,
            queryParams,
        );

        const { access_token, refresh_token } = response;

        if (!access_token) {
            return false;
        }
        store.setTokens({ access_token, refresh_token });

        try {
            const getUserRequest = '/auth/me/';

            const responseUserData = await authApi(
                false,
                'GET',
                getUserRequest,
            );

            store.setUser(responseUserData);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    registration: async (userData) => {
        const requestRegistration = `${BASE_URL}/auth/register/`;

        try {
            const responseRegistration = await fetch(
                requestRegistration,
                {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                },
            );

            if (responseRegistration.status === 201) {
                const { userInfo } =
                    await responseRegistration.json();

                //устанавливаются токены
                useAuthStore.getState().setUser(userInfo);
                console.log(
                    `Access token: ${
                        useAuthStore.getState().access_token
                    }`,
                );

                //получение данных юзера по токену
                const userInfoRequest = '/auth/me';
                const userInfoResponse = await authApi(
                    false,
                    'GET',
                    userInfoRequest,
                );

                useAuthStore
                    .getState()
                    .setUser(userInfoResponse);

                return { success: true };
            }

            if (responseRegistration.status === 409) {
                return {
                    success: false,
                    message:
                        'Пользователь с таким email уже зарегистрирован',
                };
            }

            return {
                success: false,
                message: 'Произошла ошибка при регистрации',
            };
        } catch (error) {
            console.error('Registration failed:', error);
            return {
                success: false,
                message: 'Ошибка сети или сервера',
            };
        }
    },
};
