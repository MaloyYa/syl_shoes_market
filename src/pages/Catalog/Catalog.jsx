import { FilterSidebar } from './components/FilterSidebar/FilterSidebar';
import { BodyCatalog } from './components/BodyCatalog/BodyCatalog';
import { products } from '../../mock/products';
import styles from './Catalog.module.css';
import { useFilterOptions } from './hooks/useFilterOptions';

export const Catalog = () => {
    //здесь потом сделать ручку для получения всех товаров
    const allProducts = products;

    const filterOptions = useFilterOptions(allProducts);

    return (
        <main className={styles.main}>
            <FilterSidebar filterOptions={filterOptions} />
            <BodyCatalog />
        </main>
    );
};
