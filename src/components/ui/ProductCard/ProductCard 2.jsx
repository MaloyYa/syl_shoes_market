import { memo, useEffect } from 'react';
import { SvgFavoriteIcon } from '../FavoriteIcon';
import styles from './ProductCard.module.css';
import { useState } from 'react';
import { ModalProduct } from '../ModalProduct/ModalProduct';
import { useAuthStore } from '../../../modules/auth/useAuthStore';
import { useFavoriteStore } from '../../../pages/FavoriteProducts/store/useFavoriteStore';
import { useAuthFormStore } from '../../../modules/auth/AuthForm/useAuthFormStore';
import { BASE_URL } from '../../../api/api';
const ProductCard = ({ product = {} }) => {
    const { id, title, article, logo, price, avg_grade } =
        product;
    const [isOpenModal, setOpenModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const isAuth = useAuthStore((state) => state.isAuth);

    const toggleFavorite = useFavoriteStore(
        (state) => state.toggleFavorite,
    );

    const isFavoriteLocal = useFavoriteStore((state) =>
        state.isFavorite(id),
    );

    const setVisibilityAuthForm = useAuthFormStore(
        (state) => state.setVisibilityAuthForm,
    );

    const onClickFavorite = (e, id, isAuth) => {
        e.stopPropagation();
        isAuth
            ? toggleFavorite(product)
            : setVisibilityAuthForm(true);
    };

    return (
        <>
            <div
                className={styles.product_card}
                onClick={() => setOpenModal(true)}>
                {isLoading ? (
                    <div
                        className={styles.product_image}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {title}
                    </div>
                ) : (
                    <img
                        src={logo}
                        alt={title}
                        className={styles.product_image}
                    />
                )}
                <div className={styles.product_body}>
                    <h4 className={styles.product_title}>
                        {title}
                    </h4>
                    <div className={styles.product_article}>
                        Артикул {article}
                    </div>
                    <div className={styles.product_article}>
                        <span className={styles.star}>
                            &#9733;
                        </span>
                        {avg_grade}
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
                                onClickFavorite(
                                    e,
                                    id,
                                    isAuth,
                                );
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
                                    isFavoriteLocal
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
