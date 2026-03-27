import { useFormContext } from 'react-hook-form';
import styles from '../Profile.module.css';

export const ChangeAddress = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const errorMessage = 'Поле не может быть пустым';
    return (
        <div className={styles.blockCategoryInfo}>
            <label className={styles.inputBox}>
                <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Регион"
                    {...register('region', {
                        required: errorMessage,
                    })}
                />
                {errors.region && (
                    <span className={styles.error}>
                        {errors.region.message}
                    </span>
                )}
            </label>
            <label className={styles.inputBox}>
                <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Город"
                    {...register('city', {
                        required: errorMessage,
                    })}
                />
                {errors.city && (
                    <span className={styles.error}>
                        {errors.city.message}
                    </span>
                )}
            </label>
            <label className={styles.inputBox}>
                <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Улица"
                    {...register('street', {
                        required: errorMessage,
                    })}
                />
                {errors.street && (
                    <span className={styles.error}>
                        {errors.street.message}
                    </span>
                )}
            </label>

            <div className={styles.buildingData}>
                <label className={styles.inputBox}>
                    <input
                        className={`${styles.inputField} ${
                            errors.house &&
                            styles.errorInput
                        }`}
                        type="text"
                        placeholder="Дом"
                        {...register('house', {
                            required: true,
                        })}
                    />
                </label>
                <label className={styles.inputBox}>
                    <input
                        className={`${styles.inputField} ${
                            errors.entrance &&
                            styles.errorInput
                        }`}
                        type="text"
                        placeholder="Подъезд"
                        {...register('entrance', {
                            required: true,
                        })}
                    />
                </label>
                <label className={styles.inputBox}>
                    <input
                        className={`${styles.inputField} ${
                            errors.apartment &&
                            styles.errorInput
                        }`}
                        type="text"
                        placeholder="Квартира"
                        {...register('apartment', {
                            required: true,
                        })}
                    />
                </label>
            </div>
            <label className={styles.inputBox}>
                <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Индекс"
                    {...register('postcode', {
                        required: errorMessage,
                    })}
                />
                {errors.postcode && (
                    <span className={styles.error}>
                        {errors.postcode.message}
                    </span>
                )}
            </label>
        </div>
    );
};
