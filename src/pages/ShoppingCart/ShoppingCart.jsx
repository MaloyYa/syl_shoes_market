import { ShoppingCartItem } from './ShoppingCartItem/ShoppingCartItem';
import { useShoppingCartStore } from './store/useShoppingCartStore';
import styles from './ShoppingCart.module.css';

export const ShoppingCart = () => {
    const shoppingProducts = useShoppingCartStore(
        (state) => state.shoppingCart,
    );
    const totalPriceShoppingCart = shoppingProducts.reduce(
        (total, product) =>
            total + product.price * product.quantity,
        0,
    );
    if (!shoppingProducts.length) {
        return (
            <main className={styles.main}>
                <p>Корзина пуста</p>
            </main>
        );
    }
    return (
        <main className={styles.main}>
            <ul className={styles.listShoppingProducts}>
                {shoppingProducts.map((product) => (
                    <li
                        className={styles.shopItem}
                        key={`${product.id}-${product.size}`}>
                        <ShoppingCartItem
                            product={product}
                        />
                    </li>
                ))}
            </ul>
            <p className={styles.totalPriceShoppingCart}>
                Сумма к оплате:
                <span className={styles.totalPriceValue}>
                    {totalPriceShoppingCart} ₽
                </span>
            </p>
        </main>
    );
};
