import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../Forms/FormStyle.module.css';
import { IconToggleVisible } from '../../../../components/ui/IconToggleVisible';
import { userService } from '../../../../service/userService';
import { useAuthFormStore } from '../useAuthFormStore';

export const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            surname: '',
            patronymic: '',
            email: '',
            social_link: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
    });

    const setVisibilityAuthForm = useAuthFormStore(
        (state) => state.setVisibilityAuthForm,
    );

    const [typeField, setTypeField] = useState('password');
    const [isLoading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        const { confirmPassword, ...userData } = data;

        const result = await userService.registration(
            userData,
        );

        if (result.success) {
            setVisibilityAuthForm(false);
        } else {
            setError('errorRegistration', {
                type: 'manual',
                message: result.message,
            });
        }
        setLoading(false);
    };

    const phonePattern =
        /^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}>
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
                    Номер телефона
                </span>
                <input
                    className={styles.inputField}
                    type="tel"
                    inputMode="tel"
                    maxLength={16}
                    placeholder="+7 (___) ___-__-__"
                    {...register('phone', {
                        required: 'Введите номер телефона',
                        pattern: {
                            value: phonePattern,
                            message:
                                'Некорректный формат телефона',
                        },
                    })}
                />
                {errors.phone && (
                    <span className={styles.error}>
                        {errors.phone.message}
                    </span>
                )}
            </label>
            <label className={styles.inputBox}>
                <span className={styles.titleField}>
                    Email
                </span>
                <input
                    className={styles.inputField}
                    type="email"
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
                    {...register('social_link', {
                        required: 'Заполните это поле',
                        pattern: {
                            value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
                            message:
                                'Введите корректную ссылку',
                        },
                    })}
                />
                {errors.social_link && (
                    <span className={styles.error}>
                        {errors.social_link.message}
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
                                        // eslint-disable-next-line react-hooks/incompatible-library
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
            {errors?.errorRegistration && (
                <span className={styles.error}>
                    {errors.errorRegistration.message}
                </span>
            )}
            <button
                type="submit"
                className={styles.btnSubmit}>
                {isLoading
                    ? 'Проверяем ваши данные'
                    : 'Зарегистрироваться'}
            </button>
        </form>
    );
};
