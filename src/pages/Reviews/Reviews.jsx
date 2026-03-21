import styles from './Reviews.module.css';

import { useAuthStore } from '../../modules/auth/useAuthStore';
import { CommentModal } from './components/CommentModal/CommentModal';
import { useAuthFormStore } from '../../modules/auth/AuthForm/useAuthFormStore';
import { mockComments } from '../../mock/mockComments';

import { useMemo, useState } from 'react';
import { ReviewBody } from './components/ReviewBody/ReviewBody';
import { DropdownSort } from './components/DropdownSort/DropdownSort';

export const Reviews = () => {
    const reviews = mockComments;

    const [isOpenModal, setOpenModal] = useState(false);

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
                        new Date(a.date) - new Date(b.date),
                );
            case 'newest':
                return sorted.sort(
                    (a, b) =>
                        new Date(b.date) - new Date(a.date),
                );
            case 'rating':
                return sorted.sort(
                    (a, b) => b.rating - a.rating,
                );

            default:
                return sorted;
        }
    }, [reviews, sortBy]);

    //TODO сделать запрос на получение комментов

    const handleClick = () => {
        if (isAuth) {
            setOpenModal(true);
        } else {
            setVisibilityAuthForm(true);
        }
    };

    if (!reviews.length) {
        return null;
    }
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
            <ReviewBody reviews={sortedReviews} />
            <CommentModal
                isOpen={isOpenModal}
                onClose={() => setOpenModal(false)}
            />
        </main>
    );
};
