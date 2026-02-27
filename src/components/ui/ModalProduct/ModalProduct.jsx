import { createPortal } from 'react-dom';
import styles from './ModalProduct.module.css';
export const ModalProduct = (props) => {
    const { product } = props;
    const {
        image,
        name,
        rating,
        price,
        color,
        article,
        availableSizes = [],
        onClose,
    } = product;
    return createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal}>
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
                        <button
                            type="button"
                            className={styles.btnClose}
                            onClick={onClose}>
                            ×
                        </button>
                    </div>
                    <div className={styles.modalMain}>
                        <p className={styles.rating}>
                            {rating}
                        </p>
                        <p className={styles.price}>
                            {price}
                        </p>
                        <p className={styles.color}>
                            Цвет:{' '}
                            <span
                                className={
                                    styles.colorValue
                                }>
                                {color}
                            </span>
                        </p>
                        <ul className={styles.sizeGrid}>
                            {availableSizes.map((size) =>(
								
							))}
                        </ul>
                        <button
                            type="button"
                            onClick={console.log('first')}>
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
};
