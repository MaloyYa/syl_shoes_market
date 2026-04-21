import { useFavoriteStore } from '../../../../../pages/FavoriteProducts/store/useFavoriteStore';
import { useShoppingCartStore } from '../../../../../pages/ShoppingCart/store/useShoppingCartStore';
import { SvgFavoriteIcon } from '../../../../ui/FavoriteIcon';
import { ProfileIcon } from '../../../../ui/ProfileIcon';
import { SvgShoppingCartIcon } from '../../../../ui/ShoppingCartIcon';
import styles from './PersonalMenu.module.css';
import PersonalNavigationIcon from './PersonalNavigationIcon/PersonalNavigationIcon';
const PersonalMenu = () => {
    // const countFavorite = useFavoriteStore((state) =>
    //     state.getSizeFavorite(),
    // );
    const countShoppingProduct =
        useShoppingCartStore
            .getState()
            ?.shoppingCartData?.items.reduce(
                (acc, current) => {
                    return acc + current.quantity;
                },
                0,
            ) || 0;
    return (
        <ul className={styles.user_actions}>
            <PersonalNavigationIcon
                children={<SvgShoppingCartIcon />}
                counterProduct={countShoppingProduct}
                href={'/shopping_cart'}
            />
            <PersonalNavigationIcon
                children={
                    <SvgFavoriteIcon fill="var(--white)" />
                }
                href={'/favorites'}
                counterProduct={0}
            />
            <PersonalNavigationIcon
                children={<ProfileIcon />}
                href={'/profile'}
            />
        </ul>
    );
};
export default PersonalMenu;
