import { useForm } from 'react-hook-form';
import styles from './Profile.module.css';
import { useUserStore } from './useUserStore';
import { useState } from 'react';
export const Profile = () => {
    const user = useUserStore((state) => state.user);
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            surname: user.surname,
            name: user.name,
            patronomic: user.patronomic,
            email: user.email,
            number: user.number,
            social_link: user.social_link,
            region: user?.address?.region,
            city: user?.address?.city,
            street: user?.address?.street,
            house: user?.address?.house,
            entrance: user?.address?.entrance,
            apartment: user?.address?.apartment,
            postscode: user?.address?.postcode,
        },
    });

    const [typeField, setTypeField] = useState('password');

    const { updateUserField, updateAddressField } =
        useUserStore();

    const errorMessage = 'Поле не может быть пустым';

    const submit = (data) => {
        updateUserField('surname', data.surname);
        updateUserField('name', data.name);
        updateUserField('patronomic', data.patronomic);
    };
    return (
        <main className={styles.main}>
            <button>Выйти</button>
            <form
                onSubmit={handleSubmit(submit)}
                className={styles.profileForm}>
                <div className={styles.blockCategoryInfo}>
                    <h3 className={styles.categoryInfo}>
                        Личные данные
                    </h3>
                    <label className={styles.inputBox}>
                        <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Фамилия"
                            {...register('surname', {
                                required: errorMessage,
                            })}
                        />
                        {errors.surname && (
                            <span className={styles.error}>
                                {errors.surname.message}
                            </span>
                        )}
                    </label>
                    <label className={styles.inputBox}>
                        <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Имя"
                            {...register('name', {
                                required: errorMessage,
                            })}
                        />
                        {errors.name && (
                            <span className={styles.error}>
                                {errors.name.message}
                            </span>
                        )}
                    </label>
                    <label className={styles.inputBox}>
                        <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Отчество"
                            {...register('patronomic', {
                                required: errorMessage,
                            })}
                        />
                        {errors.patronomic && (
                            <span className={styles.error}>
                                {errors.patronomic.message}
                            </span>
                        )}
                    </label>
                </div>

                <div className={styles.blockCategoryInfo}>
                    <h3 className={styles.categoryInfo}>
                        Новый пароль
                    </h3>

                    <label className={styles.inputBox}>
                        <input
                            className={styles.inputField}
                            type={typeField}
                            placeholder="Старый пароль"
                            {...register('oldPassword', {
                                required:
                                    'Заполните это поле',
                                minLength: {
                                    value: 8,
                                    message:
                                        'Пароль должен содержать минимум 8 символов',
                                },
                            })}
                        />
                        {errors.oldPassword && (
                            <span className={styles.error}>
                                {errors.oldPassword.message}
                            </span>
                        )}
                    </label>
                    <label className={styles.inputBox}>
                        <div
                            className={styles.wrapperInput}>
                            <input
                                className={
                                    styles.inputField
                                }
                                type={typeField}
                                placeholder="Новый пароль"
                                {...register(
                                    'newPassword',
                                    {
                                        required:
                                            'Заполните это поле',
                                        minLength: {
                                            value: 8,
                                            message:
                                                'Пароль должен содержать минимум 8 символов',
                                        },
                                    },
                                )}
                            />
                            <button
                                className={
                                    styles.btnSwapTypeField
                                }
                                onClick={() =>
                                    setTypeField((prev) =>
                                        prev === 'password'
                                            ? 'text'
                                            : 'password',
                                    )
                                }>
                                Показать пароль
                            </button>
                        </div>
                    </label>
                    <label className={styles.inputBox}>
                        <input
                            className={styles.inputField}
                            type={typeField}
                            placeholder="Подтвердите пароль"
                            {...register(
                                'confirmPassword',
                                {
                                    required: errorMessage,
                                    validate: (value) =>
                                        value ===
                                            watch(
                                                'newPassword',
                                            ) ||
                                        'Пароли не совпадают',
                                },
                            )}
                        />
                        {errors.confirmPassword && (
                            <span className={styles.error}>
                                {
                                    errors.confirmPassword
                                        .message
                                }
                            </span>
                        )}
                    </label>
                </div>
                <button type="submit">
                    Сохранить изменения
                </button>
            </form>
        </main>
    );
};
