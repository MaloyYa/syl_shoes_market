import { SvgFavoriteIcon } from '../FavoriteIcon';
import styles from './ProductCard.module.css';
const ProductCard = ({
    title,
    article,
    image,
    price,
    isFavorite,
    onToggle,
}) => {
    return (
        <div className={styles.product_card}>
            <img
                src={image}
                alt=""
                className={styles.product_image}
            />
            <div className={styles.product_body}>
                <h4 className={styles.product_title}>
                    {title}
                </h4>
                <h5 className={styles.product_article}>
                    Артикул {article}
                </h5>
                <div className={styles.product_bottom}>
                    <h3 className={styles.product_price}>
                        {price} &#8381;
                    </h3>
                    <button
                        onClick={onToggle}
                        className={styles.add_favorite_btn}
                        style={{
                            backgroundColor: 'transparent',
                        }}>
                        <SvgFavoriteIcon
                            fill={
                                isFavorite
                                    ? '#47CB74'
                                    : '#B3C0D2'
                            }
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
