import styles from './Reviews.module.css';

import { useAuthStore } from '../../modules/auth/useAuthStore';
import { CommentModal } from './components/CommentModal/CommentModal';
import { useAuthFormStore } from '../../modules/auth/AuthForm/useAuthFormStore';

import { useEffect, useMemo, useState } from 'react';
import { ReviewBody } from './components/ReviewBody/ReviewBody';
import { DropdownSort } from './components/DropdownSort/DropdownSort';
import { reviewService } from '../../service/reviewService';

export const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isOpenModal, setOpenModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState('');

    const isAuth = useAuthStore((state) => state.isAuth);

    const setVisibilityAuthForm = useAuthFormStore(
        (state) => state.setVisibilityAuthForm,
    );

    const [sortBy, setSortBy] = useState('default');

    const sortedReviews = useMemo(() => {
        const sorted = [...reviews];

        switch (sortBy) {
            case 'oldest':
                return sorted.sort(
                    (a, b) =>
                        new Date(a.created_at) -
                        new Date(b.created_at),
                );
            case 'newest':
                return sorted.sort(
                    (a, b) =>
                        new Date(b.created_at) -
                        new Date(a.created_at),
                );
            case 'rating':
                return sorted.sort(
                    (a, b) => b.rating - a.rating,
                );

            default:
                return sorted;
        }
    }, [reviews, sortBy]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const reviews =
                    await reviewService.getReviews();
                setReviews(reviews);
                setLoading(false);
            } catch {
                setError(
                    'Произошла ошибка при выполнении запроса',
                );
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const handleClick = () => {
        if (isAuth) {
            setOpenModal(true);
        } else {
            setVisibilityAuthForm(true);
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.headReviews}>
                <h2 className={styles.titleSection}>
                    Отзывы наших клиентов
                </h2>

                <DropdownSort
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                />

                <button
                    className={styles.btnAddComment}
                    onClick={handleClick}>
                    Оставить отзыв
                </button>
            </div>
            <ReviewBody
                reviews={sortedReviews}
                isLoading={isLoading}
                isError={isError}
            />
            <CommentModal
                isOpen={isOpenModal}
                onClose={() => setOpenModal(false)}
            />
        </main>
    );
};
