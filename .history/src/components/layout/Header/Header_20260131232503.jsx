import NavigationIcon from '../ui/NavigationIcon';
import SearchField from '../ui/SearchField';
import PersonalMenu from './ui/PersonalMenu/PersonalMenu';
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
            <PersonalMenu />
        </header>
    );
};
export default Header;
