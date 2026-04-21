import { useEffect, useMemo, useState } from 'react';
import { SelectFilter } from '../../components/ui/SelectFilter/SelectFilter';
import ProductCard from '../../components/ui/ProductCard/ProductCard';
import styles from './FavoriteProducts.module.css';

import { favoriteService } from '../../service/favoriteService';
export const FavoriteProducts = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [sort, setSort] = useState('default');

    const sortedProducts = useMemo(() => {
        if (!favorites) return;
        const copy = [...favorites];
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
                    (a, b) => b.avg_grade - a.avg_grade,
                );
            default:
                return copy;
        }
    }, [favorites, sort]);

    const handleDeleteFromFavorite = (id) => {
        setTimeout(() => {
            setFavorites((prev) =>
                prev.filter(
                    ({ product }) => product.id !== id,
                ),
            );
        }, 2000);
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const data =
                    await favoriteService.getFavorites();
                setFavorites(data);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    if (!favorites || favorites.length === 0) {
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
            {isLoading ? (
                <div>Загружаем избранные товары</div>
            ) : (
                <ul className={styles.gridFavorites}>
                    {sortedProducts &&
                        sortedProducts.map(
                            ({ product }) => (
                                <li
                                    key={product.id}
                                    style={{
                                        listStyle: 'none',
                                    }}>
                                    <ProductCard
                                        product={product}
                                        forFavorite={true}
                                        handleDelete={
                                            handleDeleteFromFavorite
                                        }
                                    />
                                </li>
                            ),
                        )}
                </ul>
            )}
        </main>
    );
};
