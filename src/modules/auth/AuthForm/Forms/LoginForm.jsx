import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './FormStyle.module.css';
import { IconToggleVisible } from '../../../../components/ui/IconToggleVisible';

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange' });

    const [typeField, setTypeField] = useState('password');

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
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
                    {...register('login', {
                        required: 'Заполните поле логина',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Некорректный email',
                        },
                    })}
                />
                {errors.login && (
                    <span className={styles.error}>
                        {errors.login.message}
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

            <button
                type="submit"
                className={styles.btnSubmit}>
                Войти
            </button>
        </form>
    );
};
