import ProductCard from '../../components/ui/ProductCard/ProductCard';
// import { mockProducts } from '../../mock/mockProducts';
import styles from './FavoriteProducts.module.css';
import { useFavoriteStore } from './store/useFavoriteStore';
export const FavoriteProducts = () => {
    const products = useFavoriteStore((state) =>
        state.getFavorites(),
    );
    if (!products || products.length === 0) {
        return (
            <main className={styles.main}>
                <p className={styles.messageNull}>
                    Вы ничего не добавили в раздел
                    избранного
                </p>
            </main>
        );
    }
    // const optionSort = [
    //     'По умолчанию',
    //     'По рейтингу',
    //     'По цене',
    // ];

    // const datalistId = 'sort-options';
    return (
        <main className={styles.main}>
            {/* <div className={styles.sortContainer}>
                {' '}
                <label htmlFor="optionSort">
                    Сортировка:
                    <input
                        type="text"
                        id="optionSort"
                        list={datalistId}
                        placeholder="Выберите сортировку"
                        autoComplete="off"
                    />
                </label>
                <datalist id={datalistId}>
                    {optionSort.map((option) => (
                        <option
                            key={option}
                            value={option}
                        />
                    ))}
                </datalist>
            </div> */}
            <ul className={styles.gridFavorites}>
                {products &&
                    products.map((product) => (
                        <li
                            key={product.id}
                            style={{ listStyle: 'none' }}>
                            <ProductCard
                                product={product}
                            />
                        </li>
                    ))}
            </ul>
        </main>
    );
};
