import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import styles from './NavigationMenu.module.css';
const NavigationMenu = () => {
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null); // Ссылка на контейнер меню

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside,
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
            );
        };
    }, [isOpen]);
    return (
        <>
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
                    <li className={styles.navItem}>
                        <NavLink to="/">Главная</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to="catalog">
                            Каталог
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        Отзывы
                    </li>
                    <li className={styles.navItem}>
                        Доставка
                    </li>
                </ul>
            </nav>
        </>
    );
};
export default NavigationMenu;
