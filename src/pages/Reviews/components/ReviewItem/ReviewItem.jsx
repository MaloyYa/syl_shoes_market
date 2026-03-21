import { StarIcon } from '../../../../components/ui/StarIcon';
import styles from './ReviewItem.module.css';
export const ReviewItem = ({ comment, fill }) => {
    const { name, text, rating, date } = comment;
    const stars = Array(rating).fill(0);

    return (
        <div className={styles.commentBlock}>
            <h3 className={styles.authorComment}>{name}</h3>
            <p className={styles.textComment}>{text}</p>
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
                    {date}
                </p>
            </div>
        </div>
    );
};
