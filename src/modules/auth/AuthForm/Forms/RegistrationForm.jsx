/* eslint-disable react-hooks/incompatible-library */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../Forms/FormStyle.module.css';
import { IconToggleVisible } from '../../../../components/ui/IconToggleVisible';

export const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
        watch,
    } = useForm({ mode: 'onChange' });

    const [typeField, setTypeField] = useState('password');

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        reset({ ...data });
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}>
            <label className={styles.inputBox}>
                <span className={styles.titleField}>
                    Имя
                </span>
                <input
                    className={styles.inputField}
                    type="text"
                    {...register('name', {
                        required: 'Заполните это поле',
                        pattern: {
                            value: /^[A-Za-zА-Яа-яЁё\s]+$/,
                            message:
                                'Имя может содержать только буквы',
                        },
                    })}
                />
                {errors.name && (
                    <span className={styles.error}>
                        {errors.name.message}
                    </span>
                )}
            </label>
            <label className={styles.inputBox}>
                <span className={styles.titleField}>
                    Фамилия
                </span>
                <input
                    className={styles.inputField}
                    type="text"
                    {...register('surname', {
                        required: 'Заполните это поле',
                        pattern: {
                            value: /^[A-Za-zА-Яа-яЁё\s]+$/,
                            message:
                                'Фамилия может содержать только буквы',
                        },
                        minLength: {
                            value: 4,
                            message:
                                'Фамилия должна содержать минимум 4 символа',
                        },
                        maxLength: {
                            value: 30,
                            message:
                                'Фамилия должна содержать максимум 30 символов',
                        },
                    })}
                />
                {errors.surname && (
                    <span className={styles.error}>
                        {errors.surname.message}
                    </span>
                )}
            </label>
            <label className={styles.inputBox}>
                <span className={styles.titleField}>
                    Отчество
                </span>
                <input
                    className={styles.inputField}
                    type="text"
                    {...register('patronymic', {
                        required: 'Заполните это поле',
                        pattern: {
                            value: /^[A-Za-zА-Яа-яЁё\s]+$/,
                            message:
                                'Отчество может содержать только буквы',
                        },
                    })}
                />
                {errors.patronymic && (
                    <span className={styles.error}>
                        {errors.patronymic.message}
                    </span>
                )}
            </label>
            <label className={styles.inputBox}>
                <span className={styles.titleField}>
                    Email
                </span>
                <input
                    className={styles.inputField}
                    type="text"
                    {...register('email', {
                        required: 'Заполните это поле',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message:
                                'Введите корректный email',
                        },
                    })}
                />
                {errors.email && (
                    <span className={styles.error}>
                        {errors.email.message}
                    </span>
                )}
            </label>
            <label className={styles.inputBox}>
                <span className={styles.titleField}>
                    Ссылка на социальную сеть
                </span>
                <input
                    className={styles.inputField}
                    type="text"
                    {...register('socialLink', {
                        required: 'Заполните это поле',
                        pattern: {
                            value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
                            message:
                                'Введите корректную ссылку',
                        },
                    })}
                />
                {errors.socialLink && (
                    <span className={styles.error}>
                        {errors.socialLink.message}
                    </span>
                )}
            </label>
            <label className={styles.inputBox}>
                <span className={styles.titleField}>
                    Пароль
                </span>
                <input
                    className={styles.inputField}
                    type={typeField}
                    {...register('password', {
                        required: 'Заполните это поле',
                        minLength: {
                            value: 8,
                            message:
                                'Пароль должен содержать минимум 8 символов',
                        },
                    })}
                />
            </label>
            {errors.password && (
                <span className={styles.error}>
                    {errors.password.message}
                </span>
            )}
            <label className={styles.inputBox}>
                <span className={styles.titleField}>
                    Подтвердите пароль
                </span>
                <div className={styles.passFieldWrapper}>
                    <input
                        className={styles.inputField}
                        type={typeField}
                        {...register('confirmPassword', {
                            required: 'Заполните это поле',
                            validate: (value) => {
                                return (
                                    value ===
                                        watch('password') ||
                                    'Пароли не совпадают'
                                );
                            },
                        })}
                    />

                    <button
                        type="button"
                        className={styles.toggleVisibleBtn}
                        onClick={() =>
                            setTypeField((prev) =>
                                prev === 'password'
                                    ? 'text'
                                    : 'password',
                            )
                        }>
                        <IconToggleVisible
                            fill="#fff"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>
            </label>
            {errors?.confirmPassword && (
                <span className={styles.error}>
                    {errors.confirmPassword.message}
                </span>
            )}

            <button
                type="submit"
                className={styles.btnSubmit}>
                Зарегистрироваться
            </button>
        </form>
    );
};
