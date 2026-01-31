import styles from './NavigationItem.module.css';
const NavigationItem = (title) => {
    return (
        <li className={styles.navigation_item}>
            <a href="/">{title}</a>
        </li>
    );
};
export default NavigationItem;
