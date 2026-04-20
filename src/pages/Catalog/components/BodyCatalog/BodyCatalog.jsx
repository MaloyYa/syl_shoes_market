import styles from './BodyCatalog.module.css';
import ProductCard from '../../../../components/ui/ProductCard/ProductCard';
import { memo, useEffect, useState } from 'react';
import { productsService } from '../../../../service/productService';

export const BodyCatalog = memo(({ filters }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        productsService.getProducts(
            setIsLoading,
            setProducts,
        );
    }, [filters]);

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <p>Загружаем товары...</p>
            </div>
        );
    }
    return (
        <div className={styles.gridCatalog}>
            {products.map((product) => (
                <ProductCard
                    product={product}
                    key={product.id}
                />
            ))}
        </div>
    );
});
