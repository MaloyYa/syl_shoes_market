import styles from './Header.module.css';
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
