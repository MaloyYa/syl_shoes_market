import { Link } from 'react-router';
import styles from './BrandLink.module.css';
export const BrandLink = ({ brand }) => {
    const { brand_name, brand_logo } = brand;

    return (
        <Link to="/catalog">
            <img
                className={styles.logoBrand}
                src={brand_logo}
                alt={brand_name}
            />
        </Link>
    );
};
