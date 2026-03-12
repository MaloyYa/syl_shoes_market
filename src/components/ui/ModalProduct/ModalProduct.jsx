import { createPortal } from 'react-dom';
import styles from './ModalProduct.module.css';
import { useRef, useState } from 'react';
import { useFocus } from '../../../hooks/useFocus';
import { RadioItem } from './RadioItem/RadioItem';
import { useAuthStore } from '../../../modules/auth/useAuthStore';
import { useBlockScrollWindow } from '../../../hooks/useBlockScrollWindow';
import { useAuthFormStore } from '../../../modules/auth/AuthForm/useAuthFormStore';
import { useShoppingCartStore } from '../../../pages/ShoppingCart/store/useShoppingCartStore';

export const ModalProduct = (props) => {
    const { product, open, onClose } = props;

    const {
        image,
        name,
        rating,
        price,
        color,
        article,
        availableSizes = [],
    } = product;

    const isAuth = useAuthStore((state) => state.isAuth);

    const setVisibilityAuthForm = useAuthFormStore(
        (state) => state.setVisibilityAuthForm,
    );

    const addToCart = useShoppingCartStore(
        (state) => state.addToCart,
    );

    const portal = document.getElementById('portal');

    const modalRef = useRef(null);

    useFocus(open, modalRef, onClose);

    const [selectSize, setSelectSize] = useState(null);

    useBlockScrollWindow(open);

    if (!portal) {
        return null;
    }

    if (!open) {
        return null;
    }
    const onSubmit = () => {
        if (!selectSize) return;
        addToCart({
            ...product,
            size: selectSize,
        });
    };

    return createPortal(
        <div className={styles.overlay}>
            <div
                className={styles.modal}
                ref={modalRef}>
                <img
                    src={image}
                    className={styles.image}
                    alt={name}
                />
                <div className={styles.modalContent}>
                    <div className={styles.modalHead}>
                        <h4 className={styles.nameProduct}>
                            {name}
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
                                onClose();
                            }
                        }}>
                        <p className={styles.rating}>
                            <span className={styles.star}>
                                &#9733;
                            </span>
                            {rating}
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
                            {availableSizes.map((size) => (
                                <RadioItem
                                    selectSize={selectSize}
                                    size={size}
                                    onChange={() => {
                                        setSelectSize(size);
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={!selectSize}
                            className={styles.btnAddCart}>
                            'Добавить в корзину'
                        </button>
                    </form>
                </div>
                <button
                    type="button"
                    className={styles.btnClose}
                    onClick={onClose}>
                    ×
                </button>
            </div>
        </div>,
        portal,
    );
};
