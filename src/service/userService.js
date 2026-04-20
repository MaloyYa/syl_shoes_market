import { authApi, BASE_URL } from '../api/api';
import { refresh_tokens } from '../api/refresh_tokens';
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
                const { access_token, refresh_token } =
                    await responseRegistration.json();

                //устанавливаются токены
                useAuthStore.getState().setTokens({
                    access_token,
                    refresh_token,
                });

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
    updateUserData: async (newUserData) => {
        try {
            const requestUpdateUserData = `${BASE_URL}/users/`;
            newUserData.role = 'user';
            const responseUpdateUserData = await fetch(
                requestUpdateUserData,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${
                            useAuthStore.getState()
                                .access_token
                        }`,
                        accept: 'application/json',
                    },
                    body: JSON.stringify(newUserData),
                },
            );
            if (responseUpdateUserData.status === 401) {
                await refresh_tokens();
                const dataInterceptorResponse = await fetch(
                    requestUpdateUserData,
                    {
                        method: 'PATCH',
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${
                                useAuthStore.getState()
                                    .access_token
                            }`,
                            'Content-Type':
                                'application/json',
                        },
                        body: JSON.stringify(newUserData),
                    },
                );
                if (
                    dataInterceptorResponse.status === 409
                ) {
                    return {
                        succes: false,
                        message:
                            'Пользователь с таким номером или email уже зарегистрирован',
                    };
                }
                const newUser =
                    await dataInterceptorResponse.json();

                return {
                    success: true,
                    message: 'Response success',
                    newUser,
                };
            } else if (
                responseUpdateUserData.status === 409
            ) {
                return {
                    success: false,
                    message:
                        'Пользователь с таким номером или email уже зарегистрирован',
                };
            }
            const newUser =
                await responseUpdateUserData.json();
            return {
                success: true,
                message: 'Response success',
                newUser,
            };
        } catch {
            return {
                success: false,
                message:
                    'Произошла ошибка при выполнении запроса',
            };
        }
    },
    createAddress: async (addressData) => {
        const request = `${BASE_URL}/addresses/`;
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
                body: JSON.stringify(addressData),
            });
            if (response.status === 401) {
                await refresh_tokens();
                const interceptorResponse = await fetch(
                    request,
                    {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${
                                useAuthStore.getState()
                                    .access_token
                            }`,
                            'Content-Type':
                                'application/json',
                        },
                        body: JSON.stringify(addressData),
                    },
                ).then((resp) => resp.json());
                return interceptorResponse;
            }
            const address = await response.json();
            return address;
        } catch (error) {
            console.error(error.message);
        }
    },
    updateUserAddress: async (newUserAddress) => {
        try {
            const addressId =
                useAuthStore.getState().user.addresses[0]
                    .id;

            const requestUpdateAddress = `${BASE_URL}/addresses/${addressId}`;
            const responseUpdateAddress = await fetch(
                requestUpdateAddress,
                {
                    method: 'PATCH',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${
                            useAuthStore.getState()
                                .access_token
                        }`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUserAddress),
                },
            );

            if (responseUpdateAddress.status === 401) {
                await refresh_tokens();
                const addressInterceptorResponse =
                    await fetch(requestUpdateAddress, {
                        method: 'PATCH',
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${
                                useAuthStore.getState()
                                    .access_token
                            }`,
                            'Content-Type':
                                'application/json',
                        },
                        body: JSON.stringify(
                            newUserAddress,
                        ),
                    }).then((resp) => resp.json());

                return addressInterceptorResponse;
            }
            const newAddress =
                await responseUpdateAddress.json();
            return newAddress;
        } catch (error) {
            console.error(error.message);
        }
    },
};
