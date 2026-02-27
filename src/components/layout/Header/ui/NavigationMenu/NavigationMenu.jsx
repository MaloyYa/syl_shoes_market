import { useRef, useState } from 'react';
import { NavLink } from 'react-router';
import styles from './NavigationMenu.module.css';
import { useFocus } from '../../../../../hooks/useFocus';
const NavigationMenu = () => {
    const [isOpen, setOpen] = useState(false);

    const menuRef = useRef();
    const linkPages = [
        { path: '', label: 'Главная' },
        { path: '/catalog', label: 'Каталог' },
        { path: '/reviews', label: 'Отзывы' },
        { path: '/delivery', label: 'Доставка' },
    ];

    useFocus(isOpen, menuRef, setOpen);
    return (
        <nav
            className={styles.headerNav}
            ref={menuRef}>
            <button
                className={`${styles.menuButton} ${
                    isOpen && styles.menuOpen
                }`}
                onClick={() => setOpen(!isOpen)}>
                <span
                    className={`${styles.menu_icon} ${
                        isOpen && styles.openMenu
                    }`}>
                    –
                </span>
                Меню
            </button>
            <ul
                className={`${styles.navList} ${
                    isOpen && styles.mobileMenu
                }`}>
                {linkPages.map((linkPage) => (
                    <li
                        className={styles.navItem}
                        key={linkPage.path}>
                        <NavLink
                            to={linkPage.path}
                            className={({ isActive }) =>
                                isActive
                                    ? styles.activeLink
                                    : ''
                            }>
                            {linkPage.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default NavigationMenu;
