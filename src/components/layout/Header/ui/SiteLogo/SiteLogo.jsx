import styles from './SiteLogo.module.css';
const SiteLogo = () => {
    return (
        <a href="/">
            <img
                src="/src/assets/icons/syl_logo.svg"
                alt=""
                className={styles.site_logo}
            />
        </a>
    );
};
export default SiteLogo;
