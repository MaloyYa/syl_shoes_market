import { StarIcon } from '../../../../components/ui/StarIcon';
import styles from './ReviewItem.module.css';
export const ReviewItem = ({ comment, fill }) => {
    const {
        name,
        surname,
        comment_text,
        rating,
        created_at: isoDate,
    } = comment;
    const stars = Array(rating).fill(0);
    const year = new Date(isoDate).getFullYear();
    const month = (new Date(isoDate).getMonth() + 1)
        .toString()
        .padStart(2, '0');
    const day = new Date(isoDate)
        .getDate()
        .toString()
        .padStart(2, '0');

    return (
        <div className={styles.commentBlock}>
            <h3 className={styles.authorComment}>
                {name} {surname}
            </h3>
            <p className={styles.textComment}>
                {comment_text}
            </p>
            <div className={styles.footerComment}>
                <ul className={styles.ratingBlock}>
                    {stars.map((_, index) => (
                        <li key={index}>
                            <StarIcon
                                height={20}
                                width={20}
                                fill={fill}
                            />
                        </li>
                    ))}
                </ul>
                <p className={styles.dateCreateComment}>
                    {`${year}-${month}-${day}`}
                </p>
            </div>
        </div>
    );
};
