import styles from './PageILinkItem.module.css';
export const PageLinkItem = (props) => {
    const { href, title } = props;
    return (
        <a
            href={href !== undefined ? { href } : '/'}
            className={styles.link_page}>
            {title}
        </a>
    );
};
