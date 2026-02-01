import styles from './SocialLinks.module.css';
import { SocialLinkItem } from './SocialLinkItem/SocialLinkItem';
export const SocialLinks = () => {
    return (
        <div className={styles.social_links}>
            <SocialLinkItem
                socialLink="https://max.ru/u/f9LHodD0cOJtzP18CQcC5T3ca5kUAVjA0qPfeXcpClhKzApPnabIBX5Jdgk"
                imageLink="/src/assets/icons/links-icon/max_logo.png"
            />
            <SocialLinkItem
                socialLink="https://t.me/maloy_ya"
                imageLink="/src/assets/icons/links-icon/telegram_logo.svg"
            />
            <SocialLinkItem
                socialLink="https://https://vk.com/iwan_yakovlev"
                imageLink="/src/assets/icons/links-icon/vk_logo.svg"
            />
        </div>
    );
};
