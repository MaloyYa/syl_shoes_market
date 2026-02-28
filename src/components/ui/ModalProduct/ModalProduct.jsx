import { createPortal } from 'react-dom';
import styles from './ModalProduct.module.css';
import { useEffect, useRef, useState } from 'react';
import { useFocus } from '../../../hooks/useFocus';
import { RadioItem } from './RadioItem/RadioItem';
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
    const portal = document.getElementById('portal');
    const modalRef = useRef(null);
    useFocus(open, modalRef, onClose);
    const [selectSize, setSelectSize] = useState(null);
    useEffect(() => {
        if (!open) return;

        const originalOverflow =
            document.body.style.overflow;

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);
    if (!portal) {
        return null;
    }
    if (!open) {
        return null;
    }
    const onSubmit = () => {
        console.log(product, selectSize);
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
                            onSubmit();
                        }}>
                        <p className={styles.rating}>
                            {rating}{' '}
                            <span className={styles.star}>
                                &#9733;
                            </span>
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
