import styles from './BodyCatalog.module.css';
import { bestProducts } from '/src/mock/mockBestProducts.js';
import ProductCard from '/src/components/ui/ProductCard/ProductCard';

export const BodyCatalog = () => {
    return (
        <div className={styles.gridCatalog}>
            {bestProducts.map((product, index) => (
                <ProductCard
                    key={index}
                    {...product}
                />
            ))}
        </div>
    );
};
