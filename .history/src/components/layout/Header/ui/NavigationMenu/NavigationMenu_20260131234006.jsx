import NavigationItem from './NavigationItem/NavigationItem';
const NavigationMenu = () => {
    return (
        <ul id="navigation-menu">
            <NavigationItem title="Главная" />
            <NavigationItem title="Каталог" />
            <NavigationItem title="Отзывы" />
            <NavigationItem title="Доставка" />
        </ul>
    );
};
export default NavigationMenu;
