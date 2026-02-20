import styles from './ListLinkPage.module.css';
import { PageLinkItem } from './PageILinkItem/PageILinkItem';
export const ListLinkPage = () => {
    return (
        <div className={styles.list_link_page}>
            <PageLinkItem
                title="Отзывы"
                href="/reviews"
            />
            <PageLinkItem
                title="Доставка"
                href="/delivery"
            />
            <PageLinkItem
                title="Гарантия"
                href=""
            />
        </div>
    );
};
