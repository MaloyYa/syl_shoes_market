import styles from './Navigation.module.css';
const NavigationIcon = ({ icon, link, counterProduct }) => {
    return (
        <a
            href={link || '/'}
            className={styles.nav_icon}
            aria-label="Описание действия">
            <img
                src={icon}
                alt=""
            />
            {counterProduct > 0 && (
                <span className={styles.icon_counter}>
                    {counterProduct > 99
                        ? '99+'
                        : counterProduct}
                </span>
            )}
        </a>
    );
};
export default NavigationIcon;
