import NavigationIcon from '../ui/NavigationIcon';
import SearchField from '../ui/SearchField';
import NavigationMenu from '/src/components/ui/NavigationMenu';

const Header = () => {
    return (
        <header id="header">
            <a href="/">
                <img
                    src="/src/assets/icons/syl_logo.svg"
                    alt=""
                    id="site-logo"
                />
            </a>
            <NavigationMenu />
            <SearchField />
            <ul id="user-actions">
                <NavigationIcon
                    icon="/src/assets/icons/shopping-cart-icon.svg"
                    counterProduct={1}
                />
                <NavigationIcon
                    icon="/src/assets/icons/favorite-icon.svg"
                    counterProduct={3}
                />
                <NavigationIcon icon="/src/assets/icons/profile-icon.svg" />
            </ul>
        </header>
    );
};
export default Header;
