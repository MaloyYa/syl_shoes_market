import { FormProvider, useForm } from 'react-hook-form';
import styles from './Profile.module.css';

import { ChangeFullname } from './components/ChangeFullname';
import { ChangePassword } from './components/ChangePassword';
import { ChangeAddress } from './components/ChangeAddress';
import { ChangeContact } from './components/ChangeContact';
import { ExitIcon } from '../../components/ui/ExitIcon';
import { useAuthStore } from '../../modules/auth/useAuthStore';
import { useNavigate } from 'react-router';
import { userService } from '../../service/userService';
import { useState } from 'react';
import { Notification } from '../../components/ui/Notification/Notification';
export const Profile = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const [loading, setLoading] = useState(false);

    const [isFailed, setIsFailed] = useState(false);

    const [isVisibleNotification, setVisibleNotification] =
        useState(false);
    const navigate = useNavigate();

    const [textNotification, setTextNotification] =
        useState('');

    const methods = useForm({
        defaultValues: {
            surname: user?.surname || 'Не указано',
            name: user?.name || 'Не указано',
            patronymic: user?.patronymic || 'Не указано',
            email: user?.email || 'Не указано',

            oldPassword: '',
            newPassword: '',
            confirmPassword: '',

            phone: user?.phone || 'Не указано',
            social_link: user?.social_link || 'Не указано',
            region:
                user?.addresses?.[0]?.region || 'Не указан',
            city: user?.addresses?.[0]?.city || 'Не указан',
            street:
                user?.addresses?.[0]?.street || 'Не указан',
            house:
                user?.addresses?.[0]?.house || 'Не указан',
            entrance:
                user?.addresses?.[0]?.entrance ||
                'Не указан',
            apartment:
                user?.addresses?.[0]?.apartment ||
                'Не указан',
            postcode:
                user?.addresses?.[0]?.postcode ||
                'Не указан',
        },
    });

    const {
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors },
    } = methods;

    const createNotification = (isSuccess) => {
        if (isSuccess) {
            setVisibleNotification(true);
            setIsFailed(false);
            setTextNotification('Данные успешно обновлены');
        } else {
            setVisibleNotification(true);
            setIsFailed(true);
            setTextNotification(
                'Произошла ошибка при выполнении запроса',
            );
        }
    };

    const checkDataForRequest = (data) => {
        const {
            id,
            name,
            surname,
            patronymic,
            social_link,

            email: dataEmail,
            phone: dataPhone,
            confirmPassword: password,
        } = data;

        const { email, phone } = user;
        const newUser = {
            id,
            name,
            surname,
            patronymic,
            social_link,
            password,
        };
        if (dataEmail === email && dataPhone === phone) {
            return {
                ...newUser,
            };
        } else if (dataEmail === email) {
            return { ...newUser, phone: dataPhone };
        } else if (dataPhone === phone) {
            return { ...newUser, email: dataEmail };
        }
        return newUser;
    };

    const getDataFromForm = (data) => {
        const {
            region,
            city,
            street,
            house,
            entrance,
            apartment,
            postcode,
        } = data;

        return {
            region,
            city,
            street,
            house,
            entrance,
            apartment,
            postcode,
        };
    };

    const changeRequestForAddress = async (addressData) => {
        if (
            useAuthStore.getState().user.addresses
                .length !== 0 &&
            useAuthStore.getState().user.addresses?.[0]?.id
        ) {
            const newAddress =
                await userService.updateUserAddress(
                    addressData,
                );
            return newAddress;
        } else {
            const newAddress =
                await userService.createAddress(
                    addressData,
                );
            return newAddress;
        }
    };

    const submit = async (data) => {
        try {
            setLoading(true);

            const userData = checkDataForRequest(data);

            const address = getDataFromForm(data);

            const { success, message, newUser } =
                await userService.updateUserData(userData);
            if (success === false) {
                setError('errorRequest', {
                    type: 'manual',
                    message,
                });
                createNotification(success);
                return;
            }

            const newAddress =
                await changeRequestForAddress(address);

            useAuthStore.getState().setNewUserData(newUser);
            useAuthStore
                .getState()
                .setNewAddress(newAddress);

            reset(
                {
                    surname: newUser?.surname || '',
                    name: newUser.name || '',
                    patronymic: newUser.patronymic || '',
                    email: newUser.email || '',
                    phone:
                        useAuthStore.getState().user
                            ?.phone || '',

                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',

                    social_link: newUser.social_link || '',
                    region: newAddress?.region || '',
                    city: newAddress?.city || '',
                    street: newAddress?.street || '',
                    house: newAddress?.house || '',
                    entrance: newAddress?.entrance || '',
                    apartment: newAddress?.apartment || '',
                    postcode: newAddress?.postcode || '',
                },
                {
                    keepErrors: true,
                    keepDirty: false,
                    keepTouched: false,
                },
            );
            createNotification(success);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
            setTimeout(() => {
                clearErrors('errorRequest');
            }, 7000);
        }
    };
    const handleExitButton = () => {
        logout();
        navigate('/');
    };
    return (
        <main className={styles.main}>
            <button
                className={styles.btnExitProfile}
                onClick={handleExitButton}>
                <span className={styles.exitProfileText}>
                    Выйти
                </span>
                <ExitIcon
                    size={24}
                    fill="red"
                />
            </button>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(submit)}
                    className={styles.profileForm}>
                    <ChangeFullname
                        titleSection={'Личные данные'}
                    />
                    <ChangePassword />
                    <div
                        className={
                            styles.addressAndContactData
                        }>
                        <h3 className={styles.categoryInfo}>
                            Адрес доставки и контакты
                        </h3>

                        <div
                            className={
                                styles.wrapperAddAndCont
                            }>
                            <ChangeAddress />
                            <ChangeContact />
                        </div>
                    </div>
                    {errors?.errorRequest && (
                        <p style={{ color: 'red' }}>
                            {errors?.errorRequest?.message}
                        </p>
                    )}
                    <button
                        type="submit"
                        className={styles.submitButton}>
                        {loading
                            ? 'Обновляем данные'
                            : 'Сохранить изменения'}
                    </button>
                </form>
            </FormProvider>
            <Notification
                isOpen={isVisibleNotification}
                duration={4000}
                isFailed={isFailed}
                text={textNotification}
                onClose={() => {
                    setVisibleNotification(false);
                }}
            />
        </main>
    );
};
