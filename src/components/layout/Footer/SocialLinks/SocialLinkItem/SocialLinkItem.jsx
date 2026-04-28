import styles from './SocialLinkItem.module.css';

export const SocialLinkItem = (props) => {
    const { imageLink, socialLink, alt = '' } = props;
    return (
        <a
            href={socialLink}
            className={styles.social_link}>
            <img
                src={imageLink}
                alt={alt}
            />
        </a>
    );
};
