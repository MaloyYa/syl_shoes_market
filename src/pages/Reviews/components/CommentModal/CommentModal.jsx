import styles from './CommentModal.module.css';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFocus } from '../../../../hooks/useFocus';
import { useBlockScrollWindow } from '../../../../hooks/useBlockScrollWindow';
import { useForm } from 'react-hook-form';
import { StarRating } from '../../../../components/ui/StarRating/StarRating';
import { useAuthStore } from '../../../../modules/auth/useAuthStore';
import { reviewService } from '../../../../service/reviewService';
import { Notification } from '../../../../components/ui/Notification/Notification';

export const CommentModal = (props) => {
    const { isOpen, onClose } = props;
    const portal = document.getElementById('portal');
    const user = useAuthStore((state) => state.user);

    const modalRef = useRef(null);

    const [isFailed, setIsFailed] = useState(false);
    const [textNotification, setTextNotification] =
        useState('');
    const [isVisibleNotification, setVisibleNotification] =
        useState(false);

    const createNotification = (
        isFailed,
        textNotification,
    ) => {
        setIsFailed(isFailed);
        setTextNotification(textNotification);
        setVisibleNotification(true);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
        clearErrors,
    } = useForm({
        defaultValues: {
            name: user?.name || '',
            surname: user?.surname || '',
            comment_text: '',
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
    const onSubmit = async (data) => {
        if (rating === 0) {
            setError('rating', {
                type: 'required',
                message: 'Пожалуйста, выберите рейтинг',
            });
            return;
        }

        clearErrors('rating');
        try {
            const review = {
                rating: rating,
                comment_text: data.comment_text,
                created_at: new Date().toISOString(),
            };
            const { success, message } =
                await reviewService.createReview(review);

            createNotification(!success, message);
        } catch (error) {
            createNotification(true, error.message);
        }

        reset();
        setRating(0);
        setTimeout(onClose, 5000);
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
                            {...register('surname')}
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
                            {...register('comment_text', {
                                required:
                                    'Поле обязательно к заполнению',
                                minLength: {
                                    value: 40,
                                    message:
                                        'Комментарий должен содержать не менее 40 символов',
                                },
                            })}
                        />
                        {errors.comment_text && (
                            <span className={styles.error}>
                                {
                                    errors.comment_text
                                        .message
                                }
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
            <Notification
                isOpen={isVisibleNotification}
                duration={4000}
                isFailed={isFailed}
                text={textNotification}
                onClose={() => {
                    setVisibleNotification(false);
                }}
            />
        </div>,
        portal,
    );
};
