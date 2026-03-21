import styles from './ReviewBody.module.css';
import { ReviewItem } from '../ReviewItem/ReviewItem';
export const ReviewBody = ({ reviews = [] }) => {
    if (!reviews.length) {
        return (
            <div className={styles.gridReviews}>
                <p className={styles.nullReviewMessage}>
                    Отзывы не найдены
                </p>
            </div>
        );
    }
    return (
        <div className={styles.gridReviews}>
            {reviews.map((item) => {
                return (
                    <ReviewItem
                        key={item.id}
                        comment={item}
                        fill={'gold'}
                    />
                );
            })}
        </div>
    );
};
