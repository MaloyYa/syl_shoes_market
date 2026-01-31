import styles from './Header.module.css';
import NavigationMenu from './ui/NavigationMenu/NavigationMenu';
import SearchField from './ui/SearchField/SearchField';
import PersonalMenu from './ui/PersonalMenu/PersonalMenu';
import SiteLogo from './ui/SiteLogo/SiteLogo';

const Header = () => {
    return (
        <header className={styles.header}>
            <SiteLogo />
            <NavigationMenu />
            <SearchField />
            <PersonalMenu />
        </header>
    );
};
export default Header;
