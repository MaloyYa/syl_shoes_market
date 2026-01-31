import styles from './PersonalMenu.module.css';
import PersonalNavigationIcon from './NavigationIcon/PersonalNavigationIcon';
const PersonalMenu = () => {
    return (
        <ul className={styles.user_actions}>
            <PersonalNavigationIcon
                icon="/src/assets/icons/shopping-cart-icon.svg"
                counterProduct={1}
            />
            <PersonalNavigationIcon
                icon="/src/assets/icons/favorite-icon.svg"
                counterProduct={3}
            />
            <PersonalNavigationIcon icon="/src/assets/icons/profile-icon.svg" />
        </ul>
    );
};
export default PersonalMenu;
