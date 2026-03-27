import { useFormContext } from 'react-hook-form';
import styles from '../Profile.module.css';
export const ChangeEmailAndPhone = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const phonePattern =
        /^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
    return (
        <>
            <label className={styles.inputBox}>
                <input
                    className={styles.inputField}
                    type="email"
                    placeholder="Email"
                    {...register('email', {
                        required: 'Заполните email',
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
                <input
                    className={styles.inputField}
                    type="tel"
                    inputMode="tel"
                    maxLength={16}
                    placeholder="+7 (___) ___-__-__"
                    {...register('number', {
                        required: 'Введите номер телефона',
                        pattern: {
                            value: phonePattern,
                            message:
                                'Некорректный формат телефона',
                        },
                    })}
                />
                {errors.number && (
                    <span className={styles.error}>
                        {errors.number.message}
                    </span>
                )}
            </label>
        </>
    );
};
