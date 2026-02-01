import styles from './ProductCard.module.css';
const ProductCard = (props) => {
    const { title, article, image, price } = props;
    // const [color, setColor] = useState();

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
                        className={styles.add_favorite_btn}>
                        <svg
                            viewBox="0 0 30 30"
                            width="30"
                            height="30">
                            className={styles.favorite_icon}
                            <path
                                fill="currentColor"
                                d="M16,28.261c-0.757,0-1.514-0.289-2.092-0.867C6.09,20.254,2,16.155,2,11.536C2,7.391,5.391,4,9.536,4 c2.324,0,4.407,1.071,5.815,2.738C16.759,5.071,18.842,4,21.166,4C25.311,4,28.702,7.391,28.702,11.536 c0,4.619-4.09,8.718-11.908,15.858C16.215,27.972,15.458,28.261,16,28.261z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
