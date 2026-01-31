import styles from './Header.module.css';
import NavigationIcon from '../ui/NavigationIcon';
import SearchField from '../ui/SearchField';
import PersonalMenu from './ui/PersonalMenu/PersonalMenu';
import SiteLogo from './ui/SiteLogo/SiteLogo';
import NavigationMenu from '/src/components/ui/NavigationMenu';

const Header = () => {
    return (
        <header id="header">
            <SiteLogo />
            <NavigationMenu />
            <SearchField />
            <PersonalMenu />
        </header>
    );
};
export default Header;
