import styles from './SocialLinks.module.css';
import { SocialLinkItem } from './SocialLinkItem/SocialLinkItem';
export const SocialLinks = () => {
    return (
        <div className={styles.social_links}>
            <SocialLinkItem
                socialLink="https://max.ru/u/f9LHodD0cOJtzP18CQcC5T3ca5kUAVjA0qPfeXcpClhKzApPnabIBX5Jdgk"
                imageLink="/assets/icons/links-icons/max_logo.png"
                alt="Max"
            />
            <SocialLinkItem
                socialLink="https://t.me/maloy_ya"
                imageLink="/assets/icons/links-icons/telegram_logo.svg"
                alt="Tg"
            />
            <SocialLinkItem
                socialLink="https://vk.com/iwan_yakovlev"
                imageLink="/assets/icons/links-icons/vk_logo.svg"
                alt="Vk"
            />
        </div>
    );
};
