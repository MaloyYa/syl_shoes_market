import { useMemo, useState } from 'react';
import { SelectFilter } from '../../components/ui/SelectFilter/SelectFilter';
import ProductCard from '../../components/ui/ProductCard/ProductCard';
import styles from './FavoriteProducts.module.css';
import { useFavoriteStore } from './store/useFavoriteStore';
export const FavoriteProducts = () => {
    const products = useFavoriteStore((state) =>
        state.getFavorites(),
    );
    const [sort, setSort] = useState('default');

    const sortedProducts = useMemo(() => {
        if (!products) return;
        const copy = [...products];
        switch (sort) {
            case 'price-asc':
                return copy.sort(
                    (a, b) => a.price - b.price,
                );
            case 'price-desc':
                return copy.sort(
                    (a, b) => b.price - a.price,
                );
            case 'rating':
                return copy.sort(
                    (a, b) => b.rating - a.rating,
                );
            default:
                return copy;
        }
    }, [products, sort]);

    if (!products || products.length === 0) {
        return (
            <main className={styles.main}>
                <p className={styles.messageNull}>
                    Список избранного пуст...
                </p>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.blockSort}>
                <SelectFilter
                    value={sort}
                    onChange={setSort}
                />
            </div>
            <ul className={styles.gridFavorites}>
                {sortedProducts &&
                    sortedProducts.map((product) => (
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
