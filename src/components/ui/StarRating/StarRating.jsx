import { useEffect, useState } from 'react';
import { StarIcon } from '../StarIcon';
import styles from './StarRating.module.css';
export const StarRating = ({ handleRating }) => {
    const stars = Array(5).fill(0);

    const [size, setSize] = useState(
        window.innerWidth < 768 ? 20 : 30,
    );
    const [currentItem, setItem] = useState(-1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSize(20);
            } else {
                setSize(30);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener(
                'resize',
                handleResize,
            );
        };
    }, []);

    return (
        <ul className={styles.blockStars}>
            {stars.map((_, index) => {
                return (
                    <li
                        key={index}
                        onClick={() => {
                            setItem(index);
                            handleRating(index + 1);
                        }}>
                        <StarIcon
                            height={size}
                            width={size}
                            fill={
                                index <= currentItem
                                    ? 'gold'
                                    : ''
                            }
                        />
                    </li>
                );
            })}
        </ul>
    );
};
