import styles from './BodyCatalog.module.css';
import { mockProducts } from '../../../../mock/mockProducts';
import ProductCard from '../../../../components/ui/ProductCard/ProductCard';

export const BodyCatalog = () => {
    return (
        <div className={styles.gridCatalog}>
            {mockProducts.map((product) => (
                <ProductCard product={product} />
            ))}
        </div>
    );
};
