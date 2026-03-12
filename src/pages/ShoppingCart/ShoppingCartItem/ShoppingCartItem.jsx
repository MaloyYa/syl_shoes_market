import { memo } from 'react';
import { useShoppingCartStore } from '../store/useShoppingCartStore';
import styles from './ShoppingCartItem.module.css';
export const ShoppingCartItem = memo(({ product }) => {
    const { image, name, article, size, price, quantity } =
        product;
    const increaseCurrentProduct = useShoppingCartStore(
        (state) => state.addToCart,
    );
    const decreaseCurrentProduct = useShoppingCartStore(
        (state) => state.decreaseQuantity,
    );
    const deleteCurrentProduct = useShoppingCartStore(
        (state) => state.removeFromShoppingCart,
    );

    const handleIncreaseProduct = async (product) => {
        //TODO добавить запрос
        // await fetch();
        increaseCurrentProduct(product);
    };
    const handleDeacreseProduct = async (product) => {
        //TODO добавить запрос
        // await fetch();
        decreaseCurrentProduct(product);
    };
    const handleDeleteButton = async (product) => {
        // await fetch()
        deleteCurrentProduct(product);
    };
    return (
        <div className={styles.shoppingCartItem}>
            <img
                className={styles.shoppingItemImg}
                src={image}
                alt={name}
            />
            <div className={styles.shoppingItemInfo}>
                <h4 className={styles.titleProduct}>
                    {name}
                </h4>
                <p className={styles.articleProduct}>
                    Артикул: {article}
                </p>
                <p className={styles.sizeProduct}>
                    Размер:
                    <span className={styles.sizeValue}>
                        {size} EUR
                    </span>
                </p>
                <p className={styles.priceProduct}>
                    {price}₽
                </p>
                <div className={styles.redactQuantityBlock}>
                    <button
                        onClick={() =>
                            handleDeacreseProduct(product)
                        }
                        disabled={quantity === 1}
                        className={styles.btnDecrease}>
                        –
                    </button>
                    <input
                        type="text"
                        value={quantity}
                        readOnly
                        id="quantity"
                        className={styles.inputQuantity}
                    />
                    <button
                        onClick={() =>
                            handleIncreaseProduct(product)
                        }
                        className={styles.btnIncrease}>
                        +
                    </button>
                </div>
            </div>
            <button
                onClick={() => handleDeleteButton(product)}
                className={styles.deleteProductFromCart}>
                ×
            </button>
        </div>
    );
});
