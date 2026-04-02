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
        const regustRegeistration = `${BASE_URL}/auth/register/`;

        let isSuccesRegister = '';

        const store = useAuthStore.getState();

        const responseRegeistration = await fetch(
            regustRegeistration,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            },
        );
        if (responseRegeistration.status === 201) {
            const { userInfo } =
                await regustRegeistration.json();

            store.setUser(userInfo);

            isSuccesRegister = 'Success';

            return isSuccesRegister;
        } else if (responseRegeistration.status === 409) {
            isSuccesRegister =
                'Пользователь с таким email уже зарегистрирован';

            return isSuccesRegister;
        } else {
            isSuccesRegister =
                'Произошла ошибка в регистрации';

            return isSuccesRegister;
        }
    },
};
