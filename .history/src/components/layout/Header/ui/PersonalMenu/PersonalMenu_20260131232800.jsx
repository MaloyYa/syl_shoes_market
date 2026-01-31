import styles from './PersonalMenu.module.css';
const PersonalMenu = () => {
    return (
        <ul className={styles.user_actions}>
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
    );
};
export default PersonalMenu;
