import styles from './ListLinkPage.module.css';
import { PageLinkItem } from './PageILinkItem/PageILinkItem';
export const ListLinkPage = () => {
    return (
        <div className={styles.list_link_page}>
            <PageLinkItem title="Отзывы" />
            <PageLinkItem title="Доставка" />
            <PageLinkItem title="Гарантия" />
        </div>
    );
};
