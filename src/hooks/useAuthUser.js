import { useEffect } from 'react';
import { useAuthStore } from '../modules/auth/useAuthStore';
import { BASE_URL } from '../api/api';
//TODO переписать хук с использованием authApi
export const useAuthUser = () => {
    const { setTokens, setUser, logout, checked } =
        useAuthStore();

    useEffect(() => {
        const state = useAuthStore.getState();
        //если проверили уже токены => возврат
        if (checked || !state.access_token) {
            if (!checked) {
                useAuthStore.setState({ checked: true });
            }
            return;
        }

        const checkAuth = async () => {
            try {
                const { access_token, refresh_token } =
                    useAuthStore.getState();

                const response = await fetch(
                    `${BASE_URL}/auth/me`,
                    {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${access_token}`,
                        },
                    },
                );

                //если access умер, то пытаемся получить новые токены по refresh
                if (response.status === 401) {
                    const refreshResponse = await fetch(
                        `${BASE_URL}/auth/refresh/`,
                        {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${refresh_token}`,
                                'Content-Type':
                                    'application/json',
                            },
                        },
                    );
                    //если пришел 200  => запрашиваем данные юзера по новому access
                    if (refreshResponse.ok) {
                        const {
                            access_token: newAccess,
                            refresh_token: newRefresh,
                        } = await refreshResponse.json();

                        setTokens({
                            access_token: newAccess,
                            refresh_token: newRefresh,
                        });

                        const meResponse = await fetch(
                            `${BASE_URL}/auth/me`,
                            {
                                headers: {
                                    accept: 'application/json',
                                    Authorization: `Bearer ${newAccess}`,
                                },
                            },
                        );
                        //если 200, то устанавливаем данные пользователя
                        if (meResponse.ok) {
                            const userData =
                                await meResponse.json();
                            setUser(userData);
                        } else {
                            logout();
                        }
                    } else {
                        logout();
                    }
                    return;
                }

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    logout();
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                logout();
            } finally {
                useAuthStore.setState({ checked: true });
            }
        };

        checkAuth();
    }, [checked, setUser, logout, setTokens]);
};
