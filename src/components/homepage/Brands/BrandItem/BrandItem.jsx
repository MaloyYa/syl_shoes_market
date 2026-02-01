import styles from './BrandItem.module.css';
export const BrandItem = (props) => {
    const { query, imagePath } = props;
    return (
        <a
            href={query !== '' ? { query } : '/'}
            className={styles.brand_link}>
            <img
                src={imagePath}
                alt=""
            />
        </a>
    );
};
