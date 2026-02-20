import { NavLink } from 'react-router';
import styles from './PageILinkItem.module.css';
export const PageLinkItem = (props) => {
    const { href, title } = props;
    return (
        <NavLink
            to={href}
            className={styles.link_page}>
            {title}
        </NavLink>
    );
};
