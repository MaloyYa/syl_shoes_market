import { memo, useState } from 'react';

import { Notification } from '../../../components/ui/Notification/Notification';
import styles from './ShoppingCartItem.module.css';
import { shoppingCartService } from '../../../service/shoppingCartService';
import { useShoppingCartStore } from '../store/useShoppingCartStore';
export const ShoppingCartItem = memo(
    ({ product, handleDelete }) => {
        const {
            logo: image,
            title: name,
            article,
            size,
            price,
            quantity: initialQuantity,
            id,
        } = product;

        const [quantity, setQuantity] =
            useState(initialQuantity);

        const increaseProduct = useShoppingCartStore(
            (state) => state.increaseProduct,
        );

        const decreaseProduct = useShoppingCartStore(
            (state) => state.decreaseProduct,
        );

        const handleIncreaseProduct = async (
            id,
            quantity,
        ) => {
            try {
                const { isSuccess, count: newQuantity } =
                    await shoppingCartService.changeQuantityItem(
                        id,
                        Number(quantity + 1),
                    );

                newQuantity && setQuantity(newQuantity);
                isSuccess && increaseProduct(id);
            } catch (error) {
                console.log(error.message);
            }
        };

        const handleDeacreseProduct = async (
            item_id,
            quantity,
        ) => {
            try {
                const { isSuccess, count: newQuantity } =
                    await shoppingCartService.changeQuantityItem(
                        item_id,
                        Number(quantity - 1),
                    );

                newQuantity && setQuantity(newQuantity);
                isSuccess && decreaseProduct(item_id);
            } catch (error) {
                console.log(error.message);
            }
        };

        const [isFailed, setIsFailed] = useState(false);

        const [isOpenNotificatoion, setOpenNotification] =
            useState(false);
        const [textNotification, setTextNotification] =
            useState('');
        const createNotification = (success, message) => {
            setTextNotification(message);
            setIsFailed(success);
            setOpenNotification(true);
        };

        const handleClickDeleteButton = async (id) => {
            try {
                const { isSuccess, message } =
                    await shoppingCartService.deleteFromCart(
                        id,
                    );
                isSuccess && handleDelete(id);
                createNotification(isSuccess, message);
            } catch (error) {
                createNotification(false, error.message);
            }
        };

        return (
            <>
                <div className={styles.shoppingCartItem}>
                    <img
                        className={styles.shoppingItemImg}
                        src={image}
                        alt={name}
                    />
                    <div
                        className={styles.shoppingItemInfo}>
                        <h4 className={styles.titleProduct}>
                            {name}
                        </h4>
                        <p
                            className={
                                styles.articleProduct
                            }>
                            Артикул: {article}
                        </p>
                        <p className={styles.sizeProduct}>
                            Размер:
                            <span
                                className={
                                    styles.sizeValue
                                }>
                                {size} EUR
                            </span>
                        </p>
                        <p className={styles.priceProduct}>
                            {price}₽
                        </p>
                        <div
                            className={
                                styles.redactQuantityBlock
                            }>
                            <button
                                onClick={() =>
                                    handleDeacreseProduct(
                                        id,
                                        quantity,
                                    )
                                }
                                disabled={quantity === 1}
                                className={
                                    styles.btnDecrease
                                }>
                                –
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                id="quantity"
                                className={
                                    styles.inputQuantity
                                }
                            />
                            <button
                                onClick={() =>
                                    handleIncreaseProduct(
                                        id,
                                        quantity,
                                    )
                                }
                                className={
                                    styles.btnIncrease
                                }>
                                +
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() =>
                            handleClickDeleteButton(id)
                        }
                        className={
                            styles.deleteProductFromCart
                        }>
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
            </>
        );
    },
);
