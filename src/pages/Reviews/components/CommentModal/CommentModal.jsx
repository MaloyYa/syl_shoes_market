import styles from './CommentModal.module.css';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFocus } from '../../../../hooks/useFocus';
import { useBlockScrollWindow } from '../../../../hooks/useBlockScrollWindow';
import { useForm } from 'react-hook-form';
import { StarRating } from '../../../../components/ui/StarRating/StarRating';

export const CommentModal = (props) => {
    const { isOpen, onClose } = props;
    const portal = document.getElementById('portal');

    const modalRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
        clearErrors,
    } = useForm({
        //TODO заменить наполнение данных из стора юзера
        defaultValues: {
            id: 1,
            name: 'Ivan',
            surname: 'Yakovlev',
            comment: '',
            rating: 0,
        },
    });

    const [rating, setRating] = useState(0);

    useFocus(isOpen, modalRef, onClose);

    useBlockScrollWindow(isOpen);

    if (!portal) {
        return null;
    }

    if (!isOpen) {
        return null;
    }
    //TODO переделать в запрос
    const onSubmit = (data) => {
        if (rating === 0) {
            setError('rating', {
                type: 'required',
                message: 'Пожалуйста, выберите рейтинг',
            });
            return;
        }

        clearErrors('rating');

        data.date = new Date();
        data.rating = rating;
        alert(JSON.stringify(data));
        reset();
        setRating(0);
        onClose();
    };

    return createPortal(
        <div className={styles.overlay}>
            <div
                className={styles.modal}
                ref={modalRef}>
                <button
                    onClick={onClose}
                    className={styles.btnClose}>
                    ×
                </button>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.formComment}>
                    <label className={styles.inputBox}>
                        <span className={styles.titleField}>
                            Имя
                        </span>
                        <input
                            className={styles.inputField}
                            type="text"
                            readOnly
                            {...register('name', {
                                required:
                                    'Поле обязательно к заполнению',
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
                            readOnly
                            {...register('surname', {
                                required:
                                    'Поле обязательно к заполнению',
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
                            Комментарий
                        </span>
                        <textarea
                            placeholder="Ваш комментарий"
                            className={styles.inputField}
                            {...register('comment', {
                                required:
                                    'Поле обязательно к заполнению',
                                minLength: {
                                    value: 40,
                                    message:
                                        'Комментарий должен содержать не менее 40 символов',
                                },
                            })}
                        />
                        {errors.comment && (
                            <span className={styles.error}>
                                {errors.comment.message}
                            </span>
                        )}
                    </label>
                    <StarRating handleRating={setRating} />
                    {errors.rating && (
                        <span className={styles.error}>
                            {errors.rating.message}
                        </span>
                    )}
                    <button className={styles.btnSubmit}>
                        Оставить отзыв
                    </button>
                </form>
            </div>
        </div>,
        portal,
    );
};
