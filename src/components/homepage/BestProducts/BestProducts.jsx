import styles from './BestProducts.module.css';
import ProductCard from '../../ui/ProductCard/ProductCard';

const BestProducts = () => {
    return (
        <section className={styles.best_products}>
            <h2 className={styles.section_title}>
                Лучшие из лучших
            </h2>
            <ul className={styles.swiper}>
                <ProductCard
                    title="КРОССОВКИ ADIDAS EQT SUPPORT ADV PK"
                    article={19666}
                    price={3290}
                    image="/src/assets/images/product_2.svg"
                />
                <ProductCard
                    title="КРОССОВКИ ADIDAS EQT SUPPORT ADV PK"
                    article={19666}
                    price={3290}
                    image="/src/assets/images/product_1.svg"
                />
                <ProductCard
                    title="КРОССОВКИ ADIDAS EQT SUPPORT ADV PK"
                    article={19666}
                    price={3290}
                    image="/src/assets/images/product_1.svg"
                />
                <ProductCard
                    title="КРОССОВКИ ADIDAS EQT SUPPORT ADV PK"
                    article={19666}
                    price={3290}
                    image="/src/assets/images/product_1.svg"
                />
                <ProductCard
                    title="КРОССОВКИ ADIDAS EQT SUPPORT ADV PK"
                    article={19666}
                    price={3290}
                    image="/src/assets/images/product_1.svg"
                />
                <ProductCard
                    title="КРОССОВКИ ADIDAS EQT SUPPORT ADV PK"
                    article={19666}
                    price={3290}
                    image="/src/assets/images/product_1.svg"
                />
            </ul>
        </section>
    );
};
export default BestProducts;
