import { createPortal } from 'react-dom';
import styles from './ModalProduct.module.css';
import { useRef, useState } from 'react';
import { useFocus } from '../../../hooks/useFocus';
import { RadioItem } from './RadioItem/RadioItem';
import { useAuthStore } from '../../../modules/auth/useAuthStore';
import { useBlockScrollWindow } from '../../../hooks/useBlockScrollWindow';
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
    const setVisibilityAuthForm = useAuthStore(
        (state) => state.setVisibilityForm,
    );

    const portal = document.getElementById('portal');

    const modalRef = useRef(null);

    useFocus(open, modalRef, onClose);

    const [selectSize, setSelectSize] = useState(null);
    const [productData, setProductData] = useState({
        image: image,
        name: name,
        rating: rating,
        price: price,
        color: color,
        article: article,
        selectSize: selectSize,
    });

    useBlockScrollWindow(open);

    if (!portal) {
        return null;
    }

    if (!open) {
        return null;
    }
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
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
                                onSubmit(productData);
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
                                        setProductData(
                                            (prev) => ({
                                                ...prev,
                                                selectSize:
                                                    size,
                                            }),
                                        );
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={!selectSize}
                            className={styles.btnAddCart}>
                            Добавить в корзину
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
