import { useFormContext } from 'react-hook-form';
import styles from '../Profile.module.css';
export const ChangeFullname = ({ titleSection }) => {
    const errorMessage = 'Поле не может быть пустым';
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className={styles.blockCategoryInfo}>
            {titleSection && (
                <h3 className={styles.categoryInfo}>
                    Личные данные
                </h3>
            )}
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
    );
};
