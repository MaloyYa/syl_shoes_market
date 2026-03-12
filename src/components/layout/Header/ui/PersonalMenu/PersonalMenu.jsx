import { useFavoriteStore } from '../../../../../pages/FavoriteProducts/store/useFavoriteStore';
import { useShoppingCartStore } from '../../../../../pages/ShoppingCart/store/useShoppingCartStore';
import styles from './PersonalMenu.module.css';
import PersonalNavigationIcon from './PersonalNavigationIcon/PersonalNavigationIcon';
const PersonalMenu = () => {
    const countFavorite = useFavoriteStore((state) =>
        state.getSizeFavorite(),
    );
    const countShoppingProduct = useShoppingCartStore(
        (state) => state.shoppingCart.length,
    );
    return (
        <ul className={styles.user_actions}>
            <PersonalNavigationIcon
                icon="/src/assets/icons/svg/ShoppingCartIcon.svg"
                counterProduct={countShoppingProduct}
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
