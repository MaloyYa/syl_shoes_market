import NavigationItem from './NavigationItem/NavigationItem';
const NavigationMenu = () => {
    return (
        <ul id="navigation-menu">
            <li className="navigation-item">
                <a href="/">Каталог</a>
            </li>
            <li className="navigation-item">
                <a href="/">Отзывы</a>
            </li>
            <li className="navigation-item">
                <a href="/">Доставка</a>
            </li>
            <NavigationItem title="Главная" />
            <NavigationItem title="Каталог" />
            <NavigationItem title="Отзывы" />
            <NavigationItem title="Доставка" />
        </ul>
    );
};
export default NavigationMenu;
