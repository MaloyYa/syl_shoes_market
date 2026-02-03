import styles from './ProductCard.module.css';
const ProductCard = (props) => {
    const { title, article, image, price } = props;

    return (
        <div
            className={styles.product_card}
            div>
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
                        className={
                            styles.add_favorite_btn
                        }></button>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
