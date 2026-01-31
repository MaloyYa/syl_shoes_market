import styles from './NavigationItem.module.css';
const NavigationItem = () => {
    return (
        <li className={styles.navigation_item}>
            <a href="/">Главная</a>
        </li>
    );
};
export default NavigationItem;
