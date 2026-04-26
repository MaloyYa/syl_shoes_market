import { createPortal } from 'react-dom';
import styles from './ModalProduct.module.css';
import { useRef, useState } from 'react';
import { useFocus } from '../../../hooks/useFocus';
import { RadioItem } from './RadioItem/RadioItem';
import { useAuthStore } from '../../../modules/auth/useAuthStore';
import { useBlockScrollWindow } from '../../../hooks/useBlockScrollWindow';
import { useAuthFormStore } from '../../../modules/auth/AuthForm/useAuthFormStore';

import { shoppingCartService } from '../../../service/shoppingCartService';
import { Notification } from '../Notification/Notification';
import { useShoppingCartStore } from '../../../pages/ShoppingCart/store/useShoppingCartStore';

export const ModalProduct = (props) => {
    const { product, open, onClose } = props;

    const {
        logo,
        title,
        avg_grade,
        price,
        color,
        article,

        available_sizes = [],
    } = product;

    const isAuth = useAuthStore((state) => state.isAuth);

    const [isFailed, setIsFailed] = useState(false);

    const [isOpenNotificatoion, setOpenNotification] =
        useState(false);
    const [textNotification, setTextNotification] =
        useState('');

    const setVisibilityAuthForm = useAuthFormStore(
        (state) => state.setVisibilityAuthForm,
    );

    const portal = document.getElementById('portal');

    const modalRef = useRef(null);

    useFocus(open, modalRef, onClose);

    const [selectSize, setSelectSize] = useState({});

    useBlockScrollWindow(open);

    const createNotification = (success, message) => {
        setTextNotification(message);
        setIsFailed(success);
        setOpenNotification(true);
    };

    if (!portal) {
        return null;
    }

    if (!open) {
        return null;
    }
    const onSubmit = async () => {
        if (!selectSize) return;

        try {
            const { isSuccess, message } =
                await shoppingCartService.addToCart(
                    selectSize.id,
                );

            createNotification(isSuccess, message);
            isSuccess &&
                useShoppingCartStore
                    .getState()
                    .addToCart(product);
        } catch (error) {
            createNotification(false, error.message);
        }

        setTimeout(() => {
            onClose();
            setSelectSize({});
        }, 1800);
    };

    return createPortal(
        <div className={styles.overlay}>
            <div
                className={styles.modal}
                ref={modalRef}>
                <img
                    src={logo}
                    className={styles.image}
                    alt={title}
                />
                <div className={styles.modalContent}>
                    <div className={styles.modalHead}>
                        <h4 className={styles.nameProduct}>
                            {title}
                        </h4>
                    </div>
                    <form
                        className={styles.modalMain}
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (isAuth) {
                                onSubmit();
                            } else {
                                setVisibilityAuthForm(true);
                                setSelectSize({});
                                onClose();
                            }
                        }}>
                        <p className={styles.avg_grade}>
                            <span className={styles.star}>
                                &#9733;
                            </span>
                            {avg_grade}
                        </p>

                        <p className={styles.article}>
                            Артикул: {article}
                        </p>
                        <p className={styles.price}>
                            {price}₽
                        </p>
                        <p className={styles.color}>
                            Цвет: {color}
                        </p>

                        <div className={styles.sizeGrid}>
                            {available_sizes.map(
                                ({ size, id }) => (
                                    <RadioItem
                                        selectSize={
                                            selectSize.size
                                        }
                                        size={size}
                                        onChange={() => {
                                            setSelectSize({
                                                size,
                                                id,
                                            });
                                        }}
                                    />
                                ),
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={!selectSize?.size}
                            className={styles.btnAddCart}>
                            Добавить в корзину
                        </button>
                    </form>
                </div>
                <button
                    type="button"
                    className={styles.btnClose}
                    onClick={() => {
                        setSelectSize({});
                        onClose();
                    }}>
                    ×
                </button>
            </div>
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
        </div>,
        portal,
    );
};
