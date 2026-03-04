import { useFavoriteStore } from '../../../../../pages/FavoriteProducts/store/useFavoriteStore';
import styles from './PersonalMenu.module.css';
import PersonalNavigationIcon from './PersonalNavigationIcon/PersonalNavigationIcon';
const PersonalMenu = () => {
    const countFavorite = useFavoriteStore((state) =>
        state.getSizeFavorite(),
    );
    return (
        <ul className={styles.user_actions}>
            <PersonalNavigationIcon
                icon="/src/assets/icons/svg/ShoppingCartIcon.svg"
                counterProduct={1}
                href={'/shopping_cart'}
            />
            <PersonalNavigationIcon
                icon="/src/assets/icons/svg/FavoriteIcon.svg"
                href={'/favorites'}
                counterProduct={countFavorite}
            />
            <PersonalNavigationIcon icon="/src/assets/icons/svg/ProfileIcon.svg" />
        </ul>
    );
};
export default PersonalMenu;
