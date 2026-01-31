import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationMenu.module.css';
const NavigationMenu = () => {
    return (
        <ul className={styles.navigation_menu}>
            <NavigationItem title="Главная" />
            <NavigationItem title="Каталог" />
            <NavigationItem title="Отзывы" />
            <NavigationItem title="Доставка" />
        </ul>
    );
};
export default NavigationMenu;
