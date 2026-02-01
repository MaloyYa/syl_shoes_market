import { BrandItem } from './BrandItem/BrandItem';
import styles from './Brands.module.css';
const Brands = () => {
    return (
        <section className={styles.brand_section}>
            <h2 className={styles.section_title}>Бренды</h2>
            <div className={styles.swiper}>
                <BrandItem imagePath="/src/assets/images/puma_logo.svg" />
                <BrandItem imagePath="/src/assets/images/puma_logo.svg" />
                <BrandItem imagePath="/src/assets/images/puma_logo.svg" />
                <BrandItem imagePath="/src/assets/images/puma_logo.svg" />
                <BrandItem imagePath="/src/assets/images/puma_logo.svg" />
                <BrandItem imagePath="/src/assets/images/puma_logo.svg" />
                <BrandItem imagePath="/src/assets/images/puma_logo.svg" />
                <BrandItem imagePath="/src/assets/images/puma_logo.svg" />
                <BrandItem imagePath="/src/assets/images/puma_logo.svg" />
            </div>
        </section>
    );
};
export default Brands;
