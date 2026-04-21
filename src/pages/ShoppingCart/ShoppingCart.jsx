import { ShoppingCartItem } from './ShoppingCartItem/ShoppingCartItem';
import { useShoppingCartStore } from './store/useShoppingCartStore';
import styles from './ShoppingCart.module.css';
import { OrderForm } from './OrderForm/OrderForm';
import { useEffect, useState } from 'react';
import { shoppingCartService } from '../../service/shoppingCartService';

export const ShoppingCart = () => {
    const [isLoading, setLoading] = useState(false);

    const initialCartData = useShoppingCartStore(
        (state) => state.shoppingCartData,
    );

    const [shoppingCartData, setShoppingCartData] =
        useState(initialCartData);

    const handleDeleteShoppingItem = (id) => {
        setTimeout(() => {
            setShoppingCartData((prev) => {
                return {
                    ...prev,
                    items: prev.items.filter(
                        (item) => item.id !== id,
                    ),
                };
            });
        }, 2000);
        useShoppingCartStore.getState().deleteProduct(id);
    };
    useEffect(() => {
        const fetchShoppingCart = async () => {
            setLoading(true);
            const data =
                await shoppingCartService.getShoppingCart();
            useShoppingCartStore
                .getState()
                .setShoppingCartData(data);

            setShoppingCartData(data);
            setLoading(false);
        };
        fetchShoppingCart();
    }, []);

    if (!shoppingCartData?.items.length) {
        return (
            <main className={styles.main}>
                <p>Корзина пуста</p>
            </main>
        );
    }
    return (
        <main className={styles.main}>
            {isLoading ? (
                <p>Загружаем данные корзины</p>
            ) : (
                <>
                    <ul
                        className={
                            styles.listShoppingProducts
                        }>
                        {shoppingCartData?.items.map(
                            (product) => (
                                <li
                                    className={
                                        styles.shopItem
                                    }
                                    key={`${product.id}-${product.size}`}>
                                    <ShoppingCartItem
                                        product={product}
                                        handleDelete={
                                            handleDeleteShoppingItem
                                        }
                                    />
                                </li>
                            ),
                        )}
                    </ul>
                    <p
                        className={
                            styles.totalPriceShoppingCart
                        }>
                        Сумма к оплате:
                        <span
                            className={
                                styles.totalPriceValue
                            }>
                            {
                                useShoppingCartStore.getState()
                                    .shoppingCartData
                                    .total_amount
                            }
                            ₽
                        </span>
                    </p>

                    <OrderForm />
                </>
            )}
        </main>
    );
};
