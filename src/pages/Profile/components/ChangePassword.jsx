import { useFormContext } from 'react-hook-form';
import styles from '../Profile.module.css';
import { useCallback, useState } from 'react';

export const ChangePassword = () => {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();

    const errorMessage = 'Поле не может быть пустым';
    const [typeField, setTypeField] = useState('password');

    const handleToggleType = useCallback(() => {
        setTypeField((prev) =>
            prev === 'password' ? 'text' : 'password',
        );
    }, []);

    return (
        <div className={styles.blockCategoryInfo}>
            <h3 className={styles.categoryInfo}>
                Новый пароль
            </h3>
            <label className={styles.inputBox}>
                <input
                    className={styles.inputField}
                    type={typeField}
                    placeholder="Старый пароль"
                    maxLength={30}
                    {...register('oldPassword', {
                        required: 'Заполните это поле',
                        minLength: {
                            value: 8,
                            message:
                                'Пароль должен содержать минимум 8 символов',
                        },
                        maxLength: {
                            value: 30,
                            message:
                                'Пароль не более 30 символов',
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
                <div className={styles.wrapperInput}>
                    <input
                        className={styles.inputField}
                        type={typeField}
                        placeholder="Новый пароль"
                        maxLength={30}
                        {...register('newPassword', {
                            required: 'Заполните это поле',
                            minLength: {
                                value: 8,
                                message:
                                    'Пароль должен содержать минимум 8 символов',
                            },
                            maxLength: {
                                value: 30,
                                message:
                                    'Пароль не более 30 символов',
                            },
                        })}
                    />
                    <button
                        className={styles.btnSwapTypeField}
                        type="button"
                        onClick={handleToggleType}>
                        {typeField === 'password'
                            ? 'Показать пароль'
                            : 'Скрыть пароль'}
                    </button>
                </div>
            </label>
            <label className={styles.inputBox}>
                <input
                    className={styles.inputField}
                    type={typeField}
                    placeholder="Подтвердите пароль"
                    maxLength={30}
                    {...register('confirmPassword', {
                        required: errorMessage,
                        maxLength: {
                            value: 30,
                            message:
                                'Пароль не более 30 символов',
                        },
                        validate: (value) =>
                            value ===
                                watch('newPassword') ||
                            'Пароли не совпадают',
                    })}
                />
                {errors.confirmPassword && (
                    <span className={styles.error}>
                        {errors.confirmPassword.message}
                    </span>
                )}
            </label>
        </div>
    );
};
