import { SvgFavoriteIcon } from '../../../../ui/FavoriteIcon';
import { ProfileIcon } from '../../../../ui/ProfileIcon';
import { SvgShoppingCartIcon } from '../../../../ui/ShoppingCartIcon';
import styles from './PersonalMenu.module.css';
import PersonalNavigationIcon from './PersonalNavigationIcon/PersonalNavigationIcon';
const PersonalMenu = () => {
    // const countFavorite = useFavoriteStore((state) =>
    //     state.getSizeFavorite(),
    // );

    return (
        <ul className={styles.user_actions}>
            <PersonalNavigationIcon
                children={<SvgShoppingCartIcon />}
                href={'/shopping_cart'}
            />
            <PersonalNavigationIcon
                children={
                    <SvgFavoriteIcon fill="var(--white)" />
                }
                href={'/favorites'}
            />
            <PersonalNavigationIcon
                children={<ProfileIcon />}
                href={'/profile'}
            />
        </ul>
    );
};
export default PersonalMenu;
