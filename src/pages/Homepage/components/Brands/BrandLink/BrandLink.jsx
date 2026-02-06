import styles from './BrandLink.module.css';
export const BrandLink = (props) => {
    const { titleBrand, href, logo } = props;
    return (
        <a href={href !== undefined ? href : '/'}>
            <img
                className={styles.logoBrand}
                src={logo}
                alt={titleBrand}
            />
        </a>
    );
};
