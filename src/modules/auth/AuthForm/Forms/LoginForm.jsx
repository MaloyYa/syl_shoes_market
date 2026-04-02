import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './FormStyle.module.css';
import { IconToggleVisible } from '../../../../components/ui/IconToggleVisible';

import { useAuthFormStore } from '../useAuthFormStore';
import { userService } from '../../../../service/userService';

export const LoginForm = () => {
    const setVisibilityAuthForm = useAuthFormStore(
        (state) => state.setVisibilityAuthForm,
    );
    const [isLoading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({ mode: 'onChange' });

    const [typeField, setTypeField] = useState('password');

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            setLoading(true);

            const isSuccess = await userService.login(
                email,
                password,
            );

            if (isSuccess) {
                setVisibilityAuthForm(false);
            } else {
                setError('loginError', {
                    message: 'Неверный email или пароль',
                    type: 'manual',
                });
            }
        } catch {
            setError('loginError', {
                message: 'Произошла ошибка при входе',
                type: 'manual',
            });
        } finally {
            setLoading(false);
        }
        setTimeout(() => {
            clearErrors('loginError');
        }, 3000);
        clearTimeout();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}>
            <label className={styles.inputBox}>
                <span className={styles.titleField}>
                    Email
                </span>
                <input
                    type="text"
                    placeholder="Email"
                    maxLength={25}
                    className={styles.inputField}
                    {...register('email', {
                        required: 'Заполните поле логина',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Некорректный email',
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
                    Пароль
                </span>
                <div className={styles.passFieldWrapper}>
                    <input
                        type={typeField}
                        placeholder="Password"
                        className={styles.inputField}
                        {...register('password', {
                            required:
                                'Заполните поле пароля',
                            minLength: {
                                value: 8,
                                message:
                                    'Пароль должен быть не менее 8 символов',
                            },
                            maxLength: {
                                value: 40,
                                message:
                                    'Пароль должен быть не более 40 символов',
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
                {errors.password && (
                    <span className={styles.error}>
                        {errors.password.message}
                    </span>
                )}
            </label>
            {errors.loginError && (
                <span className={styles.error}>
                    {errors.loginError.message}
                </span>
            )}
            <button
                type="submit"
                className={styles.btnSubmit}>
                {!isLoading ? 'Войти' : ' Проверяем данные'}
            </button>
        </form>
    );
};
