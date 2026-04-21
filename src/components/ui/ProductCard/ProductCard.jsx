import { memo, useEffect, useState } from 'react';
import { SvgFavoriteIcon } from '../FavoriteIcon';
import styles from './ProductCard.module.css';

import { Notification } from '../../ui/Notification/Notification';
import { ModalProduct } from '../ModalProduct/ModalProduct';

import { useAuthStore } from '../../../modules/auth/useAuthStore';

import { useAuthFormStore } from '../../../modules/auth/AuthForm/useAuthFormStore';

import { favoriteService } from '../../../service/favoriteService';
const ProductCard = ({
    product = {},
    forFavorite = false,
    handleDelete,
}) => {
    const { id, title, article, logo, price, avg_grade } =
        product;
    const [isOpenModal, setOpenModal] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const [isFailed, setIsFailed] = useState(false);

    const [isOpenNotificatoion, setOpenNotification] =
        useState(false);
    const [textNotification, setTextNotification] =
        useState('');

    const isAuth = useAuthStore((state) => state.isAuth);
    const clearStateNotification = () => {
        setIsFailed(null);
        setTextNotification('');
    };

    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        if (!isAuth) {
            return;
        }
        const checkIsFavorite = async () => {
            const bool =
                await favoriteService.checkIsFavorite(id);
            setIsFavorite(bool);
        };
        const timer = setTimeout(() => {
            setIsDisabled(false);
        }, 2000);
        checkIsFavorite();
        return () => {
            clearTimeout(timer);
        };
    }, [isAuth, id]);
    const toggleFavorite = async (
        isFavorite,
        productId,
    ) => {
        if (isFavorite) {
            try {
                clearStateNotification();
                const { success, message } =
                    await favoriteService.deleteFromFavorite(
                        productId,
                    );
                success && setIsFavorite(false);
                createNotification(!success, message);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                clearStateNotification();
                const { success, message } =
                    await favoriteService.addToFavorite(
                        productId,
                    );
                success && setIsFavorite(true);
                createNotification(!success, message);
            } catch (error) {
                createNotification(false, error.message);
            }
        }
    };

    const setVisibilityAuthForm = useAuthFormStore(
        (state) => state.setVisibilityAuthForm,
    );

    const createNotification = (success, message) => {
        setTextNotification(message);
        setIsFailed(!success);
        setOpenNotification(true);
    };

    const handleToggleFavorite = async (id, isAuth) => {
        if (!isAuth) setVisibilityAuthForm(true);
        else {
            if (forFavorite) {
                await toggleFavorite(isFavorite, id);
                handleDelete(id);
            } else {
                toggleFavorite(isFavorite, id);
            }
        }
    };

    return (
        <>
            <div
                className={styles.product_card}
                onClick={() => setOpenModal(true)}>
                <img
                    src={logo}
                    alt={title}
                    className={styles.product_image}
                />

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
                            disabled={isDisabled}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleToggleFavorite(
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
            <Notification
                isOpen={isOpenNotificatoion}
                duration={1750}
                text={textNotification}
                isFailed={!isFailed}
                onClose={() => {
                    setOpenNotification(false);
                }}
                textNotification={textNotification}
            />
        </>
    );
};
export default memo(ProductCard);
