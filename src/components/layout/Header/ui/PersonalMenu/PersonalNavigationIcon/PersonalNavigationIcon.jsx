import { Link } from 'react-router';
import styles from './PersonalNavigationIcon.module.css';
const PersonalNavigationIcon = ({
    icon,
    href,
    counterProduct,
}) => {
    return (
        <Link
            to={href || '/'}
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
        </Link>
    );
};
export default PersonalNavigationIcon;
