import styles from './PersonalMenu.module.css';
import PersonalNavigationIcon from './PersonalNavigationIcon/PersonalNavigationIcon';
const PersonalMenu = () => {
    return (
        <ul className={styles.user_actions}>
            <PersonalNavigationIcon
                icon="/src/assets/icons/svg/ShoppingCartIcon.svg"
                counterProduct={1}
            />
            <PersonalNavigationIcon
                icon="/src/assets/icons/svg/FavoriteIcon.svg"
                counterProduct={3}
            />
            <PersonalNavigationIcon icon="/src/assets/icons/svg/ProfileIcon.svg" />
        </ul>
    );
};
export default PersonalMenu;
