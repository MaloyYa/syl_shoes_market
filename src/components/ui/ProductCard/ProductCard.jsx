import { memo } from 'react';
import { SvgFavoriteIcon } from '../FavoriteIcon';
import styles from './ProductCard.module.css';
import { useState } from 'react';
import { ModalProduct } from '../ModalProduct/ModalProduct';
const ProductCard = ({
    product = {},
    onToggleFavorite,
}) => {
    const { id, name, article, image, price, isFavorite } =
        product;
    const [isOpenModal, setOpenModal] = useState(false);

    return (
        <>
            <div
                className={styles.product_card}
                onClick={() => setOpenModal(true)}>
                <img
                    src={image}
                    alt=""
                    className={styles.product_image}
                />
                <div className={styles.product_body}>
                    <h4 className={styles.product_title}>
                        {name}
                    </h4>
                    <div className={styles.product_article}>
                        Артикул {article}
                    </div>
                    <div className={styles.product_bottom}>
                        <div
                            className={
                                styles.product_price
                            }>
                            {price} &#8381;
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(id);
                            }}
                            className={
                                styles.add_favorite_btn
                            }
                            style={{
                                backgroundColor:
                                    'transparent',
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
            <ModalProduct
                product={product}
                open={isOpenModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
};
export default memo(ProductCard);
