import styles from './PersonalNavigation.module.css';
const PersonalNavigationIcon = ({
    icon,
    href,
    counterProduct,
}) => {
    return (
        <a
            href={href || '/'}
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
export default PersonalNavigationIcon;
