import styles from './Header.module.css';
import NavigationMenu from './ui/NavigationMenu/NavigationMenu';
import SearchField from './ui/SearchField/SearchField';
import PersonalMenu from './ui/PersonalMenu/PersonalMenu';
import { SvgSylLogo } from '../../ui/SylLogo';
import { useAuthStore } from '../../../modules/auth/useAuthStore';
import { SvgLoginIcon } from '../../ui/LoginIcon';
import { useAuthFormStore } from '../../../modules/auth/AuthForm/useAuthFormStore';
import { set } from 'react-hook-form';

export const Header = () => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const setVisibilityAuthForm = useAuthFormStore(
        (state) => state.setVisibilityAuthForm,
    );

    const handleLoginClick = () => {
        setVisibilityAuthForm(true);
    };
    return (
        <header className={styles.header}>
            <SvgSylLogo className={styles.site_logo} />
            <NavigationMenu />
            <SearchField />
            {isAuth ? (
                <PersonalMenu />
            ) : (
                <button
                    className={styles.loginButton}
                    onClick={handleLoginClick}>
                    <SvgLoginIcon
                        height="20px"
                        width="20px"
                        fill="#007FFF"
                    />
                    Войти
                </button>
            )}
        </header>
    );
};
