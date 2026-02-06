import styles from './Header.module.css';
import NavigationMenu from './ui/NavigationMenu/NavigationMenu';
import SearchField from './ui/SearchField/SearchField';
import PersonalMenu from './ui/PersonalMenu/PersonalMenu';
import { SvgSylLogo } from '../../ui/SylLogo';

export const Header = () => {
    return (
        <header className={styles.header}>
            <SvgSylLogo className={styles.site_logo} />
            <NavigationMenu />
            <SearchField />
            <PersonalMenu />
        </header>
    );
};
